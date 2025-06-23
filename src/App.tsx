import Search from "./components/Search.tsx";
import {useEffect, useState} from "react";
import Spinner from "./components/Spinner.tsx";
import MovieCard from "./components/MovieCard.tsx";
import {useDebounce} from "react-use";

const App = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

    const [errorMessage, setErrorMessage] = useState('')
    const [movieList, setMovieList] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useDebounce(function (){
        setDebouncedSearchTerm(searchTerm)
    }, 500, [searchTerm])

    async function fetchMovies(query: string) {
        try {
            const API_BASE_URL = "http://api.themoviedb.org/3";
            const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

            const API_OPTIONS = {
                method: "GET",
                headers: new Headers({
                    accept: "application/json",
                    Authorization: `Bearer ${API_KEY}`
                })
            }

            return await fetch(`${API_BASE_URL}/${query ? 'search' : 'discover'}/movie?sort_by=popularity.desc${query ? `&query=${encodeURIComponent(query)}`: ''}`, API_OPTIONS)
                .then((response) => response.json());
        } catch (error) {
            setIsLoading(false)
            setMovieList([])
            setErrorMessage((error instanceof Error) ? error.message : 'error fetching movies.');
        }
    }

    useEffect(function () {
        setIsLoading(true)
        setTimeout(function () {
            fetchMovies(searchTerm).then(function (moviesJson) {
                setIsLoading(false)
                setMovieList(moviesJson.results || []);
            });
        }, 200)

    }, [debouncedSearchTerm])

    return (
        <main>
            <div className="pattern"></div>
            <div className="wrapper">
                <header>
                    <img src="./hero.png" alt="Movie finder hero"/>
                    <h1>
                        Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle
                    </h1>
                </header>
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

                <section className="all-movies">
                    <h2 className="mt-[40px]">All Movies</h2>

                    {isLoading ? (
                            <Spinner/>
                    ) : errorMessage ? (
                        <p className="bg-red-50 p-2 text-red-500 rounded-xl">{errorMessage}</p>
                    ) : (
                        <ul>
                            { movieList && movieList.map(function (movie){
                                return <li key={movie.id}>
                                    <MovieCard movie={movie}/>
                                </li>
                            }) }
                        </ul>
                    )}
                </section>
            </div>
        </main>
    );
};

export default App;