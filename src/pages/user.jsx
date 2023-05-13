import { getAuth, signOut } from "firebase/auth";
import banner from '../utils/loginBanner.jpg';
import '../styles/user.css';
import { useContext } from "react";
import { AppContext } from "../App";
import NavBar from "../common/navBar";
import { useNavigate } from "react-router-dom";


const User = () => {

    const auth = getAuth();
    const{user, setUser} = useContext(AppContext);
    const navigateTo = useNavigate();
    const bannerImg = `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${banner})`;

    const handleSignOut = () => {
        signOut(auth).then(() => {
            setUser('');
            setTimeout(() => {navigateTo('/')}, 2000);
            alert("Sign out successful")
        }).catch((error) => {
            console.log(error.message)
        });
    }



    return (
        <>
            <NavBar/>
            <div className="acctContainer" style={{backgroundImage: bannerImg}}>
                <div className="acct">
                    <h2> Welcome @{ user ? user : "Unknown user"}</h2>
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>
            </div>
        </>
    );
}
 
export default User;