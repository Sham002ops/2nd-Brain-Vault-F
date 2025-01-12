
import React, { useEffect, useState } from 'react'
import Button from '../UI/Button'
import { PlusIcon } from '../../icons/plusIcon'
import Sidebar from '../../components/UI/Sidebar'
import { useContent } from '../hooks/useContent'
import Header from '../Header'
import SearchBar from '../SearchBar'
import CreateContent from '../UI/CreateContent'

const ViewPost = React.lazy(() => import('../UI/ViewPost'));
const Card = React.lazy(() => import('../UI/Card'))

export function Dashboard({searchQuery, setSearchQuery}) {
      const [modalOpen, setModalOpen]= useState(false);
      const [viewmodalOpen, setViewModalOpen]= useState(false);
      const [selectedContentId, setSelectedContentId] = useState<string | null>(null);

      const {contents = [], refresh }: { contents: Array<{ _id: string, type: "twitter" | "youtube" | "instagram" | "facebook" | "pinterest" | "doc", tags: string[], link: string, title: string, description: string }>, refresh: () => void } = useContent();
      
      
      const handleDelete = (id: string) => {
    
      contents.filter((content) => content._id !== id);
      refresh();
    }


    const handleOpen = (id: string) => {
      setSelectedContentId(id);
      setViewModalOpen(true);
  };

      useEffect(()=>{
        refresh()
      }, [modalOpen,viewmodalOpen, refresh])


  return (
   <div className=' bg-gray-300 ml-72 relative pl-3'>
      <Sidebar/>
        <Header/>
        <SearchBar setSearchQuery={setSearchQuery}  />
        {contents.length === 0 ? (
          <div className='flex flex-col items-center justify-center h-screen text-gray-800'>
            <CreateContent open={modalOpen} onClose={()=>{
                setModalOpen(false);
              }}/>
            
            <h2 className='text-3xl font-bold mb-4 -mt-20'>Wellcome to Second Brain Vault!</h2>
            <p className='text-lg mb-16 text-center'>
              Get started by adding your first content.
             <p> This dashboard helps you manage and organize everything in one
              place.
              </p>
            </p>
            <div className=' border border-purple-700 shadow-md shadow-purple-600 rounded-lg '>
            <Button onClick={() => {
              setModalOpen(true);
            }} transition='2' startIcon={<PlusIcon size='md'/>} size='lg' variant='primary' text='Add Content'/>
            </div>
          </div>
        ) : ( 
          <div className=' pl-6'>
            <div>
            {
              <ViewPost open={viewmodalOpen} onClose={()=>{
                setViewModalOpen(false)}} selectedContentId={selectedContentId ||''} />
            }
            </div>
            <div>
            <div id='cards' className='flex gap-10 pt-6  flex-wrap'>
          {contents.filter((content) =>
                content.tags.some((tag) =>
                  tag.includes(searchQuery.toLowerCase())
                )
              ).map(({_id,type,tags, link, title, description}) => <Card 
                key={_id}
                _id={_id}
                tags={tags}
                type={type}
                link={link}
                title={title}
                description={type === "doc" ? description : undefined}
                onOpen={() => handleOpen(_id)}
                onDelete={handleDelete}
            />

              )}
        </div>
            </div>
          </div>
        
        )}
      </div>
      
      
   
  )
}


