import DocIcon from "../../icons/DocIcon";
import InstaIcon from "../../icons/InstaIcon";
import { ShareIcon } from  '../../icons/ShareIcon'
import { TwitterIcon } from "../../icons/TwitterIcon";
import YoutubeIcon from "../../icons/YoutubeIcon";
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

export const ShareCard = ({ title, link, tags, type, onOpen }: CardProps & { onOpen: ()=> void}) => {
  const SmartIcon = () => {
    if (type === "youtube") return <YoutubeIcon size="lg" />;
    if (type === "twitter") return <TwitterIcon size="lg" />;
    if (type === "instagram") return <InstaIcon className="w-6 h-6" />;
    if (type === "facebook") return <FacebookIcon />;
    if (type === "pinterest") return <PinterestIcon className="w-6 h-6" />;
    return <DocIcon size="md" />;
  };

  const parts = link.split('/');
  const pinId = parts[parts.length - 2];

  return (
    <div>
      <div
        className="
          p-4 bg-neutral-900/95 text-white rounded-2xl
          border border-violet-700/40 shadow-lg hover:shadow-violet-700/20
          max-w-72 min-h-52 min-w-min transition
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center text-sm font-semibold">
            <div className="text-violet-300 pr-2">
              <SmartIcon />
            </div>
            <span className="line-clamp-1">{title}</span>
          </div>
          <div className="flex items-center">
            <a href={link} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white transition pr-2">
              <ShareIcon size="md" />
            </a>
          </div>
        </div>

        {/* Media/Embed */}
        <div className="pt-3 w-full rounded-lg overflow-hidden">
          {type === "youtube" && (
            <iframe
              className="block w-full -mt-2 h-36"
              src={link.replace("watch", "embed").replace("?v=", "/").split("&t=")[0]}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          )}

          {type === "twitter" && (
            <div className="w-72 -ml-4 -mt-6 mr-2">
              <iframe
                src={`https://twitframe.com/show?url=${link.replace("x.com", "twitter.com")}`}
                height={330}
                frameBorder={0}
                scrolling="no"
                allowTransparency
              />
            </div>
          )}

          {type === "instagram" && (
            <div className="w-72 -mt-3 mr-2 -m-3">
              <iframe
                src={`${link}embed`}
                height="380"
                frameBorder={0}
                scrolling="no"
                allowTransparency
              />
            </div>
          )}

          {type === "facebook" && (
            <div className="w-72 -mt-3 mr-2 -m-3">
              <iframe
                src={`https://www.facebook.com/plugins/post.php?href=${link}`}
                height="300"
                style={{ border: "none", overflow: "hidden" }}
                scrolling="no"
                frameBorder={0}
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </div>
          )}

          {type === "pinterest" && (
            <div className="-m-8 -mt-6 -ml-9 mr-1">
              <iframe
                src={`https://assets.pinterest.com/ext/embed.html?id=${pinId}`}
                width="320"
                height="400"
                frameBorder={0}
                scrolling="no"
                allowTransparency
              />
            </div>
          )}
        </div>

        {/* Tags + Open */}
        <h1 className="text-gray-300 text-sm mt-2 font-bold">Tags</h1>
        <div className="flex mt-1 justify-between items-center">
          <div className="flex gap-2 flex-wrap mt-1">
            {(tags || []).map((tag, index) => (
              <span
                key={index}
                className="bg-violet-700/20 text-violet-200 border border-violet-600/30 my-1 px-2 py-1 rounded-md text-xs"
              >
                {tag}
              </span>
            )) || <span className="text-gray-500 text-xs">No tags available</span>}
          </div>
          <div className="mt-2">
            <Button onClick={onOpen} transition="1" size="lng" variant="primary" text="Open" />
          </div>
        </div>
      </div>
    </div>
  );
};
