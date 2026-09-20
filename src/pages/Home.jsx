import { useEffect, useState } from 'react'
import Search from '../Components/Search'
import Spinner from '../Components/Spinner'
import MovieCard from '../Components/MovieCard'
import { API_BASE_URL, API_OPTIONS } from '../Api'
function Home(){
  const [searchTerm , setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('')
  const [errorMessage , setErrorMessage]= useState('');
  const [movieList , setMovieList] = useState([]);
  const [isLoading , setIsLoading] = useState(false);
  const container = "mx-auto w-full max-w-[1240px] px-4 sm:px-6"

  const fetchMovies = async(query='')=>{
    setIsLoading(true)
    setErrorMessage('')
    try{
      const endpoint = query? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
                            : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const result = await fetch(endpoint , API_OPTIONS);
      
      if(!result.ok){
        throw new Error('Failed to fetch movies');
      }
      const data = await result.json();
      if(data.Response === "False"){
        setErrorMessage(data.Error)
        setMovieList([]);
      }else{
        setMovieList(data.results || [])
        console.log(data);
        
      }
      
    }catch(error){
      console.log(`Error fetching movies ${error}`);
      setErrorMessage("Error fetching movies! Please try again later.")
      
    }finally{
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(searchTerm), 500)
    return () => clearTimeout(timer)
  }, [searchTerm])
  useEffect(() => {
    fetchMovies(debouncedTerm)
  }, [debouncedTerm])
  
  return(
    <main>
      <section className='relative min-h-[560px] overflow-hidden bg-[radial-gradient(ellipse_at_70%_20%,#2a2050_0%,#12101f_45%,#0b0b10_100%)]'>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/hero-bg.png)" }}/>
        <div className="absolute inset-0 bg-linear-to-b from-bg/25 via-bg/55 to-bg" />
        <div className={`${container} relative pt-12 sm:pt-[72px]`}>
          <h1 className="max-w-[640px] text-4xl font-extrabold leading-[1.1] tracking-tighter sm:text-5xl lg:text-[56px]">
            Your gateway to <span className='text-gradient'>infinite</span>  cinematic worlds
          </h1>
          <p className='mt-2 max-w-[560px] text-[15px] leading-relaxed text-muted'>Stream thousands of blockbuster movies, award-winning documentaries, and exclusive indie films. Free with your membership.</p>
          <div className='mt-7 flex h-[52px] w-full max-w-[540px] items-center gap-3 rounded-xl border border-line bg-surface/85 pl-[18px] pr-2 backdrop-blur-md transition focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/15'>
            <img src="./search.svg" alt="search icon" />
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/> 
          </div>
        </div>
      </section>
      <section className={`${container} py-10`}>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <h2 className="mb-7 text-[22px] font-bold tracking-tight">{debouncedTerm ? `Search for ${debouncedTerm}` : "Popular Movies"}</h2>
          {isLoading ? <Spinner /> : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:grid-cols-5">
          {movieList.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
  )}
      </section>

    </main>
  )
}

export default Home;