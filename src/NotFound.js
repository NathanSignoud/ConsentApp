import { Link } from "react-router-dom/cjs/react-router-dom";

const NotFound = () => {
    return ( 
        <div className="not-found">
            <h2>404 Error</h2>
            <p>That Page Cannot be Found</p>
            <Link to='/'>Back to the Home page</Link>
        </div>
     );
}
 
export default NotFound;