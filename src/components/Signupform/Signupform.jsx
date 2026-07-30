
import { faArrowRight, faCalendar, faEnvelope, faLock, faSpinner, faUser, faVenusMars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router";

import Formfield from "../UI/formfield/Formfield";
import Socialbuttons from "../UI/socialbuttons/Socialbuttons";
import Divider from "../UI/Divider/Divider";
import useSignup from "../../Hooks/useSignup";



export default function Signupform() {
  
  const{formik}=useSignup()
 
  
  return<>
  <div className="signupform bg-gray-200/40 flex justify-center items-center min-h-screen">
    <form onSubmit={formik.handleSubmit} className="bg-white max-w-lg mx-auto p-10  space-y-3">
      <header className="text-center">
        <h2>Create account</h2>
        <p>Already have an account? <Link to={'/login'} className="text-blue-500">sign in</Link></p>
      </header>
     <Socialbuttons/>
      <Divider text={'or continue with email'}/>
      <div className="inputs ">
        <Formfield
        labeltext={'Full Name'}
        id={'name'}
        placeholder={"enter your full name"}
        name={'name'}
        inputtype={'text'}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        starticon={faUser}
        error={formik.errors.name}
        touched={formik.touched.name}
        elementtype={"input"}
        />
        <Formfield
        labeltext={'User Name'}
        id={'username'}
        placeholder={"Enter your user name"}
        name={'username'}
        inputtype={'text'}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.username}
        starticon={faUser}
        error={formik.errors.username}
        touched={formik.touched.username}
        elementtype={"input"}
        />
        <Formfield
        labeltext={'Email Address'}
        id={'email'}
        placeholder={"name@example.com"}
        name={'email'}
        inputtype={'email'}
        onChange={formik.handleChange}
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
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        starticon={faLock}
        error={formik.errors.password}
        touched={formik.touched.password}
        elementtype={"input"}
        />
       <Formfield
        labeltext={'Confirm Password'}
        id={'ConfirmPassword'}
        placeholder={"confirm Password"}
        name={'rePassword'}
        inputtype={'password'}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.rePassword}
        starticon={faLock}
        error={formik.errors.rePassword}
        touched={formik.touched.rePassword}
        elementtype={"input"}
        />
        <div className="flex items-center gap-2 *:grow">
           <div className="date">
          
         <Formfield
        labeltext={'date of birth'}
        id={'date'}
        
        name={'dateOfBirth'}
        inputtype={'date'}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.dateOfBirth}
        starticon={faCalendar}
        error={formik.errors.dateOfBirth}
        touched={formik.touched.dateOfBirth}
        elementtype={"input"}
        />
         
        </div>
        
         <div className="gender">
          
           <Formfield
        labeltext={'Gender'}
        id={'gender'}
        
        name={'gender'}
        
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.gender}
        starticon={faVenusMars}
        error={formik.errors.gender}
        touched={formik.touched.gender}
        elementtype={"select"}
        options={[{
          text:'choose your gender',
          value:'',
          dis:true
        },{
          text:'Male',
          value:'male',
          dis:false
        },
      {
        text:'Female',
        value:'female',
        dis:false
      }
      ]}
        />
        </div>
        
        </div>
       
      </div>
      <button disabled={!(formik.isValid&&formik.dirty)||formik.isSubmitting} className="btn w-100 bg-linear-to-r disabled:cursor-not-allowed disabled:from-gray-500 disabled:to-gray-200  mt-5 from-blue-600 to-blue-300 text-white hover:-translate-y-2 transition-all hover:from-blue-300 hover:to-blue-600 duration-400">{formik.isSubmitting?<>
      submitting <FontAwesomeIcon icon={faSpinner} spin/></>:<>
      Create Account <FontAwesomeIcon icon={faArrowRight}/></>}</button>
    </form>
  </div>
  
  
  
  </>
}
