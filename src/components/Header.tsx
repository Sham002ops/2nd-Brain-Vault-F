import  { useEffect, useState } from 'react'
import Button from './UI/Button'
import { PlusIcon } from '../icons/plusIcon'
import { BACKEND_URL, SHARE_URL } from '../Config';
import axios from 'axios';
import CreateContent from './UI/CreateContent';
import { useContent } from './hooks/useContent';
import { ShareIcon } from '../icons/ShareIcon';


const Header = () => {

    const [modalOpen, setModalOpen]= useState(false);
      const [isSharing,  setSharing]= useState(false);
      const {refresh} = useContent();

    async function toggelSharing() {
        try {
            if(!isSharing){
              await refresh()
              const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
                share: true,
              },{
                headers: { 
                  "Authorization" :localStorage.getItem("token")
                }
              });
              const newShareUrl = `${SHARE_URL}/${response.data.hash}`;
  
              try {
                await navigator.clipboard.writeText(newShareUrl);
                alert(`Link copied to clipboard: ${newShareUrl}`);
              }catch(clipboardError){
                alert(`Link generated but could not copy: ${newShareUrl}`)
                console.error('Clipboard error :', clipboardError);
              }
              setSharing(true);
  
            } else if(isSharing){
                await axios.post(`${BACKEND_URL}/api/v1/brain/share`,
                  {share: false},
                  {
                    headers:{
                      "Authorization": localStorage.getItem("token")
                    }
                  }
                );
                  await refresh()
                  setSharing(false);
                  alert("Sharing Stopped");
                
            }
        }
        catch (error){
          console.error("error sharing:", error);
          alert("Somthing went wrong. Please try again leter,")
          
        }
      } 

      useEffect(()=>{
        refresh()
      }, [modalOpen, refresh])

  return (
    <div className='p-4 h-20 bg-gray-300 relative flex justify-between'>
    <CreateContent open={modalOpen} onClose={()=>{
      setModalOpen(false);
    }}/>
    <div className=' flex items-center justify-between'>
    <div className=' mr-96 pr-60 '>  
      <span className='text-3xl font-bold text-gray-800'>All Links</span>
      </div> 
   
    </div>
    
    <div className='flex items-center gap-4'>
    <Button onClick={()=>{
      setModalOpen(true)
    }} startIcon={<PlusIcon size={'md'}/>} transition='1' size='sm'  variant='primary'text="Add Content"/>

    <div >
    <Button onClick={toggelSharing} startIcon={<ShareIcon size={'md'}/>} size='md' variant='secondary' transition='3' text={isSharing ? 'End Sharing' :'Share Brain'}/>
    </div>
    </div> 
    
    </div>
  )
}

export default Header