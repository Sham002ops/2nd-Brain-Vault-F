import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CloseIcon from '../../icons/CloseIcon';
import { Tweet } from 'react-tweet'

gsap.registerPlugin(ScrollTrigger);

type Props = {
  open: boolean;
  onClose: () => void;
};

const Demoview: React.FC<Props> = ({ open, onClose }) => {
  const modalCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    // Lock background scroll on open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Animations
    gsap.set('.cc-overlay', { opacity: 0 });
    gsap.set(modalCardRef.current, { opacity: 0, y: 24, scale: 0.98 });
    gsap.to('.cc-overlay', { opacity: 1, duration: 0.2, ease: 'power1.out' });
    gsap.to(modalCardRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power2.out', delay: 0.05 });
    gsap.to('.cc-float', {
      y: '+=16',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      duration: 3,
      stagger: 0.4,
    });

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const link = "https://x.com/sham_baand/status/1876902630389150104"
  
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="cc-overlay absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Centered wrapper with safe padding */}
      <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4 md:p-6">
        {/* Floating blobs */}
        <div className="cc-float absolute -top-10 -left-10 w-40 h-40 rounded-full bg-violet-700/40 blur-2xl pointer-events-none" />
        <div className="cc-float absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-fuchsia-700/30 blur-3xl pointer-events-none" />

        {/* Modal Card */}
        <div
          ref={modalCardRef}
          className="
            relative w-full
            max-w-[min(100vw-1.5rem,56rem)] sm:max-w-[min(100vw-2rem,60rem)] md:max-w-[min(100vw-3rem,70rem)]
            lg:max-w-6xl xl:max-w-7xl
            max-h-[90vh]
            rounded-2xl border border-violet-700/60 bg-neutral-900 text-white shadow-2xl
            flex flex-col
          "
        >
          {/* Sticky header */}
          <div className="sticky top-0 z-10 flex items-center justify-end p-2 bg-neutral-900/90 backdrop-blur-sm rounded-t-2xl">
            <button
              aria-label="Close"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-full p-2 text-gray-300 hover:text-white hover:bg-white/10 transition"
            >
              <CloseIcon size="lg" />
            </button>
          </div>

          {/* Title */}
          <div className='flex flex-col items-center font-bold justify-center p-4 sm:p-6 md:p-8 lg:p-10 gap-6 text-xl md:text-2xl lg:text-3xl'>
            Demo Video
          </div>

          {/* Video Container - Responsive */}
          <div className="flex justify-center px-4 pb-8 md:pb-12 lg:pb-16">
            {/* Mobile View (up to md breakpoint) */}
            <div className="block md:hidden w-[380px] h-[330px] rounded-lg p-1 overflow-hidden">
              <div className='w-[325px] h-44 overflow-clip p-1'>
                <div className='-mt-[355px] overflow-clip -m-5'>
                  <Tweet 
                    id={link.split('/').pop() || ""} 
                    apiUrl={undefined} 
                  />
                </div>
              </div>
            </div>

            {/* Tablet View (md to lg breakpoint) */}
            <div className="hidden md:block lg:hidden w-[500px] h-[400px] rounded-lg p-1 overflow-hidden">
              <div className='w-[450px] h-56 overflow-clip p-1'>
                <div className='-mt-[380px] overflow-clip -m-5 scale-110'>
                  <Tweet 
                    id={link.split('/').pop() || ""} 
                    apiUrl={undefined} 
                  />
                </div>
              </div>
            </div>

            {/* Desktop View (lg breakpoint and above) */}
            <div className="hidden lg:block w-[600px] xl:w-[700px]  h-[450px] xl:h-[500px] rounded-lg p-1 overflow-hidden">
              <div className='w-[600px] xl:w-[700px] h-64 xl:h-96 overflow-clip rounded-xl p-1'>
                <div className='-mt-[400px] xl:-mt-[280px] overflow-clip -m-1 ml-20 scale-125 xl:scale-150'>
                  <Tweet 
                    id={link.split('/').pop() || ""} 
                    apiUrl={undefined} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default Demoview;
