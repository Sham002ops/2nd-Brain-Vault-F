import  { memo, ReactElement } from 'react'

type Variants ="primary" | "secondary"|"icon";
export interface ButtonProps {
    variant: Variants;
    size: "sm" | "md" | "lg" | "xs"| "bs"| "lng";
    text?: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean;
    transition?: "1" | "2" | "3" | "4";
    reference?: React.RefObject<HTMLButtonElement>;
    
}

const variantStyles = {
  "primary": "bg-purple-700 text-white",
  "picon": "bg-purple-700 fill-slate-100  text-white",
  "sicon": "bg-purple-100 fill-purple-700  text-white",
  "secondary": "bg-purple-100 text-purple-700"
}

const transitionStyle = {
  "1": " transition ease-in-out delay-150 bg-purple-700 hover:-translate-y-1 hover:scale-110 hover:bg-purple-700 duration-150",
  "2": " transition ease-in-out delay-150 bg-purple-700 hover:-translate-y-1 hover:scale-110 hover:bg-purple-700 duration-300",
  "3": " transition ease-in-out delay-150 bg-white hover:-translate-y-1 hover:scale-110 hover:bg-white duration-300",
  "4": " transition ease-in-out delay-150 bg-red-500 text-red-500 hover:-translate-y-1 hover:scale-110 hover:bg-red-600 hover:text-white duration-150"
} 
const sizeStyles = {
  "xs" : "py-1 px-1",
  "bs" : "py-1 px-4",
  "lng" : "py-1 px-4" ,
  "sm" : "py-2 px-2" ,
  "md" : "py-2 px-4",
  "lg" : "py-4 px-6"
}

const defaultStyles = "rounded-md p-4 flex"
const Button = memo(({variant, text, startIcon, onClick, endIcon, size,fullWidth, reference,transition, loading}: ButtonProps) => {
  return <button onClick={onClick} className={` justify-center items-center ${transition ? transitionStyle[transition] : ''} ${variantStyles[variant]} ${sizeStyles[size]} ${defaultStyles}
   ${fullWidth ? " w-full": ""} ${loading ? "opacity-70" : ""} `} disabled={loading} ref={reference}>
    {startIcon ? <div className=' pr-2  '>{startIcon}</div>: null } {text}  {endIcon ? <div className=' pl-1 '>{endIcon}</div>: null }</button>
})

export default Button