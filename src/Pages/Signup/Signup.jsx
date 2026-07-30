import Signupform from "../../components/Signupform/Signupform";
import Authhero from "../../components/signuphero/Signuphero";



export default function Signup() {
  return <>
  <div className="signuppage grid lg:grid-cols-2">
    <Authhero title={{normal:'Connect with',highlight:'amazing people'}} description={'join millions of users sharing moments, ideas, and buildingmeaningful connections every day.'}/>
    <Signupform/>
  </div>
  
  </>
}
