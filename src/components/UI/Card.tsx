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
    type: "twitter" | "youtube"| "instagram" | "facebook" | "pinterest" | "doc";
    onDelete: (id: string) => void;
    onOpen: () => void;
    description?: string;
}

const Card = ({_id, onDelete,title, link,tags, type, description,onOpen}: CardProps & { onOpen: ()=> void}) =>{
    
    const SmartIcon = () => {
        if (type === "youtube") return <YoutubeIcon size="lg" />;
        if (type === "twitter") return <TwitterIcon size="lg" />;
        if (type === "instagram") return <InstaIcon className=' w-6 h-6' />;
        if (type === "facebook") return <FacebookIcon />;
        if (type === "pinterest") return <PinterestIcon className=' w-6 h-6'/>;
        if (type === "doc") return <DocIcon size="md"/>;
        return <DocIcon size="md" />;
      };
    
    //for pintrest embed
      const parts = link.split('/');
      const pinId = parts[parts.length - 2];
      
        

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
        <div >
            <div className="p-4   bg-white rounded-2xl  shadow shadow-purple-300 border-slate-400 border
            max-w-72 min-h-52 min-w-min " >
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
                   {type === "youtube" &&  <iframe className="w-full -mt-4 h-36" src={link.replace("watch", "embed").replace("shorts", "embed").replace("?v=", "/").split("&t=")[0]} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                   {type === "twitter" && <div className="  w-72 -ml-4 -mt-8 mr-2  ">
                        <iframe
                            src={`https://twitframe.com/show?url=${link.replace("x.com", "twitter.com")}`}
                           height={330}
                            frameBorder="0"
                            scrolling="no"
                            allowTransparency
                        ></iframe>
                        </div>


                                    }

                   {type === "instagram" && <div className="  w-72  -mt-4 mr-2 -m-3   ">
                                <iframe
                                    src={`${link}embed`}
                                    
                                    height="380"
                                    frameBorder="0"
                                    scrolling="no"
                                    allowTransparency
                                ></iframe>
                                </div>

                        }
                   {type === "facebook" && 
                        <div className=" w-72  -mt-4 mr-2 -m-3">
                       <iframe
                            src={`https://www.facebook.com/plugins/post.php?href=${link}`}
                            width=""
                            height="300"
                            style={{ border: "none", overflow: "hidden" }}
                            scrolling="no"
                            frameBorder="0"
                            allowFullScreen={true}
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            ></iframe>
                      </div>
                      
                        }
                   {type === "pinterest" && <div className=" -m-8 -mt-6  -ml-9 mr-1 ">
                    
                        <iframe
                            src={`https://assets.pinterest.com/ext/embed.html?id=${pinId}`}
                            width="320"
                            height="400"
                            frameBorder="0"
                            scrolling="no"
                            allowTransparency
                        ></iframe>
                        </div>


                        }
                {type === "doc" && (
                    <div className="pt-1">
                    <h1 className="text-gray-800 text-lg font-bold mb-2">{title}</h1>
                    <ul className="list-disc pl-5 text-gray-700 mb-4">
                    {description?.split("\n").map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
            </ul>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Learn More
            </a>
          </div> 
                )}

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

export default Card