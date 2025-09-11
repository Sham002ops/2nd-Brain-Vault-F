import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CloseIcon from '../../icons/CloseIcon';
import { BACKEND_URL } from '../../Config';
import { useContent } from '../hooks/useContent';
import TwitterImg from '../../assets/twitterSearch.png';
import YtImg from '../../assets/ytSearch.png';

gsap.registerPlugin(ScrollTrigger);

enum ContentType {
  Youtube = 'youtube',
  Twitter = 'twitter',
  Instagram = 'instagram',
  Facebook = 'facebook',
  Pinterest = 'pinterest',
  Doc = 'doc',
}

type Props = {
  open: boolean;
  onClose: () => void;
};

const CreateContent: React.FC<Props> = ({ open, onClose }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const tagInputRef = useRef<HTMLInputElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const modalCardRef = useRef<HTMLDivElement>(null);

  const [type, setType] = useState<ContentType>(ContentType.Youtube);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>('');

  const { refresh } = useContent();

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

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    nextRef:
      | React.RefObject<HTMLInputElement>
      | React.RefObject<HTMLButtonElement>
      | React.RefObject<HTMLTextAreaElement>
  ) => {
    if (e.key === 'Enter') {
      nextRef.current?.focus();
      nextRef.current?.click?.();
    }
  };

  const addTag = () => {
    const value = tagInput.trim().toLowerCase();
    if (value && !tags.includes(value)) {
      setTags((prev) => [...prev, value]);
      setTagInput('');
      tagInputRef.current?.focus();
    }
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  async function addContent() {
    if (loading) return;
    setLoading(true);
    const title = titleRef.current?.value?.trim();
    const description = descriptionRef.current?.value?.trim();
    const link = linkRef.current?.value?.trim();

    if (!title || !link) {
      alert('Please enter both Title and Link.');
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        { link, title, description, type, tags },
        { headers: { Authorization: localStorage.getItem('token') || '' } }
      );

      refresh();
      onClose();
    } catch {
      alert('Failed to create content. Please try again.');
    } finally {
      setLoading(false);
    }
  }

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
            max-w-[min(100vw-1.5rem,56rem)] sm:max-w-[min(100vw-2rem,60rem)] md:max-w-[min(100vw-3rem,64rem)]
            lg:max-w-5xl
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

          {/* Scrollable content */}
          <div className="grow overflow-y-auto px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {/* Left: Form */}
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Add Title and Link</h3>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="cc-title" className="block text-sm text-gray-300 mb-2">Title</label>
                    <input
                      id="cc-title"
                      ref={titleRef}
                      type="text"
                      placeholder="e.g. Elon Musk on X: 'Cybertruck...'"
                      onKeyDown={(e) => handleKeyDown(e, linkRef)}
                      className="w-full rounded-xl bg-black/50 border border-gray-700 focus:border-violet-500 focus:ring-violet-500
                                 text-white placeholder-gray-400 px-3 sm:px-4 py-2.5 sm:py-3 outline-none transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="cc-link" className="block text-sm text-gray-300 mb-2">Link</label>
                    <input
                      id="cc-link"
                      ref={linkRef}
                      type="url"
                      placeholder="https://www.example.com/post/123"
                      onKeyDown={(e) => handleKeyDown(e, descriptionRef)}
                      className="w-full rounded-xl bg-black/50 border border-gray-700 focus:border-violet-500 focus:ring-violet-500
                                 text-white placeholder-gray-400 px-3 sm:px-4 py-2.5 sm:py-3 outline-none transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="cc-desc" className="block text-sm text-gray-300 mb-2">Description</label>
                    <textarea
                      id="cc-desc"
                      ref={descriptionRef}
                      rows={4}
                      placeholder="Short description about this link..."
                      className="w-full rounded-xl bg-black/50 border border-gray-700 focus:border-violet-500 focus:ring-violet-500
                                 text-white placeholder-gray-400 px-3 sm:px-4 py-2.5 sm:py-3 outline-none transition resize-none"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-6">
                  <h4 className="text-base sm:text-lg font-semibold mb-3">Tags</h4>
                  <div className="flex gap-2">
                    <input
                      ref={tagInputRef}
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Enter tag"
                      onKeyDown={(e) => (e.key === 'Enter' ? addTag() : undefined)}
                      className="flex-1 rounded-xl bg-black/50 border border-gray-700 focus:border-violet-500 focus:ring-violet-500
                                 text-white placeholder-gray-400 px-3 sm:px-4 py-2.5 sm:py-3 outline-none transition"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="inline-flex items-center justify-center rounded-xl bg-violet-600 hover:bg-violet-700
                                 text-white font-semibold px-4 sm:px-5 py-2.5 sm:py-3 transition shadow-lg hover:shadow-violet-700/30"
                    >
                      Add Tag
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-2 rounded-full bg-violet-700/20 text-violet-300 border border-violet-600/40 px-3 py-1.5 text-sm"
                      >
                        #{tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="hover:text-white transition"
                          aria-label={`Remove ${tag}`}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Type selector */}
                <div className="mt-6">
                  <h4 className="text-base sm:text-lg font-semibold mb-3">Type</h4>
                  <div className="flex flex-wrap gap-2">
                    {(
                      [
                        ['Youtube', ContentType.Youtube],
                        ['Twitter', ContentType.Twitter],
                        ['Instagram', ContentType.Instagram],
                        ['Facebook', ContentType.Facebook],
                        ['Pinterest', ContentType.Pinterest],
                        ['Link', ContentType.Doc],
                      ] as const
                    ).map(([label, val]) => {
                      const active = type === val;
                      return (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setType(val)}
                          className={[
                            'px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border transition font-medium',
                            active
                              ? 'bg-violet-600 border-violet-600 text-white shadow-md'
                              : 'bg-transparent border-gray-700 text-gray-300 hover:border-violet-500 hover:text-white',
                          ].join(' ')}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit */}
                <div className="mt-6 pb-2">
                  <button
                    ref={submitBtnRef}
                    onClick={addContent}
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full
                               bg-violet-600 hover:bg-violet-700 disabled:opacity-70 disabled:cursor-not-allowed
                               text-white font-semibold px-6 py-3 transition shadow-lg hover:shadow-violet-700/30"
                  >
                    {loading && (
                      <span className="inline-block h-5 w-5 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
                    )}
                    {loading ? 'Submitting…' : 'Submit'}
                  </button>
                </div>
              </div>

              {/* Right: Notes & Previews */}
              <div>
                <div className="rounded-xl border border-violet-700/60 bg-violet-900/10 p-4">
                  <h5 className="text-sm font-bold text-violet-200">Important Note:</h5>
                  <p className="mt-1 text-sm text-violet-200/90">
                    Please ensure that only website URLs are used when adding links to the platform.
                    Example: https://www.example.com
                  </p>
                  <p className="mt-2 text-sm">
                    <span className="text-pink-400 font-semibold">For IG</span> use the copy link of the website post.
                    Mobile app shared URLs (e.g., example://) will not work.
                  </p>
                </div>

                <div className="mt-4 flex flex-col items-center gap-3">
                  <img className="w-full max-w-sm object-contain rounded-lg border border-gray-700" src={TwitterImg} alt="Twitter example" />
                  <img className="w-full max-w-sm object-contain rounded-lg border border-gray-700" src={YtImg} alt="YouTube example" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default CreateContent;
