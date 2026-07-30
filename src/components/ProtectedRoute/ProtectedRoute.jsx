import { useContext } from "react";
import { Authcontext } from "../../Context/Auth.context";
import { Navigate } from "react-router";


export default function ProtectedRoute({children}) {
  const {token}=useContext(Authcontext)
  if(token){
    return children
  }
  else{
    return <Navigate to={'/login'}/>
  }
}
