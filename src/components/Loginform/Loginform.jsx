
import { faArrowRight,  faEnvelope, faLock, faSpinner, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link} from "react-router";
import Formfield from "../UI/formfield/Formfield";
import Socialbuttons from "../UI/socialbuttons/Socialbuttons";
import Divider from "../UI/Divider/Divider";
import useLogin from "../../Hooks/useLogin";
export default function Loginform() {
   const{formik,setloginerror,loginerror}=useLogin()
  return<>
  <div className="signupform bg-gray-200/40 flex justify-center items-center min-h-screen">
    <form onSubmit={formik.handleSubmit} className="bg-white max-w-lg mx-auto p-10  space-y-3">
      <header className="text-center">
        <h2>Login</h2>
        <p>don't have an account? <Link to={'/signup'} className="text-blue-500">sign up</Link></p>
      </header>
     <Socialbuttons/>
      <Divider text={'or continue with email'}/>
      <div className="inputs ">
       
       
        <Formfield
        labeltext={'Email Address'}
        id={'email'}
        placeholder={"name@example.com"}
        name={'email'}
        inputtype={'email'}
        onChange={(e)=>{
            formik.handleChange(e)
            setloginerror(null)
        }}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        starticon={faEnvelope}
        error={formik.errors.email}
        touched={formik.touched.email}
        elementtype={"input"}
        
        />
        
         <Formfield
        labeltext={'Password'}
        id={'password'}
        placeholder={"Password"}
        name={'password'}
        inputtype={'password'}
        onChange={(e)=>{
            formik.handleChange(e)
            setloginerror(null)
        }}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        starticon={faLock}
        error={formik.errors.password}
        touched={formik.touched.password}
        elementtype={"input"}
        />
        {loginerror?<div className="p-3 rounded-xl bg-red-300 text-red-600">{loginerror}</div>:''}
      
       
      </div>
      <button disabled={!(formik.isValid&&formik.dirty)||formik.isSubmitting} className="btn w-100 bg-linear-to-r disabled:cursor-not-allowed disabled:from-gray-500 disabled:to-gray-200  mt-5 from-blue-600 to-blue-300 text-white hover:-translate-y-2 transition-all hover:from-blue-300 hover:to-blue-600 duration-400">{formik.isSubmitting?<>
      signing in <FontAwesomeIcon icon={faSpinner} spin/></>:<>
      sign in <FontAwesomeIcon icon={faArrowRight}/></>}</button>
    </form>
  </div>
  
  
  
  </>
}
