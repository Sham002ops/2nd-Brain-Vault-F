import  { useEffect, useState } from 'react'
import Button from './UI/Button'
import { PlusIcon } from '../icons/plusIcon'
import { BACKEND_URL, SHARE_URL } from '../Config';
import axios from 'axios';
import CreateContent from './UI/CreateContent';
import { useContent } from './hooks/useContent';
import { ShareIcon } from '../icons/ShareIcon';
import { ProcessingIcon } from './UI/ProcessingIcon';


const Header = () => {

    const [modalOpen, setModalOpen]= useState(false);
      const [isSharing,  setSharing]= useState(false);
      const [loading, setLoading] = useState(false);
      const {refresh} = useContent();

    async function toggelSharing() {
      if (loading) return;
      setLoading(true);
        try { 
          const endpoint = `${BACKEND_URL}/api/v1/brain/share`;
          const headers = { Authorization: localStorage.getItem("token") || "" };
            if(!isSharing){
              const response = await axios.post(endpoint,{ share: true },{ headers });
              const newShareUrl = `${SHARE_URL}/${response.data.hash}`;
  
              try {
                await navigator.clipboard.writeText(newShareUrl);
                alert(`Link copied to clipboard: ${newShareUrl}`);
              }catch(clipboardError){
                alert(`Link generated but could not copy: ${newShareUrl}`)
                console.error('Clipboard error :', clipboardError);
              }
              setSharing(true);
  
            } else {
                await axios.post(endpoint, {share: false},{ headers });
                  setSharing(false);
                  alert("Sharing Stopped");        
            }
            await refresh();
        }
        catch (error){
          console.error("error sharing:", error);     
        }
        finally {
          setLoading(false);
        }
      } 

      useEffect(()=>{
        refresh()
      }, [refresh])

  return (
    <div className='p-3 h-20 bg-gray-300 relative flex justify-between'>
    <CreateContent open={modalOpen} onClose={()=>{
      setModalOpen(false);
    }}/>
    <div className=' flex items-center justify-between'>
    <div className=' mr-96 pr-60 '>  
      <span className='text-3xl font-bold text-gray-800'>All Links</span>
      </div> 
    </div>
    
    <div className='flex items-center gap-4'>
    <Button 
    onClick={()=> setModalOpen(true)} 
    startIcon={<PlusIcon size={'md'}/>} 
    transition='1' 
    size='sm'  
    variant='primary'
    text="Add Content"
    />

    <div >
    <Button onClick={toggelSharing} startIcon={<ShareIcon size={'md'}/>} size='md' variant='secondary' transition='3' text={isSharing ? 'End Sharing' :'Share Brain'} loading={loading} endIcon={loading ? <ProcessingIcon/> : <></>}/>
    </div>
    </div> 
    
    </div>
  )
}

export default Header