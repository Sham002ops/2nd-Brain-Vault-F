import { FacebookEmbed, InstagramEmbed, PinterestEmbed, XEmbed, YouTubeEmbed } from "react-social-media-embed";
import DeleteIcon from "../../icons/DeleteIcon";

import { ShareIcon } from  '../../icons/ShareIcon'

import DeleteContent from "./DeleteContent";
import { useState } from "react";
import Button from "./Button";


 export interface CardProps {
    _id: string;
    title: string;
    tags: string[];
    link: string;
    description: string;
    type: "twitter" | "youtube"| "instagram" | "facebook" | "pinterest";
    onDelete: (id: string) => void;
    onOpen: () => void;
}

export const ViewCard = ({_id, onDelete,title, link,tags, type, description}: CardProps & { onOpen: ()=> void}) =>{
    const [rotateIg, setRotateIg] = useState(false);

    // const SmartIcon = () => {
    //     if (type === "youtube") return <YoutubeIcon size="lg" />;
    //     if (type === "twitter") return <TwitterIcon size="lg" />;
    //     if (type === "instagram") return <InstaIcon className=' w-6 h-6' />;
    //     if (type === "facebook") return <FacebookIcon />;
    //     if (type === "pinterest") return <PinterestIcon className=' w-6 h-6'/>;
    //     return <DocIcon size="md" />;
    //   };
    
    
    
        

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
        <div className="">
            {rotateIg ?<div className="p-4  z-50 bg-white rounded-md border border-gray-300  
            max-w-72 min-h-52 min-w-min ">
                 <div className=" w-full rounded-lg overflow-x-auto scrollbar-hide ">
                   {type === "youtube" && <div className=" rounded-md p-1 mt-8 bg-gray-300">
                    <YouTubeEmbed url={link} />
                   </div>}
                   {type === "twitter" && <div  className="overflow-auto ">
                    <XEmbed url={link} />
                    </div>}

                   {type === "instagram" &&  <div className=" pl-60 mx-32 overflow-auto  -mt-10 scrollbar-hide -mb-72 -rotate-90  -mr-10 "> <InstagramEmbed
                    url={link} /> 
                    <div>
                 <Button  onClick={() => setRotateIg(!rotateIg)} size='sm' variant='primary' text='Rotate'/>
                 </div>
                            </div> }
                   {type === "facebook" && <FacebookEmbed
                            url={link}/>
                        }
                   {type === "pinterest" && <div  className=" overflow-auto" style={{ display: 'flex', justifyContent: 'center' }}>
                            <PinterestEmbed 
                                url={link}
                                width={345}
                                height={467}
                            />
                            </div>
                        }

                </div> 
                <div className=" justify-between pb-2">
                        <div className="flex justify-end gap-4">
                        <div className="text-gray-500  ">
                            <a href={link} target="_blank">
                                 <ShareIcon size="lg"/>
                            </a>
                        </div>
                        <button onClick={handleDelete} className="text-gray-500 cursor-pointer pr-2 h-4  w-4  hover:text-red-600 hover:rounded-sm">
                            <DeleteIcon  size="lg"/>
                        </button>
                        </div>

                    <div className=" pl-4 text-xl font-bold">
                       
                        {title}

                    </div>
                    <div className=" ml-4 border min-h-min w-96 border-gray-600  p-2 rounded-sm">
                        {description}
                    </div>
                        
                    <div className=" justify-start mt-6 ">
                    <hr className="my-2  border-gray-400" />
                    <h1 className="text-gray-800 text-sm mt-1 font-bold">Tags</h1>         
                    <div className=" gap-2 flex-wrap   mt-1">
                        {(tags || []).map((tag, index) => (
                            <span
                                key={index}
                                className="bg-purple-200 text-purple-700 px-2 py-1 ml-2  rounded-md"
                            >
                                {tag}
                            </span>
                        )) || <span>No tags available</span>}
                    </div>
                
                </div>
                 
                       
                    </div>
                   
            </div>: <div className="p-4 flex  bg-white rounded-md border border-gray-300  
            max-w-72 min-h-52 min-w-min ">
                 <div className=" w-full rounded-lg overflow-auto hide-scrollbar ">
                   {type === "youtube" && <div className=" rounded-md p-1 mt-8 bg-gray-300">
                    <YouTubeEmbed url={link} />
                   </div>}
                   {type === "twitter" && <div  className=" ">
                    <XEmbed url={link} />
                    </div>}

                   {type === "instagram" &&  <div className="  overflow-auto "> <InstagramEmbed
                    url={link} width={330}/> 
                    <div>
                    <Button  onClick={() => setRotateIg(!rotateIg)} size='sm' variant='primary' text='Rotate'/>
                    </div>
                            </div>}
                   {type === "facebook" && <FacebookEmbed
                            url={link}/>
                        }
                   {type === "pinterest" && <div  className=" " style={{ display: 'flex', justifyContent: 'center' }}>
                            <PinterestEmbed 
                                url={link}
                                width={345}
                                height={600}
                            />
                            </div>
                        }

                </div> 
                <div className=" justify-between pb-2">
                        <div className="flex justify-end gap-4">
                        <div className="text-gray-500  ">
                            <a href={link} target="_blank">
                                 <ShareIcon size="lg"/>
                            </a>
                        </div>
                        <button onClick={handleDelete} className="text-gray-500 cursor-pointer pr-2 h-4  w-4  hover:text-red-600 hover:rounded-sm">
                            <DeleteIcon  size="lg"/>
                        </button>
                        </div>

                    <div className=" pl-4 text-xl font-bold">
                       
                        {title}

                    </div>
                    <div className=" ml-4 mt-2 border-2 min-h-min w-96 border-gray-300  p-2 rounded-sm">
                        <h4 className=" font-bold">Description :</h4>
                        {description}
                    </div>
                        
                    <div className=" justify-start pl-4 mt-6 ">
                    <hr className="my-2  border-gray-400" />
                    <h1 className="text-gray-800 text-sm mt-1 font-bold">Tags</h1>         
                    <div className=" gap-2 flex-wrap   mt-1">
                        {(tags || []).map((tag, index) => (
                            <span
                                key={index}
                                className="bg-purple-200 text-purple-700 px-2 py-1 ml-2  rounded-md"
                            >
                                {tag}
                            </span>
                        )) || <span>No tags available</span>}
                    </div>
                
                </div>
                       
                    </div>
                   
            </div>}
        </div>
    )
} 