import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../Config";
import ExpiredImg from '../../assets/LinkExpired.png'
import Button from "../UI/Button";
import ViewPost from "../UI/ViewPost";
import { ShareCard } from "../UI/ShareCard";
import { Processing } from "../../icons/processing";
interface ShareContent  {
    username: string;
    content: {
        _id: string;
        type: "twitter" | "youtube" | "instagram" | "facebook" | "pinterest";
        link: string;
        title: string;
    }[];
}


export const SharePage: React.FC = () => {
    const { shareLink } = useParams<{shareLink: string}>();
    const [data, setData] = useState<ShareContent>();
    const [error, setError] = useState<string | null>(null);
    const [viewPostOpen, setViewPostOpen] = useState(false);
    const [selectedContentId, setSelectedContentId] = useState<string | null>(null);
    const navigate = useNavigate();
    

    useEffect(() => {
            async function fetchShareContent() {
                try {
                    const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${shareLink}`);
                    setData(response.data)
                } catch(e) {
                    console.error('Error fetching shared content:', e);
                    setError('Link Expired, Please check the link and try again.');
                }
                
            }


            fetchShareContent();

    }, [shareLink]);

    const handleOpen = useCallback((id: string) => {
        setSelectedContentId(id);
        setViewPostOpen(true);
    }, []);

    if(error) {
        return  <div>
        <div className="mt-48 flex items-center  justify-center text-red-600">
            <img className="h-48 w-72 pl-16" src={ExpiredImg} alt="Link Expired" />
            </div>
            <div className=" flex items-center justify-center text-2xl text-red-600">
            <div>{error}</div>;     
            </div>
            <div className="flex justify-center items-center mt-40">
                    <Button onClick={()=>{
                                    navigate('/signin')
                        }} size='sm'  variant='primary'text="Go to SignIn Page"/>
            </div>
            </div>
    }

    if (!data) {
        return (
          <div className=" flex pt-80 items-center  justify-center">
           <Processing/>
          </div>
        );
      }
      

    return(
        <div className="p-4 min-h-screen  bg-gray-300">
            <h1 className="text-3xl font-bold text-gray-700 mb-8 pl-2">{data?.username}'s Shared Content</h1>
            <div className="flex gap-4 flex-wrap">
                {data?.content.map(({ _id,type, link, title}, index) => <ShareCard
                    key={index} 
                    type={type} 
                    link={link} 
                    title={title} 
                    _id={_id} 
                    tags={[]} 
                    onDelete={function (): void {
                        throw new Error("Function not implemented.");
                    } } 
                    onOpen={() => handleOpen(_id)}
                     />
            )}
            </div>
            {selectedContentId && (
        <ViewPost
          open={viewPostOpen}
          onClose={() => setViewPostOpen(false)}
          selectedContentId={selectedContentId}
        />
      )}
        </div>
    )
}