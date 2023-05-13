import { useQuery } from "@tanstack/react-query";
import Axios from 'axios';
import '../styles/banner.css';
import Button from "./button";
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import { useState } from "react";
import { toast } from 'react-toastify';



import { useTruncate } from "../hooks/useTruncate";
import { useNavigate } from "react-router-dom";
const Banner = () => {

    const { data:movies, status, isLoading } = useQuery(['movies'], async ()=>{
        const res = await Axios.get('https://api.themoviedb.org/3/movie/popular?api_key=eeb39aadae951e239caedd1d5494e13c');
        return res.data.results;
     });

    const{ truncate } = useTruncate(); 
    const[trailerUrl, setTrailerUrl] = useState('');
    const navigateTo = useNavigate();
    
    let newMovie;
    if (status === 'success') {
        const randIndex = Math.floor(Math.random() * movies?.length-1);
        const randMovie = movies[randIndex];
        newMovie = randMovie;
    }else if(isLoading){
        return (<h1>Loading...</h1>)
    };
    
    const bg = `linear-gradient(to top, #00000080,
     #00000080), url(https://image.tmdb.org/t/p/w500${newMovie?.backdrop_path})`;
    
    const handleMoviePlay = () => {
        if(trailerUrl){
            setTrailerUrl('')
        }else{
            movieTrailer(newMovie?.title || "").then(url =>{
                const urlParams = new URLSearchParams(new URL(url).search)
                setTrailerUrl(urlParams.get('v'));
            }).catch(() => alert('Movie is Temporarily unavailable'))
        }
    }

    const opts= {
        height: '390',
        width: '100%',
        playerVars: {
          autoplay: 1,
          showinfo: 0
        },
      };

    const handleTrailerEnd = (event) => {
        event.target.stopVideo();
        navigateTo('/home');
    };
    const closeTrailer = () =>{
        setTrailerUrl('');
        navigateTo('/home');
    }
    
    const handleAddToList = () => {
        const modal = document.createElement('div');
        modal.innerHTML = 'Added to list';
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.backgroundColor = '#e8e7e5';
        modal.style.border = 'none';
        modal.style.padding = '10px';
        modal.style.zIndex = '9999';
        modal.style.fontSize = '12px';
        modal.style.borderRadius = '5px';
        document.body.appendChild(modal);
      
        setTimeout(() => {
          modal.style.display = 'none';
        }, 1000);
      };

    return (
        <>
            <div className="banner" style={{
                background : bg,
                backgroundSize: '100% 100%',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                }}>
                <div className="txtArea">
                    <h1>{newMovie.original_title}</h1>
                    <p>{truncate(newMovie?.overview, 300)}</p>
                    <div className="btns">
                        <Button icon ="fa fa-play" text ="Play" onClick={handleMoviePlay}/>
                        <Button icon ="fa fa-plus" text ="My List" btnS= 'btnStyle' onClick={handleAddToList}/>
                    </div>
                </div>

                {trailerUrl && <div className="trailerWrapper">
                <button onClick={closeTrailer} className="closeTrailer">X</button>
                <YouTube videoId={trailerUrl} opts={opts} onEnd={handleTrailerEnd} />
                
                </div>}
                

                <div className="fadedbottom"></div>
            </div>
        </>
    );
}
 
export default Banner;