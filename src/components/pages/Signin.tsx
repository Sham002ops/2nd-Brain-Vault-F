import { useRef } from 'react'
import { Input } from '../UI/InputBox'
import Button from '../UI/Button'
import { BACKEND_URL } from '../../Config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PasswordBox } from '../UI/PasswordBox';

const Signin = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

async function signin (){
       try{
        const username = usernameRef.current?.value
        const password = passwordRef.current?.value
        const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
                username,
                password
        })
        const jwt = response.data.token
        
        if(response.data.token !== undefined){
          localStorage.setItem("token", jwt);
          localStorage.setItem("loggedIn", "true");
          navigate("/dashboard")
        }else{
          alert(response.data.message)
        }
        
        
        
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response && error.response.data.error) {
        alert("Validation Error: " + error.response.data.error.message);
      } else {
        alert("Password Don't Match");
      }
    }
  }
       
    
    
    return <div className=' bg-gray-200  h-screen w-screen relative overflow-hidden'>
        
    <div className=' absolute bg-purple-700 h-80 w-80 rounded-full -top-20 -left-20 opacity-75 animate-float '> </div>

    <div className=' absolute bg-gray-800 h-52 w-52 rounded-full -top-4 right-96 animate-float '> </div>

    <h2 className=' absolute text-gray-800 font-bold top-52   drop-shadow-lg shadow-purple-700 left-44 text-5xl font-mono 
    animate-typing'>Step Into a Smarter You.!</h2>

   

    <div className=' absolute bg-purple-700 h-60 w-60 rounded-full bottom-0 -right-2  animate-float'> </div>

    
    
    <div className='flex justify-end pt-20 pr-44 relative'>
        
    <div className=' relative backdrop-blur-md bg-white/10 border shadow-lg shadow-purple-400 border-purple-700 rounded-lg pb-24 pt-24  pr-12 pl-12 z-10 '>
        {/* <div  className=' flex-col items-center justify-center'> */}
        <h2 className=' text-center pt-4 justify-start font-mono font-bold text-3xl text-gray-800 pb-3'>Sign In</h2>
        <h4 className='text-md font-mono'>Back To Your Second Brain You.! </h4>
        <div className='pt-10'>
        <div className='pb-2'>
        <Input size='lx' reference={usernameRef} placeholder='Username'/>
        </div>
        <PasswordBox reference={passwordRef} placeholder='Password'/>
        </div>
        <div className='flex justify-center  items-center pt-6'>
        <Button  size='md' transition='1' onClick={signin}  variant='primary' fullWidth={true} loading={false} text='Sign In'/>
        </div>
        {/* </div> */}
     </div>
    </div>
    
  </div>
}

export default Signin