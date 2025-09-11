import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BACKEND_URL } from '../Config';

gsap.registerPlugin(ScrollTrigger);

const Signin: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const titleWrapRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Floating circles + entrance animations
  useEffect(() => {
    gsap.to('.float-circle', {
      y: '+=18',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      duration: 3,
      stagger: 0.4
    });

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
      // If it's the button, also click
      nextRef.current?.click?.();
    }
  };

  const signin = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const username = usernameRef.current?.value?.trim();
      const password = passwordRef.current?.value;
      if (!username || !password) {
        alert('Please enter username and password.');
        return;
      }
      const { data } = await axios.post(BACKEND_URL + '/api/v1/signin', { username, password });
      const jwt = data?.token;
      if (jwt) {
        localStorage.setItem('token', jwt);
        localStorage.setItem('loggedIn', 'true');
        navigate('/dashboard');
      } else {
        alert(data?.message ?? 'Sign-in failed.');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen w-screen bg-black overflow-hidden text-white">
      {/* Floating circles */}
      <div className="float-circle absolute bg-violet-700 w-56 h-56 md:w-72 md:h-72 rounded-full -top-24 -left-24 opacity-70 blur-xl"></div>
      <div className="float-circle absolute bg-gray-800 w-36 h-36 md:w-48 md:h-48 rounded-full -top-6 right-1/3 opacity-60 blur-lg"></div>
      <div className="float-circle absolute bg-violet-700 w-44 h-44 md:w-56 md:h-56 rounded-full -bottom-8 -right-10 opacity-70 blur-xl"></div>

      {/* Title */}
      <div ref={titleWrapRef} className="absolute top-8 md:top-10 left-1/2 -translate-x-1/2 text-center px-4">
        <h1 className="text-3xl w-72 md:w-[500px] lg:w-[800px] sm:text-4xl md:text-2xl lg:text-6xl font-extrabold font-mono drop-shadow-lg">
          Welcome Back to Your
        </h1>
        <h2 className="mt-1 md:mt-2 text-3xl sm:text-4xl md:text-6xl lg:text-6xl font-extrabold font-mono text-violet-400 drop-shadow-lg">
          Second Brain
        </h2>
        <p className="mt-3 md:mt-4 text-sm md:text-base text-gray-300">
          Sign in to access saved links, posts, and team collections.
        </p>
      </div>

      {/* Form card */}
      <div
        ref={formCardRef}
        className="z-20 w-full max-w-md sm:max-w-lg md:max-w-lg lg:max-w-xl mx-4 mt-56 md:mt-64 lg:mt-52
                   backdrop-blur-md bg-white/10 border border-violet-600 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl"
      >
        <h3 className="text-center text-2xl md:text-3xl font-mono font-bold text-white">Sign In</h3>
        <p className="text-center text-gray-300 mt-2 mb-6 md:mb-8">Access your vault of curated content</p>

        <div className="space-y-4 md:space-y-5">
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
            onClick={signin}
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full
                       bg-violet-600 hover:bg-violet-700 disabled:opacity-70 disabled:cursor-not-allowed
                       text-white font-semibold px-6 py-3 md:py-3.5 transition shadow-lg hover:shadow-violet-700/30"
          >
            {loading && (
              <span className="inline-block h-5 w-5 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
            )}
            {loading ? 'Signing In…' : 'Sign In'}
          </button>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
          <a href="/forgot-password" className="hover:text-violet-300 transition">
            Forgot password?
          </a>
          <p>
            New here?{' '}
            <a href="/signup" className="text-violet-400 hover:text-violet-200 transition">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
