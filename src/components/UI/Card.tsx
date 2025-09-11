import DeleteIcon from "../../icons/DeleteIcon";
import DocIcon from "../../icons/DocIcon";
import InstaIcon from "../../icons/InstaIcon";
import { ShareIcon } from  '../../icons/ShareIcon'
import { TwitterIcon } from "../../icons/TwitterIcon";
import YoutubeIcon from "../../icons/YoutubeIcon";
import DeleteContent from "./DeleteContent";
import FacebookIcon from "../../icons/facebookIcon";
import PinterestIcon from "../../icons/PinterestIcon";
import { Tweet } from 'react-tweet'


export interface CardProps {
  _id: string;
  title: string;
  tags: string[];
  link: string;
  type: "twitter" | "youtube" | "instagram" | "facebook" | "pinterest" | "doc";
  onDelete: (id: string) => void;
  onOpen: () => void;
  description?: string;
}

const Card = ({ _id, onDelete, title, link, tags, type, description, onOpen }: CardProps & { onOpen: () => void }) => {
  const SmartIcon = () => {
    if (type === "youtube") return <YoutubeIcon size="lg" />;
    if (type === "twitter") return <TwitterIcon size="lg" />;
    if (type === "instagram") return <InstaIcon className="w-6 h-6" />;
    if (type === "facebook") return <FacebookIcon />;
    if (type === "pinterest") return <PinterestIcon className="w-6 h-6" />;
    if (type === "doc") return <DocIcon size="md" />;
    return <DocIcon size="md" />;
  };

  // For Pinterest embed
  const parts = link.split("/");
  const pinId = parts[parts.length - 2];

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this content?");
    if (confirmDelete) {
      await DeleteContent(_id);
      const success = true;
      if (success) {
        onDelete(_id);
      }
    }
  };

  return (
    <div className="group">
      <div
        className="
          w-full max-w-full sm:max-w-[22rem] md:max-w-[24rem] lg:max-w-80
          bg-neutral-900/90 text-white rounded-2xl
          border border-violet-700/40 shadow-lg hover:shadow-violet-700/20
          transition duration-200 overflow-hidden
          px-3 sm:px-0  /* small screens get a touch of side padding */
          lg:w-[19rem]  /* keep original desktop width */
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between px-2 sm:px-4 pt-3 sm:pt-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
            <div className="text-violet-300">
              <SmartIcon />
            </div>
            <span className="line-clamp-1 text-gray-100">{title}</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition"
            >
              <ShareIcon size="md" />
            </a>
            <button
              onClick={handleDelete}
              className="text-gray-300 hover:text-red-400 transition"
              aria-label="Delete"
            >
              <DeleteIcon size="md" />
            </button>
          </div>
        </div>

        {/* Media/Embed */}
        <div className="px-2 sm:px-4 pt-2 sm:pt-3">
          <div className="rounded-xl overflow-hidden bg-black/40 border border-gray-700">
            {type === "youtube" && (
              <iframe
                className="w-full h-40 sm:h-44 md:h-52 lg:h-44"
                src={link
                  .replace("watch", "embed")
                  .replace("shorts", "embed")
                  .replace("?v=", "/")
                  .split("&t=")[0]}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            )}

            {type === "twitter" && (
                <div className="w-full">
                  <Tweet 
                    id={link.split('/').pop() || ""} // Ensure id is always a string
                    apiUrl={undefined} // Provide apiUrl as undefined to satisfy type
                  />
                </div>
              )}

            {type === "instagram" && (
              <div className="w-full">
                <iframe
                  src={`${link}embed`}
                  className="w-full"
                  frameBorder={0}
                  scrolling="no"
                  allowTransparency
                  // Height responsive
                  height={360}
                  // sm ~380, md ~420
                  style={{ height: '380px' }}
                />
              </div>
            )}

            {type === "facebook" && (
              <div className="w-full">
                <iframe
                  src={`https://www.facebook.com/plugins/post.php?href=${link}`}
                  className="w-full"
                  frameBorder={0}
                  scrolling="no"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  style={{ border: "none", overflow: "hidden", height: '300px' }}
                />
              </div>
            )}

            {type === "pinterest" && (
              <div className="w-full">
                <iframe
                  src={`https://assets.pinterest.com/ext/embed.html?id=${pinId}`}
                  width="100%"
                  height="360"
                  // sm ~400, md ~440
                  style={{ height: '400px' }}
                  frameBorder={0}
                  scrolling="no"
                  allowTransparency
                />
              </div>
            )}

            {type === "doc" && (
              <div className="p-3 sm:p-4">
                <h1 className="text-gray-100 text-sm sm:text-base font-bold mb-2 line-clamp-2">{title}</h1>
                <ul className="list-disc pl-5 text-gray-300 mb-4 space-y-1 text-sm sm:text-base">
                  {description?.split("\n").map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-300 hover:text-violet-200 underline"
                >
                  Learn More
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Tags + Open */}
        <div className="px-2 sm:px-4 py-3 sm:py-4">
          <h2 className="text-[11px] sm:text-xs font-semibold text-gray-300">Tags</h2>
          <div className="mt-2 flex items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {(tags || []).length ? (
                tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-violet-700/20 border border-violet-600/30 text-violet-200 px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-gray-500 text-xs">No tags</span>
              )}
            </div>

            <button
              onClick={onOpen}
              className="
                shrink-0 inline-flex items-center justify-center rounded-full
                bg-violet-600 hover:bg-violet-700 text-white font-semibold
                px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm
                transition shadow-md hover:shadow-violet-700/30
              "
            >
              Open
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
