const API_BASE = "/api/favorites"

export async function addFavorite(mediaType, media) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      tmdb_id: media.id,
      media_type: mediaType,
      title: media.title,
      poster_path: media.poster_path,
      vote_average: media.vote_average,
      release_date: media.release_date,
      original_language: media.original_language,
    }),
  })
  if (!res.ok) throw new Error("Failed to add favorite")
  return res.json()
}

export async function removeFavorite(mediaType, tmdbId) {
  const res = await fetch(`${API_BASE}/${mediaType}/${tmdbId}`, {
    method: "DELETE",
    credentials: "include",
  })
  if (!res.ok) throw new Error("Failed to remove favorite")
  return res.json()
}