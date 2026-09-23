import "dotenv/config"                       
import express from "express"                
import session from "express-session"        
import connectPgSimple from "connect-pg-simple" 
import bcrypt from "bcryptjs"                
import pg from "pg"                          

const app = express()
const PORT = process.env.PORT || 3000


// A Pool keeps several connections open and reconnects by itself.
const db = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,  
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

app.use(express.json())

const PgStore = connectPgSimple(session)

app.use(
  session({
    store: new PgStore({ pool: db, createTableIfMissing: true }), // sessions survive restarts
    secret: process.env.SESSION_SECRET, // signs the cookie so it can't be forged
    resave: false,
    saveUninitialized: false, // no session for visitors who never log in
    cookie: {
      httpOnly: true, // browser JavaScript can't read the cookie
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production", // HTTPS only when deployed
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  })
)

const isValidEmail = (e) => typeof e === "string" && /^\S+@\S+\.\S+$/.test(e)

function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Not logged in" })
  }
  next()
}


// --- Sign up ---
app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body ?? {}

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Enter a valid email" })
  }
  if (typeof password !== "string" || password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters" })
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12)
    const result = await db.query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email",
      [email.toLowerCase(), passwordHash]
    )
    const user = result.rows[0]

    req.session.userId = user.id
    res.status(201).json(user)
    
  } catch (err) {
    if (err.code === "23505") {
      // 23505 = Postgres "unique violation" -> that email already exists
      return res.status(409).json({ error: "That email is already registered" })
    }
    console.error(err)
    res.status(500).json({ error: "Something went wrong" })
  }
})

// --- Sign in ---
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body
  if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
    return res.status(400).json({ error: "Email and password are required" })
  }

  try {
    const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [ email.toLowerCase() ])
    const user = rows[0]
    const ok = user && (await bcrypt.compare(password, user.password_hash))
    if (!ok) {
      return res.status(401).json({ error: "Invalid email or password" })
    }

    req.session.regenerate((err) => {
      if (err) return res.status(500).json({ error: "Something went wrong" })
      req.session.userId = user.id
      res.json({ id: user.id, email: user.email })
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Something went wrong" })
  }
})

// --- Sign out ---
app.post("/api/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid")
    res.json({ ok: true })
  })
})

// --- Who is logged in? (React calls this when the page loads) ---
app.get("/api/me", requireAuth, async (req, res) => {
  try {
    const { rows } = await db.query("SELECT id, email FROM users WHERE id = $1", [
      req.session.userId,
    ])
    res.json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Something went wrong" })
  }
})
// --- Get everything in the current user's list ---
app.get("/api/favorites", requireAuth, async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT * FROM favorites WHERE user_id = $1 ORDER BY created_at DESC",
      [req.session.userId]
    )
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Something went wrong" })
  }
})

// --- Add an item ---
app.post("/api/favorites", requireAuth, async (req, res) => {
  const { tmdb_id, media_type, title, poster_path, vote_average, release_date, original_language } = req.body

  try {
    const { rows } = await db.query(
      `INSERT INTO favorites (user_id, tmdb_id, media_type, title, poster_path, vote_average, release_date, original_language)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       ON CONFLICT (user_id, tmdb_id, media_type) DO NOTHING
       RETURNING *`,
      [req.session.userId, tmdb_id, media_type, title, poster_path, vote_average, release_date, original_language]
    )
    res.status(201).json(rows[0] ?? null) // null if it was already saved
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Something went wrong" })
  }
})

app.delete("/api/favorites/:mediaType/:tmdbId", requireAuth, async (req, res) => {
  const { mediaType, tmdbId } = req.params
  try {
    await db.query(
      "DELETE FROM favorites WHERE user_id = $1 AND tmdb_id = $2 AND media_type = $3",
      [req.session.userId, tmdbId, mediaType]
    )
    res.json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Something went wrong" })
  }
})
// STEP 7: Start listening --------------------------------------------------
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`))