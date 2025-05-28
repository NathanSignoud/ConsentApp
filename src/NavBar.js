import { Link, useHistory } from 'react-router-dom';

const NavBar = ({logged, setLogged}) => {

    const history = useHistory();

    const handleLogout = () => {
    setLogged(false);
    history.push('/login');
  };

    return ( 
        <nav className="navbar">
            <div className="navbar-left">
                <h1>Name</h1>
                <h2>Role</h2>
            </div>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create">New patient</Link>
                {!logged && <Link to="/login">Login</Link>}
                {logged && <button onClick={handleLogout}>Logout</button>}
            </div>
        </nav>
     );
}
 
export default NavBar;