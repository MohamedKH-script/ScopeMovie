import { useState, useEffect, useCallback } from "react"

export function useFavoriteIds() {
  const [favoriteIds, setFavoriteIds] = useState(new Set())
  const [loaded, setLoaded] = useState(false)

  const refresh = useCallback(() => {
    fetch("/api/favorites", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : []))
      .then((rows) => {
        setFavoriteIds(new Set(rows.map((r) => `${r.media_type}:${r.tmdb_id}`)))
      })
      .catch(() => {})
      .finally(() => setLoaded(true))
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { favoriteIds, loaded, refresh }
}