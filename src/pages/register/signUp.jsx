import { useState } from "react";
import googleIcon from '../../utils/google.png';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase";
const SignUp = ({handleClick}) => {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    
    const handleSignUp = async () => {
       try {
            await createUserWithEmailAndPassword( auth, email, password);
        }catch(err) {
            console.log(err);
        }
    }

    const handleGoogleSignIn = async () =>{
        try {
            await signInWithPopup( auth, googleProvider);
        }catch(err) {
            console.log(err);
        }
    }

    // const handleSignOut = async () =>{
    //     try {
    //         await signOut( auth);
    //     }catch(err) {
    //         console.log(err);
    //     }
    // }



    return (
        <div className="signUp">
            <h2>Sign Up</h2>
            <input type="text" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
            <input type='password' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
            <button type="submit" onClick={handleSignUp}>Sign In</button>
            <button className="googleBtn" onClick={handleGoogleSignIn}><img src={googleIcon}/> <span>Sign In with Google</span></button>

            <p>Already have an account? <span onClick={handleClick}>Sign In</span></p>
        </div>
    );
}
 
export default SignUp;