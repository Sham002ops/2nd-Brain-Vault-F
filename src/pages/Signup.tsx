import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BACKEND_URL } from '../Config';

gsap.registerPlugin(ScrollTrigger);

const Signup: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const titleWrapRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Floating background circles
    gsap.to('.float-circle', {
      y: '+=18',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      duration: 3,
      stagger: 0.4
    });

    // Entrances
    gsap.set([titleWrapRef.current, formCardRef.current], { opacity: 0, y: 40 });
    gsap.to(titleWrapRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.15 });
    gsap.to(formCardRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', delay: 0.35 });
  }, []);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    nextRef: React.RefObject<HTMLInputElement> | React.RefObject<HTMLButtonElement>
  ) => {
    if (e.key === 'Enter') {
      nextRef.current?.focus();
      nextRef.current?.click?.();
    }
  };

  const signup = async () => {
    if (loading) return;
    setLoading(true);
    const email = emailRef.current?.value?.trim();
    const username = usernameRef.current?.value?.trim();
    const password = passwordRef.current?.value;

    if (!email || !username || !password) {
      alert('Please fill all fields.');
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(BACKEND_URL + '/api/v1/signup', {
        email,
        username,
        password
      });

      if (data?.message === 'User signed up') {
        navigate('/signin');
      } else {
        alert('Signup failed: ' + (data?.message ?? 'Unknown error'));
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e) && e.response?.data?.error?.message) {
        alert('Validation Error: ' + e.response.data.error.message);
      } else {
        alert('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen w-screen bg-black overflow-hidden text-white">
      {/* Floating circles (match Signin theme) */}
      <div className="float-circle absolute bg-violet-700 w-56 h-56 md:w-72 md:h-72 rounded-full -top-48 -left-24 opacity-70 blur-xl"></div>
      <div className="float-circle absolute bg-gray-800 w-36 h-36 md:w-48 md:h-48 rounded-full -top-6 right-1/3 opacity-60 blur-lg"></div>
      <div className="float-circle absolute bg-violet-700 w-44 h-44 md:w-56 md:h-56 rounded-full -bottom-8 -right-10 opacity-70 blur-xl"></div>

      {/* Title / Marketing copy */}
      <div ref={titleWrapRef} className="absolute top-8 md:top-8 left-1/2 -translate-x-1/2 text-center px-4">
        <h1 className="text-3xl w-64 lg:w-[800px]  md:w-[600px]  sm:text-4xl md:text-6xl lg:text-5xl font-extrabold font-mono drop-shadow-lg">
          Create Your
        </h1>
        <h2 className="mt-1 md:mt-2 lg:w-[800px]  md:w-[600px]  text-3xl sm:text-4xl md:text-6xl lg:text-4xl font-extrabold font-mono text-violet-400 drop-shadow-lg">
          Second Brain
        </h2>
        <p className="mt-2 md:mt-4 w-64 lg:w-[800px]  md:w-[600px]   text-sm md:text-base text-gray-300">
          Save posts, links, and knowledge. Share with teams. Find anything instantly.
        </p>
      </div>

      {/* Form card */}
      <div
        ref={formCardRef}
        className="z-20 w-full max-w-md sm:max-w-lg md:max-w-lg lg:max-w-xl mx-4 mt-32 md:mt-48 lg:mt-44
                   backdrop-blur-md bg-white/10 border border-violet-600 rounded-2xl p-4 sm:p-6 md:p-8 lg:p-6 shadow-2xl"
      >
        <h3 className="text-center text-2xl md:text-3xl font-mono font-bold text-white">Sign Up</h3>
        <p className="text-center text-gray-300 mt-1 mb-2 md:mb-4">Just a few details to get started</p>

        <div className="space-y-4 md:space-y-5">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm text-gray-300">
              Email
            </label>
            <input
              id="email"
              ref={emailRef}
              type="email"
              placeholder="email@example.com"
              onKeyDown={(e) => handleKeyDown(e, usernameRef)}
              className="w-full rounded-xl bg-black/50 border border-gray-700 focus:border-violet-500 focus:ring-violet-500
                         text-white placeholder-gray-400 px-4 py-3 outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="username" className="block mb-2 text-sm text-gray-300">
              Username
            </label>
            <input
              id="username"
              ref={usernameRef}
              type="text"
              placeholder="e.g. sham_dev"
              onKeyDown={(e) => handleKeyDown(e, passwordRef)}
              className="w-full rounded-xl bg-black/50 border border-gray-700 focus:border-violet-500 focus:ring-violet-500
                         text-white placeholder-gray-400 px-4 py-3 outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm text-gray-300">
              Password
            </label>
            <input
              id="password"
              ref={passwordRef}
              type="password"
              placeholder="••••••••"
              onKeyDown={(e) => handleKeyDown(e, btnRef)}
              className="w-full rounded-xl bg-black/50 border border-gray-700 focus:border-violet-500 focus:ring-violet-500
                         text-white placeholder-gray-400 px-4 py-3 outline-none transition"
            />
          </div>
        </div>

        <div className="mt-6 md:mt-8">
          <button
            ref={btnRef}
            onClick={signup}
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full
                       bg-violet-600 hover:bg-violet-700 disabled:opacity-70 disabled:cursor-not-allowed
                       text-white font-semibold px-6 py-3 md:py-3.5 transition shadow-lg hover:shadow-violet-700/30"
          >
            {loading && (
              <span className="inline-block h-5 w-5 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
            )}
            {loading ? 'Creating Account…' : 'Sign Up'}
          </button>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
          <p>
            Already registered?{' '}
            <a href="/signin" className="text-violet-400 hover:text-violet-200 transition">
              Sign In
            </a>
          </p>
          <a href="/privacy" className="hover:text-violet-300 transition">
            Privacy & Terms
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
