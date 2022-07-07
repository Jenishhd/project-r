import {Link} from 'react-router-dom';

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <div className="links_left">
                <Link to="/help">Help</Link>
            </div>            
            <h1 className="title">Codle</h1>
            <div className="links_right">
                <Link to="/about">About</Link>
                <Link to="/settings">Settings</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;