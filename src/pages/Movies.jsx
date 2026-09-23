import SecondaryGenreButton from "../Components/SecondaryGenreButton";
import PrimaryGenreButton from "../Components/PrimaryGenreButton";
import Spinner from "../Components/Spinner";
import { useEffect, useState } from "react";
import { API_BASE_URL, API_OPTIONS } from '../Api'
import MovieCard from "../Components/MovieCard";
import GenreHeader from "../Components/GenreHeader"
import { useFavoriteIds } from "../hooks/useFavoriteIds" // NEW

function Movies(){
    const container = "mx-auto w-full max-w-[1240px] px-4 sm:px-6"
    const [currentGenre , setCurrentGenre] = useState(null)
    const [genres , setGenres] = useState([])
    const [movies , setMovies] = useState({})
    const [errorMessage , setErrorMessage]= useState('');
    const [isLoadingGenres, setIsLoadingGenres] = useState(false)
    const { favoriteIds } = useFavoriteIds() // NEW
    
    const getGenres = async () => {
        setIsLoadingGenres(true)
        setErrorMessage('')
        try{
            const endpoint = `${API_BASE_URL}/genre/movie/list`;
            const result = await fetch(endpoint , API_OPTIONS);
            if(!result.ok){
                throw new Error('Failed to get genres');
            }
            const data= await  result.json();
            setGenres((data.genres || []).slice(0,9))
            console.log(data);
        }catch(error){
            console.log(`Error fetching Genres ${error}`);
            setErrorMessage("Error fetching Genres! Please try again later.")
        }finally{
            setIsLoadingGenres(false)
        }
    }
    useEffect(()=>{
        getGenres()
    },[])


    const getMoviesByGenre = async (genreId) => {
    try {
        const endpoint =`${API_BASE_URL}/discover/movie?with_genres=${genreId}&sort_by=popularity.desc`
        const result = await fetch(endpoint,API_OPTIONS)
        if (!result.ok) {
            throw new Error("Failed to get movies")
        }
        const data = await result.json()
        setMovies((prev) => ({ ...prev, [genreId]: data.results || [] }))
    } catch (error) {
        console.log(`Error fetching movies: ${error}`)
        setErrorMessage("Error fetching movies! Please try again later.")
    }
    }

    useEffect(()=>{
        genres.forEach(genre => getMoviesByGenre(genre.id));
    },[genres])
    
    const visibleGenres = currentGenre ? genres.filter((g) => g.id === currentGenre) : genres;
    //add "all movies" first..
    const allGenres = [{ id: null, name: 'All Movies' }, ...genres]
    return(
        <main>
            <section className={`${container} py-6 sm:py-10`}>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <div className="flex flex-wrap gap-2 sm:gap-3">
                    {isLoadingGenres ?(<Spinner/>)
                    :(allGenres.map(({ id, name }) =>
                        currentGenre === id ? (
                        <PrimaryGenreButton
                            key={name}
                            name={name}
                            onClick={() => {setCurrentGenre(id) }}
                        />
                        ) : (
                        <SecondaryGenreButton
                            key={name}
                            name={name}
                            onClick={() => {setCurrentGenre(id) }}
                        />
                        )
                    ))}

                </div>
            </section>
            <section className={container}>
                {visibleGenres.map(({ id, name }) => (
                <div key={id} className="mb-12">
                <GenreHeader
                name={name}
                onSeeAll={currentGenre ? null : () => setCurrentGenre(id)}
                />
                <div className="grid grid-cols-1 gap-x-3 gap-y-8 min-[400px]:grid-cols-2 sm:gap-x-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {(movies[id] || []).slice(0, currentGenre ? 20 : 10).map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={{ ...movie, is_favorite: favoriteIds.has(`movie:${movie.id}`) }} // CHANGED
                    />
                    ))}
                </div>
                </div>
            ))}
</section>
        </main>
    )
}
export default Movies;