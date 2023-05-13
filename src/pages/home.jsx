import Banner from '../common/banner';
import MovieRow from "../common/movierow";
import NavBar from '../common/navBar';


const Home = () => {

    return (
        <>
            <NavBar/>
            <Banner/>
            <MovieRow rowTitle="Popular on Netflix" category='popular' isLargeRow/>
            <MovieRow rowTitle="Now Playing" category='now_playing'/>
            <MovieRow rowTitle="Top Rated" category='top_rated'/>
            <MovieRow rowTitle="Up Coming" category='upcoming'/>
        </>
    );
}
 
export default Home;