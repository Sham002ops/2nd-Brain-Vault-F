import axios from 'axios';
import  { useEffect, useState } from 'react'
// import { useContent } from '../hooks/useContent';
import  Card  from '../components/UI/Card';
import { BACKEND_URL } from '../Config';
import Sidebar from '../components/UI/Sidebar';
import Button from '../components/UI/Button';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../components/hooks/useContent';
import SearchBar from '../components/SearchBar';
import ViewPost from '../components/UI/ViewPost';
import { Processing } from '../icons/Processing';
import BrainIcon from '../icons/BrainIcon';


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
    const [menuOpen, setMenuOpen] = useState(false); // responsive sidebar
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
    doc: " Saved Links",
  };
  


  const handleNavigate = ()=>{
    refresh()
    navigate('/dashboard')
  }
  return (

    <div className=' h-40  bg-neutral-950 text-white '>
       {/* Sidebar responsive: drawer on mobile/tablet, fixed on desktop */}
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className=' flex justify-between overflow-hidden  relative lg:ml-72 lg:pl-3 ml-1 pl-1 '> 
        <div className='   '>
          <div className=' flex items-center justify-between p-3'>
              {/* Hamburger for small screens */}
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden inline-flex  p-1 items-center justify-center w-10 h-10 rounded-lg bg-white/10 hover:bg-white/15"
              aria-label="Open menu"
            >
              <BrainIcon width="40" height="40" className="custom-class" />
            </button>
          <h2 className=" lg:text-3xl text-xl mt-1  font-bold w-full pl-4 mb-2 lg:md-4 p-1 lg:p-6  lg:pl-12 text-purple-700">
            {contentHeaders[type] || "Default Content"}
          </h2>
          </div>
          <div className=' bg-neutral-950 lg:ml-1 lg:pl-9 pl-1 ml-1  '>
       <SearchBar setSearchQuery={setSearchQuery}  />
       </div>
       </div>
       </div>
      <div className=' relative ml-1 pl-1 lg:ml-72 lg:pl-12  bg-neutral-950 min-h-screen overflow-auto scrollbar-hide'>
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
      <div className='bg-neutral-950 h-24  relative lg:ml-72 lg:pl-3  ml-1 pt-10 '>
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