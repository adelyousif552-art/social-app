import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Socialbuttons() {
  return <>
   <div className="social-buttons text-center flex items-center gap-2 *:grow">
          <button className="btn space-x-1 transition-transform duration-300 hover:-translate-y-2 ">
            <FontAwesomeIcon className="text-red-600" icon={faGoogle} />
            <span>Google</span>
          </button>
          <button className="btn space-x-1 bg-blue-600 text-white transition-transform duration-300 hover:-translate-y-2">
            <FontAwesomeIcon icon={faFacebookF} />
            <span>Facebook</span>
          </button>
        </div>
        </>
}
