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

  return (
    <div className="w-full">
      {rotateIg ? (
        <div className="
          p-3 sm:p-4 z-50 bg-neutral-900/95 text-white rounded-md border border-gray-300
          w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-5xl
          min-h-52
        ">
          <div className="w-full rounded-lg overflow-hidden">
            {type === "youtube" && (
              <div className="rounded-md p-1 sm:p-2 mt-4 sm:mt-6">
                <div className="bg-gray-300 -mt-4 sm:-mt-6 p-1 sm:p-2 rounded-md">
                  <iframe
                    className="block w-full"
                    width={900}
                    height={500}
                    src={link.replace("watch", "embed").replace("shorts", "embed").replace("?v=", "/").split("&t=")[0]}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <div className="pt-2">
                  <Button onClick={() => setRotateIg(!rotateIg)} size="xs" variant="primary" text="Short"/>
                </div>
              </div>
            )}

            {type === "twitter" && (
              <div className="overflow-auto">
                <iframe
                  src={`https://twitframe.com/show?url=${link.replace("x.com", "twitter.com")}`}
                  height={500}
                  className="block w-full"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency
                />
              </div>
            )}

            {type === "instagram" && (
              <div className="overflow-hidden sm:ml-24 md:ml-40 lg:ml-60 -my-64 sm:-my-72 md:-my-80 -rotate-90 sm:-mr-10 md:-mr-20">
                <iframe
                  src={`${link}embed`}
                  width="620"
                  height="1180"
                  className="block"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency
                />
              </div>
            )}

            {type === "facebook" && (
              <iframe
                src={`https://www.facebook.com/plugins/post.php?href=${link}`}
                width="100%"
                height={360}
                style={{ border: "none", overflow: "hidden" }}
                className="block"
                scrolling="no"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            )}

            {type === "pinterest" && (
              <div className="overflow-auto flex justify-center">
                <iframe
                  src={`https://assets.pinterest.com/ext/embed.html?id=${pinId}`}
                  width="320"
                  height="400"
                  className="block"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="justify-between pt-2 pb-2">
            <div className="flex justify-end gap-4">
              <div className="text-gray-400">
                <a href={link} target="_blank" rel="noreferrer">
                  <ShareIcon size="lg"/>
                </a>
              </div>
              <button onClick={handleDelete} className="text-gray-400 hover:text-red-500 transition">
                <DeleteIcon size="lg"/>
              </button>
            </div>

            <div className="pl-3 sm:pl-4 text-lg sm:text-xl font-bold">{title}</div>

            <div className="ml-3 sm:ml-4 border min-h-min w-full sm:w-96 border-gray-600 p-2 rounded-sm mt-2">
              {description}
            </div>

            <div className="mt-6">
              <hr className="my-2 border-gray-600" />
              <h1 className="text-gray-300 text-sm mt-1 font-bold">Tags</h1>
              <div className="flex justify-between items-center gap-2 flex-wrap">
                <div className="flex gap-2 flex-wrap mt-1">
                  {(tags || []).map((tag, index) => (
                    <span key={index} className="bg-purple-200 text-purple-700 px-2 py-1 rounded-md text-xs">
                      {tag}
                    </span>
                  )) || <span>No tags available</span>}
                </div>
                <div>
                  <Button onClick={() => setRotateIg(!rotateIg)} size="sm" variant="secondary" text="Rotate" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Compact view */
        <div className="
          p-3 sm:p-4 bg-neutral-900/95 text-white rounded-md border border-gray-300
          w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-5xl
          min-h-52
        ">
          <div className="w-full rounded-lg overflow-auto">
            {type === "youtube" && (
              <div>
                <div className="rounded-md p-1 sm:p-2 mt-4 sm:mt-6 bg-gray-300">
                  <iframe
                    className="block w-full"
                    src={link.replace("watch", "embed").replace("shorts", "embed").replace("?v=", "/").split("&t=")[0]}
                    title="YouTube video player"
                    width={500}
                    height={300}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <div className="pt-2">
                  <Button onClick={() => setRotateIg(!rotateIg)} size="md" variant="primary" text="Full" />
                </div>
              </div>
            )}

            {type === "twitter" && (
              <div className="overflow-auto -mt-2 sm:-mt-4">
                <iframe
                  src={`https://twitframe.com/show?url=${link.replace("x.com", "twitter.com")}`}
                  width={320}
                  height={520}
                  className="block"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency
                />
              </div>
            )}

            {type === "instagram" && (
              <div className="overflow-auto">
                <iframe
                  src={`${link}embed`}
                  height={520}
                  className="block w-full"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency
                />
                <div className="pt-2">
                  <Button onClick={() => setRotateIg(!rotateIg)} size="sm" variant="primary" text="Rotate" />
                </div>
              </div>
            )}

            {type === "facebook" && (
              <iframe
                src={`https://www.facebook.com/plugins/post.php?href=${link}`}
                width={360}
                height={560}
                style={{ border: "none", overflow: "hidden" }}
                className="block"
                scrolling="no"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            )}

            {type === "pinterest" && (
              <div className="flex justify-center">
                <iframe
                  src={`https://assets.pinterest.com/ext/embed.html?id=${pinId}`}
                  width={320}
                  height={540}
                  className="block"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="justify-between pb-2">
            <div className="flex justify-end gap-4">
              <div className="text-gray-400">
                <a href={link} target="_blank" rel="noreferrer">
                  <ShareIcon size="lg"/>
                </a>
              </div>
              <button onClick={handleDelete} className="text-gray-400 hover:text-red-500 transition">
                <DeleteIcon size="lg"/>
              </button>
            </div>

            <div className="pl-3 sm:pl-4 text-lg sm:text-xl font-bold">{title}</div>

            <div className="ml-3 sm:ml-4 mt-2 border-2 min-h-min w-full sm:w-96 border-purple-700 p-2 rounded-md">
              <h4 className="font-bold">Description :</h4>
              {description}
            </div>

            <div className="pl-3 sm:pl-4 p-2">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Learn More
              </a>
            </div>

            <div className="pl-3 sm:pl-4 mt-6">
              <hr className="my-2 border-gray-600" />
              <h1 className="text-gray-300 text-sm mt-1 font-bold">Tags</h1>
              <div className="flex flex-wrap gap-2 mt-1">
                {(tags || []).map((tag, index) => (
                  <span key={index} className="bg-purple-200 text-purple-700 px-2 py-1 rounded-md text-xs">
                    {tag}
                  </span>
                )) || <span>No tags available</span>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
