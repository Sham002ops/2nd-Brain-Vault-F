import axios from 'axios';
import  { useEffect, useState } from 'react'
// import { useContent } from '../hooks/useContent';
import  Card  from '../UI/Card';
import { BACKEND_URL } from '../../Config';
import Sidebar from '../UI/Sidebar';
import Button from '../UI/Button';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import SearchBar from '../SearchBar';
import ViewPost from '../UI/ViewPost';
import { Processing } from '../../icons/Processing';


interface Content {
    _id: string;
    type: string;
    tags: string[];
    link: string;
    title: string;
    description?: string;
}

const ContentPage = ({type, searchQuery, setSearchQuery}: {type: "twitter" | "youtube" | "instagram" | "facebook" | "pinterest" | "doc", description?: string, searchQuery: string, setSearchQuery: (query: string) => void}) => {
    const [content, setContent] = useState<Content[]>([]);
    const [loading, setLoading ] = useState(true);
    const {contents, refresh} = useContent();
    const [viewmodalOpen, setViewModalOpen] = useState(false);
    const [selectedContentId, setSelectedContentId] = useState<string | null>(null);
    const navigate = useNavigate();
    // const {contents} = useContent();

    const handleDelete = async (id: string) => {
      try {
          const updatedContents = contents.filter((content: Content) => content._id !== id);
          setContent(updatedContents); 
          refresh(); 
      } catch (error) {
          console.error("Error deleting content:", error);
      }
  };

  
  const handleOpen = (id: string) => {
    setSelectedContentId(id);
    setViewModalOpen(true);
};
  

  useEffect(() => {
    const fetchContent = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/content/type/${type}`, {
                headers: {
                    "Authorization": localStorage.getItem("token"),
                },
            });
            setContent(response.data.content);
        } catch (error) {
            console.error("Error fetching content:", error);
        } finally {
            setLoading(false);
        }
    };
    fetchContent();
}, [type]);



  if(loading){
     return  <div className=" flex pt-80 items-center  justify-center">
                <Processing/>
               </div>;
  }

  const contentHeaders = {
    youtube: "YouTube Content",
    twitter: "Twitter/X Content",
    instagram: "Instagram Content",
    facebook: " Facebook Content",
    pinterest: "Pinterest Content",
    doc: "Doc Content",
  };


  const handleNavigate = ()=>{
    refresh()
    navigate('/dashboard')
  }
  return (

    <div className=' h-40 bg-gray-300 '>
      <Sidebar/> 
      <div className=' justify-between overflow-hidden  relative ml-72 pl-3 '> 
        <div className=' flex items-center'>
          <h2 className="text-3xl font-bold md-4 p-6  pl-12 text-purple-700">
            {contentHeaders[type] || "Default Content"}
          </h2>
          <div className=' bg-gray-300 pl-96 ml-10  '>
       <SearchBar setSearchQuery={setSearchQuery}  />
       </div>
       </div>
       </div>
      <div className=' relative ml-72 pl-12  bg-gray-300 min-h-screen overflow-auto scrollbar-hide'>
       <div className='flex flex-wrap h-40 pt-6 gap-10'>
    {(() => {
        try {
            return content.filter((content) =>
              content.tags.some((tag) =>
                tag.includes(searchQuery.toLowerCase())
              )
            ).map(({_id,type,tags, link, title, description}) => <Card 
          key={_id}
          _id={_id}
          tags={tags}
          type={type as "twitter" | "youtube" | "instagram" | "facebook" | "pinterest" | "doc"}
          link={link}
          title={title}
          description={type === "doc" ? description : undefined}
          onOpen={() => handleOpen(_id)}
          onDelete={handleDelete}
          />

            )
        } catch (error) {
            console.error("Error rendering content:", error);
            return <div>Error loading content cards</div>;
        }
    })()}
</div>


      </div>
      <div className='bg-gray-300  h-24  relative ml-72 pt-10 '>
      <div className=" flex justify-center items-center ">
                    <Button onClick={handleNavigate} size='sm'  variant='primary'text="Go to Dashboard"/>
            </div>
           
      </div>
      {selectedContentId && (
                <ViewPost
                    open={viewmodalOpen}
                    onClose={() => setViewModalOpen(false)}
                    selectedContentId={selectedContentId}
                />
            )}
    </div>
  )
}

export default ContentPage