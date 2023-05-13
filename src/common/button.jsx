import '../styles/button.css';
const Button = ({btnS, icon, text, onClick}) => {
    return (
        <button className={`btn ${btnS}`} onClick={onClick}>
            <i className={icon}></i>
            <p>{text}</p>
        </button>
    );
}
export default Button;