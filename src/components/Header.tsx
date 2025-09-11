import { useEffect, useState } from 'react'
import Button from './UI/Button'
import { PlusIcon } from '../icons/plusIcon'
import { BACKEND_URL, SHARE_URL } from '../Config';
import axios from 'axios';
import CreateContent from './UI/CreateContent';
import { useContent } from './hooks/useContent';
import { ShareIcon } from '../icons/ShareIcon';
import { ProcessingIcon } from './UI/ProcessingIcon';
import BrainIcon from '../icons/BrainIcon';
import CloseIcon from '../icons/CloseIcon';

type HeaderProps = {
  onMenu?: () => void; // optional sidebar open handler (mobile/tablet)
};

const Header: React.FC<HeaderProps> = ({ onMenu }) => {
  const [modalOpen, setModalOpen]= useState(false);
  const [isSharing,  setSharing]= useState(false);
  const [loading, setLoading] = useState(false);
  const {refresh} = useContent();

  async function toggelSharing() {
    if (loading) return;
    setLoading(true);
    try { 
      const endpoint = `${BACKEND_URL}/api/v1/brain/share`;
      const headers = { Authorization: localStorage.getItem("token") || "" };
      if(!isSharing){
        const response = await axios.post(endpoint,{ share: true },{ headers });
        const newShareUrl = `${SHARE_URL}/${response.data.hash}`;

        try {
          await navigator.clipboard.writeText(newShareUrl);
          alert(`Link copied to clipboard: ${newShareUrl}`);
        }catch(clipboardError){
          alert(`Link generated but could not copy: ${newShareUrl}`)
          console.error('Clipboard error :', clipboardError);
        }
        setSharing(true);

      } else {
        await axios.post(endpoint, {share: false},{ headers });
        setSharing(false);
        alert("Sharing Stopped");        
      }
      await refresh();
    }
    catch (error){
      console.error("error sharing:", error);     
    }
    finally {
      setLoading(false);
    }
  } 

  useEffect(()=>{
    refresh()
  }, [refresh])

  return (
    <div className="relative flex items-center justify-between h-20 px-4 md:px-6 bg-neutral-950 text-white border-b border-violet-700/40">
      <CreateContent
        open={modalOpen}
        onClose={() => {
            setModalOpen(false);
          }}
          />

          {/* Desktop View */}
          <div className="hidden lg:flex items-center gap-3">
          <span className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">All Links</span>
          </div>
          <div className="hidden lg:flex items-center gap-3 md:gap-4">
          <Button
            onClick={() => setModalOpen(true)}
            startIcon={<PlusIcon size={'md'} />}
            transition="1"
            size="sm"
            variant="primary"
            text="Add Content"
          />

          <div className="rounded-xl border border-violet-700/40 bg-violet-600/10">
            <Button
            onClick={toggelSharing}
            startIcon={<ShareIcon size={'md'} />}
            size="md"
            variant="secondary"
            transition="3"
            text={isSharing ? 'End Sharing' : 'Share Brain'}
            loading={loading}
            endIcon={loading ? <ProcessingIcon /> : <></>}
            />
          </div>
          </div>

          {/* Mobile/Tablet View */}
          <div className="flex lg:hidden items-center gap-3">
          {/* Hamburger visible on mobile/tablet only */}
          <button
            onClick={onMenu}
            className="inline-flex items-center p-0.5 justify-center w-10 h-10 rounded-lg bg-white/10 hover:bg-white/15 text-white"
            aria-label="Open menu"
          >
            <BrainIcon width="40" height="40" className="custom-class" />
          </button>

          <span className="text-xl md:text-3xl font-extrabold text-white tracking-tight">Second Brain</span>
          </div>
          <div className="flex lg:hidden items-center gap-3 md:gap-4">
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 w-full h-full p-2 rounded-lg bg-violet-700 hover:bg-violet-800 text-white text-xs font-semibold transition duration-100"
          >
            <PlusIcon size={'lg'} />
          </button>

          <div className="rounded-xl border border-violet-700/40 bg-violet-600/10">
            <button
            onClick={toggelSharing}
            className={`flex items-center w-full h-full gap-2 p-2 rounded-lg ${
              isSharing
              ? 'bg-red-500 text-white hover:bg-red-700'
              : 'bg-white/10 text-white hover:bg-white/20 p-3'
            } text-sm font-semibold transition duration-150`}
            disabled={loading}
            >
            {loading && <ProcessingIcon />}
            {isSharing ? <CloseIcon size="lg" /> : <ShareIcon size={'md'} />}
            </button>
          </div>
          </div>
    </div>
  )
}

export default Header
