import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Logo from "./Components/Logo"
import SecondaryButton from './Components/SecondaryButton'
import PrimaryButton from './Components/PrimaryButton'
import Search from './Components/Search'
import Spinner from './Components/Spinner'
import MovieCard from './Components/MovieCard'
function App(){
  const container = "mx-auto w-full max-w-[1240px] px-4 sm:px-6"
  const NAV=["Home", "Movies" , "TV Shows" , "My List"];
  const [searchTerm , setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('')
  const [errorMessage , setErrorMessage]= useState('');
  const [movieList , setMovieList] = useState([]);
  const [isLoading , setIsLoading] = useState(false);
                //setting the api request
  const API_BASE_URL ="https://api.themoviedb.org/3";
  const API_KEY=import.meta.env.VITE_TMDB_API_KEY;
  const API_OPTIONS={
    method :'GET',
    headers:{
      accept:'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  }
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
      <header className="sticky mt-4 top-0 z-50 h-[72px] border-b border-line bg-bg/80 backdrop-blur-xl">
        <div className={`${container} grid h-full grid-cols-[1fr_auto] items-center lg:grid-cols-[1fr_auto_1fr]`}>
          <Logo />
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((link, i) => (
              <a
                key={link}
                href="#"
                className={`text-[13px] font-medium transition-colors hover:text-white ${
                  i === 0 ? "text-white" : "text-muted"
                }`}
              >
                {link}
              </a>
            ))}
          </nav>
          <div className="flex items-center justify-end gap-2">
            <SecondaryButton name="Sign In"/>
            <PrimaryButton name="Sign Up"/>
          </div>
        </div>
      </header>
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

export default App
