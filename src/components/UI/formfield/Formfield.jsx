import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Formfield({
    labeltext,
    id,
    placeholder,
    name,
    inputtype,
    onChange,
    onBlur,
    value,
    starticon,
    error,
    touched,
    classname,
    elementtype,
    options,
    
}) {
    const renderelement=()=>{
        switch(elementtype){
            case "input":
            return <>
             
              <input
               className={`form-control ${classname}`}
             type={inputtype}
             id={id}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            
            
            />
             
             </>;
            case "select":
            return <>
            <select className="form-control"
             id={id}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            >    
            {options.map((option,index)=>{
                return <option key={index} disabled={option.dis} value={option.value}>{option.text}</option>
            })}
            
            </select>
            
            </>;
            case "textarea":
              return <textarea
               className={`form-control ${classname}`}
             
             id={id}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
              
              
              />


              
            
        }
    }
  return <>
  
  <div className={name}>
            
              <label htmlFor={id}>{labeltext}</label>
           <div className="relative">
            
          {renderelement()}
  
            <FontAwesomeIcon className="absolute left-4 top-1/2 text-gray-400 -translate-y-1/2" icon={starticon}/>
           </div>
          
          </div>
          <div className="h-8 ">
            {error&&touched?<p className="text-red-500 text-xs">*{error}</p>:''}
            
          </div>
          
  
  
  </>
}
