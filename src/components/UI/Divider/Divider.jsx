

export default function Divider({text,classname}) {
  return <>
  <div className={`divider text-center ${classname} before:w-3/10 before:h-px  before:absolute before:bg-linear-to-r before:from-transparent before:via-gray-600/50 before:to-transparent before:left-0 relative before:top-1/2 before:translate-y-1/2  
        after:w-3/10 after:h-px  after:absolute after:bg-linear-to-r after:from-transparent after:via-gray-600/50 after:to-transparent after:right-0  after:top-1/2 after:translate-y-1/2 `}>
          {text}
        </div>
  
  
  </>
}
