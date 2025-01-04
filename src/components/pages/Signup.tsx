import  { useRef } from 'react'
import { Input } from '../UI/InputBox'
import Button from '../UI/Button'
import { BACKEND_URL, SHARE_URL } from '../../Config';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PasswordBox } from '../UI/PasswordBox';

const Signup = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();



async function signup (){
        const username = usernameRef.current?.value
        const password = passwordRef.current?.value
        const email = emailRef.current?.value

       try { 
       const response = await axios.post(BACKEND_URL + "/api/v1/signup", {
                username,
                password,
                email
        })
      
        if(response.data.message === "User signed up"){
          alert("You have Signed up");
          navigate("/signin")
        } else {
          alert("Signup failed: " + response.data.message);
        }
       
       } catch(e: unknown){
        if (axios.isAxiosError(e) && e.response && e.response.data.error){
          alert("Validation Error: " + e.response.data.error.message);
        } else{
           alert("An unexpected error occurred.");
        }
       }

        
    }

    function ToSignin() {
       
        
       navigate("/signin")


        
    }
    console.log(`signup.tsx: BACKEND_URL: ${BACKEND_URL}`);
    console.log(`Shared URL: ${SHARE_URL}/api/v1/signup`);
    
    


  return <div className=' bg-gray-200  h-screen w-screen relative overflow-hidden'>
        
        <div className=' absolute bg-purple-700 h-80 w-80 rounded-full -top-20 -left-20 opacity-75 animate-float '> </div>

        <div className=' absolute bg-gray-800 h-52 w-52 rounded-full -top-4 right-96 animate-float '> </div>

        <h2 className=' absolute text-gray-800 font-bold top-52   drop-shadow-lg shadow-purple-700 left-44 text-5xl font-mono 
        animate-typing'>Step Into a Smarter You.!</h2>

       <div className=''>
       <h4 onClick={ToSignin} className=' absolute top-72 left-44 flex justify-center border-2 border-purple-700 p-2 rounded-sm cursor-pointer font-mono hover:bg-purple-700 hover:text-white'><h4 className='text-purple-700 ml-1  z-10 hover:bg-purple-700 hover:text-white'>Skip the SignUp</h4></h4>
       </div>

        <div className=' absolute bg-purple-700 h-60 w-60 rounded-full bottom-0 -right-2  animate-float'> </div>

        
        
        <div className='flex justify-end pt-20 pr-44 relative'>
            
        <div className=' relative backdrop-blur-md bg-white/10 border shadow-lg shadow-purple-400 border-purple-700 rounded-lg pb-24 pt-24  pr-12 pl-12 z-10 '>
            {/* <div  className=' flex-col items-center justify-center'> */}
            <h2 className=' text-center pt-4 justify-start font-mono font-bold text-3xl text-gray-800 pb-3'>Sign up</h2>
            <h4 className='text-md font-mono'>Just some detils to get you in.! </h4>
            <div className='pt-10'>
            <div className='pb-2'>
            <Input size='2lx' reference={emailRef} placeholder='email@.com'/>
            </div>
            <div className='pb-2'>
            <Input size='2lx'  reference={usernameRef} placeholder='Username'/>
            </div>
            <PasswordBox reference={passwordRef} placeholder='Password'/>
            </div>
            <div className='flex justify-center  items-center pt-6'>
            <Button  size='md' transition='1' onClick={signup}  variant='primary' fullWidth={true} loading={false} text='Sign Up'/>
            </div>
            <h4 onClick={ToSignin} className=' flex justify-center text-centertext-sm mt-6 cursor-pointer font-mono'>Already Ragistered?  <h4 className='text-purple-700 ml-1 hover:underline '>Sign In</h4></h4>
            {/* </div> */}
         </div>
        </div>
        
      </div>

}
export default Signup