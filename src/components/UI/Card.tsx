import { FacebookEmbed, InstagramEmbed, PinterestEmbed, XEmbed } from "react-social-media-embed";
import DeleteIcon from "../../icons/DeleteIcon";
import DocIcon from "../../icons/DocIcon";
import InstaIcon from "../../icons/InstaIcon";
import { ShareIcon } from  '../../icons/ShareIcon'
import { TwitterIcon } from "../../icons/TwitterIcon";
import YoutubeIcon from "../../icons/YoutubeIcon";
import DeleteContent from "./DeleteContent";
import FacebookIcon from "../../icons/facebookIcon";
import PinterestIcon from "../../icons/PinterestIcon";
import Button from "./Button";

 export interface CardProps {
    _id: string;
    title: string;
    tags: string[];
    link: string;
    type: "twitter" | "youtube"| "instagram" | "facebook" | "pinterest";
    onDelete: (id: string) => void;
    onOpen: () => void;
    description?: string;
}

export const Card = ({_id, onDelete,title, link,tags, type,onOpen}: CardProps & { onOpen: ()=> void}) =>{
    
    const SmartIcon = () => {
        if (type === "youtube") return <YoutubeIcon size="lg" />;
        if (type === "twitter") return <TwitterIcon size="lg" />;
        if (type === "instagram") return <InstaIcon className=' w-6 h-6' />;
        if (type === "facebook") return <FacebookIcon />;
        if (type === "pinterest") return <PinterestIcon className=' w-6 h-6'/>;
        return <DocIcon size="md" />;
      };
    
    
    
        

        const handleDelete = async ()=> {
            const confermDelete = window.confirm("Are you sure you want to delete this content?")
            if(confermDelete){
                 await DeleteContent(_id);
                 const success = true;
               
            if(success) {
                onDelete(_id)
            }
            }
        }

    return(
        <div>
            <div className="p-4   bg-white rounded-2xl  shadow shadow-purple-300 border-slate-400 border
            max-w-72 min-h-52 min-w-min ">
                 <div className="flex justify-between pb-2">
                    <div className="flex items-center text-md">
                        <div  className="text-gray-500 pr-2">
                            <SmartIcon/>
                            
                        </div>
                        {title}
                    </div>
                    <div className="flex items-center">
                        <div className="text-gray-500 pr-2">
                            <a href={link} target="_blank">
                                 <ShareIcon size="md"/>
                            </a>
                        </div>
                        <button onClick={handleDelete} className="text-gray-500 cursor-pointer pr-2 h-4  w-4  hover:text-red-600 hover:rounded-sm">
                            <DeleteIcon  size="md"/>
                        </button>
                    </div>
                 </div>
                
                <div className="pt-4 w-full rounded-lg overflow-hidden ">
                   {type === "youtube" &&  <iframe className="w-full -mt-4 h-36" src={link.replace("watch", "embed").replace("?v=", "/").split("&t=")[0]} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                   {type === "twitter" && <div  className=" flex-col w-80 -m-2 -mt-2 mb-4 justify-items-center  pt-2 -mr-8 -ml-8   h-72">
                    <XEmbed url={link} />
                    </div>}

                   {type === "instagram" && <div className=" flex-col w-80 -m-8 -mt-28 mb-36 justify-items-center  pt-2   h-72"> <InstagramEmbed
                    url={link}/> 
                    
                            </div>
                        }
                   {type === "facebook" && <FacebookEmbed
                            url={link}/>
                        }
                   {type === "pinterest" && <div  className=" flex-col w-80  justify-items-center  -m-6 -mt-8 mb -ml-16  mr-4 pt-2   h-96" style={{ display: 'flex', justifyContent: 'center' }}>
                            <PinterestEmbed 
                                url={link}
                                width={345}
                                height={467}
                            />
                            </div>
                        }

                </div> 
                    <h1 className="text-gray-800 text-sm mt-1 font-bold">Tags</h1>
                    <div className=" flex mt-1 justify-between">
                    <div className="flex gap-2 flex-wrap  mt-1">
                        {(tags || []).map((tag, index) => (
                            <span
                                key={index}
                                className="bg-violet-200  text-purple-700 my-1 px-1   rounded-md"
                            >
                                {tag}
                            </span>
                        )) || <span>No tags available</span>}
                    </div>
                    <div className="mt-2 ">
                    <Button onClick={onOpen} transition='1' size='lng'  variant='primary'text="Open"/>
                    </div>
                </div>
            </div>
        </div>
    )
} 