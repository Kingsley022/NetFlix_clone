import { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../styles/navbar.css';



const NavBar = () => {

    const navigateTo = useNavigate();
    const[isNavScroll, setNavScroll] = useState(false);

    

    //************ Activates NavScroll **********//
    const handleWindowsScroll = () => {
        if(window.scrollY > 8){
            setNavScroll(true);
        }else{
            setNavScroll(false);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleWindowsScroll);
        return () => {window.removeEventListener('scroll', handleWindowsScroll);}
    },[]);


    return (
        <div className={`navBar ${isNavScroll && 'scrollActive'}`}>
            <img src="../images/logo2.png" onClick={() =>navigateTo('/home')} className='logo' alt=''/>

            <div className="links">
                <Link to='/movies' className='link'>Movies</Link>
                <img src="../images/Netflix-avatar.png" className='avatar' onClick={() => navigateTo('/user')} alt=''/>
            </div>
            
        </div>
    );
}
 
export default NavBar;