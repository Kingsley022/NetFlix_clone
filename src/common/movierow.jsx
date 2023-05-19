import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Axios from "axios";
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import '../styles/movierow.css';


const MovieRow = ({category, rowTitle, isLargeRow}) => {

    const[trailerUrl, setTrailerUrl] = useState('');
    const api_key = 'eeb39aadae951e239caedd1d5494e13c'

    const { data:movies, status} = useQuery(['movies', category], async ()=>{
        const res = await Axios.get(`https://api.themoviedb.org/3/movie/${category}?api_key=${api_key}`);
         return res.data.results;
     });

    if(status === "loading"){
        <h1>Loading...</h1>
    }

    const opts= {
        height: '390',
        width: '100%',
        playerVars: {
          autoplay: 1,
          showinfo: 0
        },
      };
  
    const handleTrailer = movie =>{
        if(trailerUrl){
            setTrailerUrl('')
        }else{
            movieTrailer(movie?.title || "").then(url =>{
                const urlParams = new URLSearchParams(new URL(url).search)
                setTrailerUrl(urlParams.get('v'));
            }).catch(() => console.log('Movie is Temporarily unavailable'))
        }
    };

    const handleTrailerEnd = (event) => {
        event.target.stopVideo();
    };
    const closeTrailer = () =>{
        setTrailerUrl('');
    }
    
    return (
        <div className= 'movieRow'>
            <h2>{rowTitle | "Title"}</h2>
            <div className= 'rows'>
                {movies?.map( movie => (
                    <img src={`https://image.tmdb.org/t/p/w500/${isLargeRow ? movie?.poster_path : movie?.backdrop_path}`} 
                        className={`img ${isLargeRow && 'imgLargeRow'}`}
                        key={movie.id}
                        onClick={()=> handleTrailer(movie)}
                        alt=""
                    />
                ))}
            </div>
            {trailerUrl && <div className="trailerWrapper">
                <button onClick={closeTrailer} className="closeTrailer">X</button>
                <YouTube videoId={trailerUrl} opts={opts} onEnd={handleTrailerEnd} />
                
            </div>}
           
        </div>
        //backdrop
    );
}
 
export default MovieRow;