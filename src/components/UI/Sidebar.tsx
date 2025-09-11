import { SidebarItems } from './SidebarItem'
import { TwitterIcon } from '../../icons/TwitterIcon'
import BrainIcon from '../../icons/BrainIcon'
import { Link, useNavigate } from 'react-router-dom'
import YoutubeIcon from '../../icons/YoutubeIcon'
import InstaIcon from '../../icons/InstaIcon'
import FacebookIcon from '../../icons/facebookIcon'
import Button from './Button'
import LogoutIcon from '../../icons/LogoutIcon'
import PinterestIcon from '../../icons/PinterestIcon'
import DocIcon from '../../icons/DocIcon'
import { HomeIcon } from '@heroicons/react/24/outline'

// Sidebar.tsx
type SidebarProps = {
  open?: boolean;          // mobile/tablet drawer open
  onClose?: () => void;    // close handler for overlay click or ESC
};

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.clear();
    navigate("/signin");
    return null;
  };

  return (
    <>
      {/* Mobile/Tablet overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer (mobile/tablet) and fixed (desktop) */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-72 bg-neutral-950 text-white border-r border-violet-700/40 pl-4 z-50
          transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0  /* desktop always visible */
          lg:z-30
        `}
        role="navigation"
        aria-label="Sidebar"
      >
        {/* Close button visible only on mobile/tablet */}
        <button
          onClick={onClose}
          className="lg:hidden absolute right-3 top-3 text-gray-300 hover:text-white"
          aria-label="Close menu"
        >
          ✕
        </button>

        {/* Brand */}
        <h1 className="flex items-center gap-2 pt-4 text-2xl font-extrabold tracking-tight">
          <span className="text-violet-400">
            <BrainIcon width="42" height="42" className="custom-class" />
          </span>
          <span>2nd Brain</span>
        </h1>

        {/* Nav */}
        <nav className="pt-8 pl-2 pr-3 space-y-1">
          <div className="p-2 rounded-lg hover:bg-white/5 transition">
            <Link to="/dashboard" onClick={onClose}>
              <SidebarItems text="dashboard" icon={<HomeIcon className="w-6 h-6" />} />
            </Link>
          </div>
          <div className="p-2 rounded-lg hover:bg-white/5 transition">
            <Link to="/content/twitter" onClick={onClose}>
              <SidebarItems text="Twitter" icon={<TwitterIcon size="lg" />} />
            </Link>
          </div>
          <div className="p-2 rounded-lg hover:bg-white/5 transition">
            <Link to="/content/youtube" onClick={onClose}>
              <SidebarItems text="Youtube" icon={<YoutubeIcon size="lg" />} />
            </Link>
          </div>
          <div className="p-2 rounded-lg hover:bg-white/5 transition">
            <Link to="/content/instagram" onClick={onClose}>
              <SidebarItems text="Instagram" icon={<InstaIcon className="w-6 h-6" />} />
            </Link>
          </div>
          <div className="p-2 rounded-lg hover:bg-white/5 transition">
            <Link to="/content/facebook" onClick={onClose}>
              <SidebarItems text="Facebook" icon={<FacebookIcon className="w-6 h-6" />} />
            </Link>
          </div>
          <div className="p-2 rounded-lg hover:bg-white/5 transition">
            <Link to="/content/pinterest" onClick={onClose}>
              <SidebarItems text="Pinterest" icon={<PinterestIcon className="w-6 h-6" />} />
            </Link>
          </div>
          <div className="p-2 rounded-lg hover:bg-white/5 transition">
            <Link to="/content/doc" onClick={onClose}>
              <SidebarItems text="Links" icon={<DocIcon size="lg" />} />
            </Link>
          </div>

          {/* Logout pinned near bottom on desktop, regular flow on mobile */}
          <div className="lg:mt-40 pl-8">
            <Button
              variant="primary"
              size="md"
              text="Logout"
              transition="4"
              onClick={handleLogout}
              endIcon={<LogoutIcon width={20} height={20} fill="" />}
            />
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
