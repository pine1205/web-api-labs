import { useContext } from "react"; 
import { Navigate, Outlet, useLocation } from "react-router";
import { AuthContext } from './contexts/authContext'

const ProtectedRoutes = () => {

  const context = useContext(AuthContext);
  const location = useLocation();

  return context.isAuthenticated === true ? (
    <Outlet /> 
  ) : (
    <Navigate to='/login' replace state={{ from: location }}/>
  );
};

//This means: “Let them in” - Show the protected page
//It renders the child route inside this protected wrapper.
/* <Route element={<ProtectedRoutes />}>
  <Route path="/dashboard" element={<Dashboard />} />
</Route> */                   //Dashboard appears inside <Outlet />

export default ProtectedRoutes;


//This component uses the AuthContext to check if a user is authenticated.
//  If they are, the <Outlet /> component is used to render the child component (e.g. Tasks).
//  If not authenticated, the <Navigate> component is used to redirect the user to the login page.