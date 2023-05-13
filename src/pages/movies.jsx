import Axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { filters as filterrs} from '../data';
import { useState, useEffect } from 'react';
import '../styles/movies.css';
import NavBar from '../common/navBar';

const Movies = () => {
    const [allMovies, setAllMovies] = useState([])
    
    const { data:movies, status, refetch } = useQuery(['movies'], async ()=>{
        const res = await Axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=eeb39aadae951e239caedd1d5494e13c`);
        return res.data.results;
     });


   const[filters, setFilters] = useState(filterrs);


    const handleToggle = id => {
        const newFilters = filters.map(filter =>{
            if(filter.id === id){
                return {...filter, isToggled : !filter.isToggled};
            }else{
                return {...filter, isToggled: false};
            }
        })
        setFilters(newFilters);
    }
    const handleFilter = id =>{
        const mmovies = movies?.filter(m => m.genre_ids.includes(id));
        setAllMovies(mmovies)
    }
    
    useEffect(() => {
        if(!movies?.length) return
        setAllMovies(movies)
    }, [movies])
   

    return (
       <>
            <NavBar/>
            <div className="moviesContainer">
                <div className="filter">
                    <h1>Filter</h1>

                    <div className='headers'>
                        {filters.map( filter => (
                            <div className="filters" key={filter.id}>
                                <div className="header" onClick={() => handleToggle(filter.id)}>
                                    <h3>{filter.name}</h3>
                                    <h2 className={`${filter.isToggled ? 'fa fa-arrow-up': 'fa fa-arrow-down'}`}></h2>
                                </div>
                                <div className="genres">
                                    {filter.isToggled && filter.genres.map(genre => (
                                            <h4 className='genre' onClick={()=> handleFilter(genre.genre_id)} key={genre.id || genre.genre_id}>{genre.name}</h4>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                <div className="movies">
                    {allMovies?.map(movie => (
                        <div className="movieCard" key={movie.id}>
                            <div className="imgContainer">
                                <img src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}/>
                            </div>

                            <div className="txtArea">
                                <p className='rating'>{movie?.vote_average}<i className='fa fa-star'></i></p>
                                <h5>{movie?.title}</h5>
                                {/* <h3>
                                    {filters[0].genres.find(g => g.genre_id === movie?.genre_ids[0]).name}
                                </h3> */}
                                <p className='date'>{movie?.release_date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
       </>
    );
}
 
export default Movies;