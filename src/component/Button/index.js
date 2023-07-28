import './style.css'

const Button = (props) => {
    return (
        <button className={`custom-btn ${props.className}`} onClick={props.onClick}>{props.name}</button>
    )
}

export default Button;