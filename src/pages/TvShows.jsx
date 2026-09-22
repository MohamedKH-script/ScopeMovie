import SecondaryGenreButton from "../Components/SecondaryGenreButton";
import PrimaryGenreButton from "../Components/PrimaryGenreButton";
import Spinner from "../Components/Spinner";
import { useEffect, useState } from "react";
import { API_BASE_URL, API_OPTIONS } from '../Api'
import TvShowCard from "../Components/TvShowCard";
import GenreHeader from "../Components/GenreHeader"
function TvShows(){
    const container = "mx-auto w-full max-w-[1240px] px-4 sm:px-6"
    const [currentGenre , setCurrentGenre] = useState(null)
    const [genres , setGenres] = useState([])
    const [tvShows , setTvShows] = useState({})
    const [errorMessage , setErrorMessage]= useState('');
    const [isLoadingGenres, setIsLoadingGenres] = useState(false)
    
    const getGenres = async () => {
        setIsLoadingGenres(true)
        setErrorMessage('')
        try{
            const endpoint = `${API_BASE_URL}/genre/tv/list`;
            const result = await fetch(endpoint , API_OPTIONS);
            if(!result.ok){
                throw new Error('Failed to get genres');
            }
            const data= await  result.json();
            setGenres((data.genres || []).slice(0,8))
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


    const getTvShowsByGenre = async (genreId) => {
    try {
        const endpoint =`${API_BASE_URL}/discover/tv?with_genres=${genreId}&sort_by=popularity.desc`
        const result = await fetch(endpoint,API_OPTIONS)
        if (!result.ok) {
            throw new Error("Failed to get tv shows")
        }
        const data = await result.json()
        setTvShows((prev) => ({ ...prev, [genreId]: data.results || [] }))
    } catch (error) {
        console.log(`Error fetching tv shows: ${error}`)
        setErrorMessage("Error fetching tv shows! Please try again later.")
    }
    }

    useEffect(()=>{
        genres.forEach(genre => getTvShowsByGenre(genre.id));
    },[genres])
    
    const visibleGenres = currentGenre ? genres.filter((g) => g.id === currentGenre) : genres;
    //add "all movies" first..
    const allGenres = [{ id: null, name: 'All Tv Shows' }, ...genres]
    return(
        <main>
            <section className={`${container} py-10`}>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <div className="flex flex-wrap gap-3">
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
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {(tvShows[id] || []).slice(0, currentGenre ? 20 : 10).map((tvShow) => (
                    <TvShowCard key={tvShow.id} tvShow={tvShow} />
                    ))}
                </div>
                </div>
            ))}
</section>
        </main>
    )
}
export default TvShows;