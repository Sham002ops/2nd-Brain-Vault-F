
import { SidebarItems } from './SidebarItem'
import { TwitterIcon } from '../../icons/TwitterIcon'
// import YoutubeIcon from '../../icons/YoutubeIcon'
import BrainIcon from '../../icons/BrainIcon'
import { Link, useNavigate } from 'react-router-dom'
// import ContentPage from '../pages/ContentPage'
import YoutubeIcon from '../../icons/YoutubeIcon'
import InstaIcon from '../../icons/InstaIcon'
import FacebookIcon from '../../icons/facebookIcon'
import Button from './Button'
import LogoutIcon from '../../icons/LogoutIcon'
import PinterestIcon from '../../icons/PinterestIcon'


const Sidebar = () => {



  const navigate = useNavigate();

  const handleLogout = () => {
    
     
          window.localStorage.clear();
          navigate("/signin");
     
  
      return null;
  };
   
  return <div className='h-screen bg-white border-r w-72 fixed border-2 left-0 top-0 pl-4'>
        <h1 className='flex text-3xl items-center pt-3 font-bold text-gray-700'>
            <div className='text-purple-700 pr-2'>
            <BrainIcon width="50" height="50" className="custom-class " />
            </div>
            2nd Brain
            
        </h1>
        <div className=' pt-8 pl-4 gap-4 '>
              <div className='p-2'>
                <Link to="/content/twitter">
                <SidebarItems  text='Twitter' icon={<TwitterIcon size='lg'/>}/>
                </Link>
              </div>
              <div className='p-2'>
                <Link to="/content/youtube">
                <SidebarItems text='Youtube' icon={<YoutubeIcon size='lg'/>}/>
                </Link>
              </div>
              <div className='p-2'>
                <Link to="/content/instagram">
                <SidebarItems text='Instagram' icon={<InstaIcon className=' w-6 h-6'/>}/>
                </Link>
              </div>
              <div className='p-2'>
                <Link to="/content/facebook">
                <SidebarItems text='Facebook' icon={<FacebookIcon className=' w-6 h-6'/>}/>
                </Link>
              </div>
              <div className='p-2'>
                <Link to="/content/pinterest">
                <SidebarItems text='Pinterest' icon={<PinterestIcon className=' w-6 h-6'/>}/>
                </Link>
              </div>
              <div className=' pt-60 pl-12'>
                <Button variant="primary" size="md" text="Logout" transition='4' onClick={handleLogout} endIcon={<LogoutIcon width={20} height={20} fill=""/>}></Button>
              </div>
        </div>
        
        
  </div>
}

export default Sidebar