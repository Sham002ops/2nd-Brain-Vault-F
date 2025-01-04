
// import { useState } from 'react';
import CloseIcon from '../../icons/CloseIcon'
import { GetViewcard } from '../hooks/getViewcard';
import { useContent } from '../hooks/useContent';
import { ViewCard } from './ViewCard';

const ViewPost = ({ open, onClose, selectedContentId }: { open: boolean, onClose: () => void, selectedContentId: string }) => {
    const {cardContent} = GetViewcard({_id: selectedContentId});
    const {refresh} = useContent()
   const handleClose =()=>{
    onClose()
    refresh()
   }

  return <div>
        {open && <div>
                <div className=' backdrop-blur bg-white/10  h-screen w-screen  fixed top-0 left-0 flex justify-center z-50' onClick={onClose}>   
                </div>
                <div className=' h-screen w-screen  fixed top-0 left-0 flex justify-center z-50 '>
                <div className='flex flex-col  justify-center '>
               <span className='bg-white border  flex overflow-auto scrollbar-hide border-purple-700 shadow-md shadow-purple-700  p-4 w-full rounded-md'>
              {cardContent && <ViewCard 
                            key={cardContent._id}
                           _id={cardContent._id}
                           tags={cardContent.tags}
                           type={cardContent.type}
                           link={cardContent.link}
                           title={cardContent.title}
                           description={cardContent.description || ''}
                           onDelete={(id) => console.log(`Delete card with id: ${id}`)}
                           onOpen={() => console.log(`Open card with id: ${cardContent._id}`)}
                           />
                         }
                <div className='flex justify-end pl-8'>
                    <div className='cursor-pointer' onClick={handleClose}>
                        <CloseIcon size='lg'/>
                    </div>    
               </div>
           </span> 
        </div>
                </div>
                

            </div>} 
        </div>
    }

    
export default ViewPost 