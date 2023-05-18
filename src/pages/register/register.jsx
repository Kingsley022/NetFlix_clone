import '../../styles/login.css';
import banner from '../../utils/loginBanner.jpg';
import logo from '../../utils/logo3.png';
import SignUp from './signUp';
import SignIn from './signIn';
import { useState } from 'react';





const Register = () => {
    const bannerImg = `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${banner})`;
    const [isLoginPage, setIsLoginPage] = useState(true);


    const handleRedirect = () =>{
        setIsLoginPage(prev => !prev);
    }
    
    return (
        <div className="loginContainer" style={{backgroundImage: bannerImg}}>
            <div className="nav">
                <img src={logo} alt=''/>
                {isLoginPage && <button onClick={handleRedirect}>Sign up</button>}
            </div>
            {isLoginPage ? <SignIn/> :  <SignUp handleClick ={handleRedirect}/>}

            <div className="bottom"></div>
        </div>
    );
}
 
export default Register;