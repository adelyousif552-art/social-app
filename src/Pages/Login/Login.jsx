import Loginform from "../../components/Loginform/Loginform";
import Authhero from "../../components/signuphero/Signuphero";


export default function Login() {
  return <>
  <div className="signuppage grid lg:grid-cols-2">
    <Authhero title={{normal:'Welcome Back',highlight:'to SocialHub App'}} description={'Signin to connect people all over the world'}/>
    <Loginform/>
  </div>
  
  </>
}
