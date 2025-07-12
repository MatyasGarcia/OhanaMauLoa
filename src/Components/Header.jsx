import Foto1 from "../assets/IMG/Foto1.jpg"
import "../Styles/Header.css"

function Header() {
    return (
        <header className="HeaderContainer">
                <div className="HeaderCard">
                    <img src={Foto1} alt="Foto1" className="HeaderImage"/>
                        <div className="HeaderText">
                            <p>Un lugar donde abunda la buena onda y un increíble servicio.  
                            Trabajamos como una familia para realzar tu belleza y que te sientas como en casa.</p>
                        </div>
                </div>
        </header>
    );
}
export default Header;