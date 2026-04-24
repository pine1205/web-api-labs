import { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from '../contexts/authContext';
import { Link } from "react-router";

const LoginPage = () => {
    const context = useContext(AuthContext);
    //gives me access to 
//   context.authenticate
// context.isAuthenticated
// context.signout

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    //Stores what user types in login form

    const login = () => {
        context.authenticate(userName, password);
    };
// connect UI to backend login system 
// user types
// clicks login
// calls context.authenticate()
// backend checks credentials
// token is stored if valid



    let location = useLocation();
//     This checks where the user came from.
// user tries to open /dashboard
// gets redirected to login



    // Set 'from' to path where browser is redirected after a successful login - either / or the protected path user requested
    const { from } = location.state ? { from: location.state.from.pathname } : { from: "/" };
//     If user was redirected → send them back there (to login page)
// Otherwise → send them to homepage
// While redirecting, React Router can store where they originally wanted to go.
// User tries: /dashboard
// App redirects: /login
// React stores: "from = /dashboard"
// I send them back: /dashboard
// So they continue exactly where they left off.

    if (context.isAuthenticated === true) {
        return <Navigate to={from} />;
    }
// If user is already logged in: don’t show login page
// send them away automatically


    return (
        <>
            <h2>Login page</h2>
            <p>You must log in to view the protected pages </p>
            <input id="username" placeholder="user name" onChange={e => {
                setUserName(e.target.value);
            }}></input><br />
            <input id="password" type="password" placeholder="password" onChange={e => {
                setPassword(e.target.value);
            }}></input><br />
            {/* Login web form  */}
            <button onClick={login}>Log in</button>
            <p>Not Registered?
                <Link to="/signup">Sign Up!</Link></p>
        </>
    );
};

export default LoginPage;

