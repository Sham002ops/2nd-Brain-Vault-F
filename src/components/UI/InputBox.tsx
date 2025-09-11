interface InputProps {
    placeholder : string,
    size: "xs" |"sm" | "md" | "lg" | "lx"|"2lx";
    reference ?: React.RefObject<HTMLInputElement>,
    value?: "email" | "password"| "text"
    Px?: "px2" |"px4" |"px6"|"px8"|"px10",
    Py?: "py2" |"py4" |"py6"|"py8"|"py10",
    textColor?: string,
    onChange?: (e)=> void,
    onKeyDown?: (e)=> void,
}
export function Input({reference, onChange, onKeyDown, placeholder, size, value, textColor}:InputProps){

//    const PxStyle ={
//        "px2": "px-2" ,
//        "px4": "px-4" ,
//        "px6": "px-6" ,
//        "px8": "px-8" ,
//        "px10": "px-10" 
//     }

//    const PyStyle ={
//        "py2": "py-2" ,
//        "py4": "py-4" ,
//        "py6": "py-6" ,
//        "py8": "py-8" ,
//        "py10": "py-10" 
//     }

const sizeStyles = {
    "xs" : "py-1 px-1" ,
    "sm" : "py-2 px-2" ,
    "md" : "py-2 px-4",
    "lg" : "py-4 px-6",
    "lx" : "py-2 px-5",
    "2lx" : "py-2 px-6"
  }

    return <div>
        <input ref={reference}
                 placeholder={placeholder} onKeyDown={onKeyDown} type={"text"} onChange={onChange} value={value}  className={` outline-none bg-transparent border-2 border-purple-700 rounded-lg  text-xl placeholder-gray-500 ${size ? sizeStyles[size]: ''} ${textColor ? `text-${textColor}` : ''}`}  />
    </div>
}    
