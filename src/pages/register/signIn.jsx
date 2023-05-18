import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react"
import { getAuth, fetchSignInMethodsForEmail } from "firebase/auth";
import { AppContext } from "../../App";



const SignIn = () => {

    const auth = getAuth();
    const navigateTo = useNavigate();
    const[email, setEmail] = useState('');
    const[isEmailValid, setIsEmailValid] = useState(false);
    const[isInvalidEmail, setIsInvalidEmail] = useState(false);
    const[errMsg, setErrMsg] = useState('');
    const{setUser, isLoggedIn, setIsLoggedIn} = useContext(AppContext)
    


    const handleSignIn = () => {
        // Check if user input is a valid Email syntax using regular expression
        const emailRegex = /\S+@\S+\.\S+/;

        if (!emailRegex.test(email)) {
            setIsInvalidEmail(true);
            setErrMsg("Enter a valid email address");
            return;
        }

        // Firebase Sign in method **********
        fetchSignInMethodsForEmail(auth, email)
            .then( signInMethods => {
                if (signInMethods.length > 0) {
                    setIsEmailValid(true);
                    setUser(email);
                    setIsLoggedIn(true);
                    navigateTo('/home');
                } else {
                    setIsInvalidEmail(true);
                    setErrMsg("Email doesn't exist. Sign up");
                }
            })
            .catch( error => {
                setErrMsg("Error fetching sign-in methods");
                console.log("Error fetching sign-in methods:", error);
            });
    }

    const handleSkip = () =>{
        setIsLoggedIn(true)
        setEmail('Unknown User')
        navigateTo('/home')
    };


    return (
        <div className="signIn">
                <h1>Unlimited movies, TV shows and more.</h1>
                <p>Watch anywhere. Cancel anytime</p>
                <p>Ready? Enter your email to create or restart your membership.</p>

                <input type="text" placeholder="Email address..." onChange={(e) => setEmail(e.target.value)} />

                <button onClick={handleSignIn}>Get Started <span>&#62;</span></button>
                {isInvalidEmail && <p className="error">{errMsg}</p>}
                <p onClick={handleSkip} className='skip'>Skip</p>
            </div>
    );
}
 
export default SignIn;