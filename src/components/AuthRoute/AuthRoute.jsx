import { useContext } from "react";
import { Authcontext } from "../../Context/Auth.context";
import { Navigate } from "react-router";


export default function AuthRoute({children}) {
  const {token}=useContext(Authcontext)
  if(token){
    return <Navigate to={'/'}/>
  }else{
    return children
  }
}
