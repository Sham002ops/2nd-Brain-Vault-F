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
    type: "twitter" | "youtube"| "instagram" | "facebook" | "pinterest" | "doc";
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
        <div className="">
            {rotateIg ?<div className="p-4  z-50 bg-white rounded-md border border-gray-300  
            max-w-72 min-h-52 min-w-min ">
                 <div className=" w-full rounded-lg overflow-hidden scrollbar-hide ">
                   {type === "youtube" && <div className=" rounded-md p-1 mt-8">
                    <div className=" bg-gray-300 -mt-8 p-1 rounded-md ">
                    <iframe className="" width={900} height={500} src={link.replace("watch", "embed").replace("shorts", "embed").replace("?v=", "/").split("&t=")[0]} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    </div>
                    <div>
                    <Button  onClick={() => setRotateIg(!rotateIg)} size='xs' variant='primary' text='Short'/>
                    </div>
                   </div>}
                   {type === "twitter" && <div  className="overflow-auto ">
                    <iframe
                            src={`https://twitframe.com/show?url=${link.replace("x.com", "twitter.com")}`}
                           height={600}
                            frameBorder="0"
                            scrolling="no"
                            allowTransparency
                        ></iframe>
                    </div>}

                   {type === "instagram" &&  <div className="  overflow-hidden ml-60   scrollbar-hide -my-96 -rotate-90 -mr-20 ">
                    <iframe
                                    src={`${link}embed`}
                                    width="620"
                                    height="1180"
                                    frameBorder="0"
                                    scrolling="no"
                                    allowTransparency
                                ></iframe> 
                    
                            </div> }
                   {type === "facebook" &&
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
                        }
                   {type === "pinterest" && <div  className=" overflow-auto" style={{ display: 'flex', justifyContent: 'center' }}>
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

                </div> 
                <div className=" justify-between pt-2 pb-2">
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
                    <h1 className="text-gray-800  text-sm mt-1 font-bold">Tags</h1>    
                    <div className=" flex justify-between">     
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
                    <div className=" ">
                 <Button  onClick={() => setRotateIg(!rotateIg)} size='sm' variant="secondary" text='Rotate'/>
                 </div>
                 </div>
                
                </div>
                 
                       
                    </div>
                   
            </div>: <div className="p-4 flex  bg-white rounded-md border border-gray-300  
            max-w-72 min-h-52 min-w-min ">
                 <div className=" w-full rounded-lg overflow-auto hide-scrollbar ">
                   {type === "youtube" && <div className=" ">
                    <div className="rounded-md p-1 mt-8 bg-gray-300">
                    <iframe className="" src={link.replace("watch", "embed").replace("shorts", "embed").replace("?v=", "/").split("&t=")[0]} title="YouTube video player" width={500} height={300} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    </div>
                    <div className=" pt-2">
                    <Button  onClick={() => setRotateIg(!rotateIg)} size='md' variant='primary' text='Full'/>

                    </div>
                   </div>}
                   {type === "twitter" && <div  className=" overflow-auto justify-items-center -mt-4 ">
                    <iframe
                            src={`https://twitframe.com/show?url=${link.replace("x.com", "twitter.com")}`}
                           width={330}
                            height={640}
                            frameBorder="0"
                            scrolling="no"
                            allowTransparency
                        ></iframe>
                    </div>}

                   {type === "instagram" &&  <div className="  overflow-auto "> 
                    <iframe
                                    src={`${link}embed`}
                                    
                                    height="600"
                                    frameBorder="0"
                                    scrolling="no"
                                    allowTransparency
                                ></iframe>
                    <div>
                    <Button  onClick={() => setRotateIg(!rotateIg)} size='sm' variant='primary' text='Rotate'/>
                    </div>
                            </div>}
                   {type === "facebook" &&
                    <iframe
                    src={`https://www.facebook.com/plugins/post.php?href=${link}`}
                    width="420"
                    height="620"
                    style={{ border: "none", overflow: "hidden" }}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    ></iframe>
                        }
                   {type === "pinterest" && <div  className=" " style={{ display: 'flex', justifyContent: 'center' }}>
                   <iframe
                            src={`https://assets.pinterest.com/ext/embed.html?id=${pinId}`}
                            width="345"
                            height="600"
                            frameBorder="0"
                            scrolling="no"
                            allowTransparency
                        ></iframe>
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

                    <div className=" pl-4 text-xl text-gray-800 font-bold">
                       
                        {title}

                    </div>
                    <div className=" ml-4 mt-2 border-2 min-h-min w-96 border-purple-700  p-2 rounded-md">
                        <h4 className=" font-bold">Description :</h4>
                        {description}
                    </div>
                    <div className=" pl-4 p-2">
                    <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                            >
                            Learn More
                            </a>
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