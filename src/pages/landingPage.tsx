import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import improved from '../assets/Improved.mp4'
import {
  BookmarkIcon,
  LinkIcon,
  UsersIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  ShareIcon,
  TagIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import BrainIcon from '../icons/BrainIcon';
import { useNavigate } from 'react-router-dom';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const LandingPage: React.FC = () => {
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const heroButtonsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const useCaseCardsRef = useRef<HTMLDivElement[]>([]);
  const featureCardsRef = useRef<HTMLDivElement[]>([]);
  const navRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  const useCases = [
    {
      icon: <BookmarkIcon className="w-8 h-8" />,
      title: "Save Social Media Content",
      description:
        "Found an interesting or informative social media post? Store it here for future reference. Never lose valuable content again.",
      accent: "bg-violet-100 text-violet-600"
    },
    {
      icon: <LinkIcon className="w-8 h-8" />,
      title: "Bookmark Useful Links & AI Tools",
      description:
        "Store website links, AI tools, and resources with hashtag organization. Access them instantly when needed.",
      accent: "bg-violet-100 text-violet-600"
    },
    {
      icon: <UsersIcon className="w-8 h-8" />,
      title: "Team Project Collaboration",
      description:
        "Collect all project-related posts, links, and resources in one place. Share with your team for seamless collaboration.",
      accent: "bg-violet-100 text-violet-600"
    },
    {
      icon: <TrashIcon className="w-8 h-8" />,
      title: "Social Media Detox Backup",
      description:
        "Planning a social media break? Save your important saved posts here before deleting accounts. Keep what matters.",
      accent: "bg-violet-100 text-violet-600"
    }
  ];

  const features = [
    {
      icon: <SparklesIcon className="w-6 h-6" />,
      title: "AI-Powered Content Scraping",
      description: "Automatically extract and organize content from links"
    },
    {
      icon: <TagIcon className="w-6 h-6" />,
      title: "Smart Hashtag Organization",
      description: "Categorize and find content using intelligent tagging"
    },
    {
      icon: <ShareIcon className="w-6 h-6" />,
      title: "Easy Sharing",
      description: "Share your collections with anyone, anywhere"
    },
    {
      icon: <MagnifyingGlassIcon className="w-6 h-6" />,
      title: "Advanced Search & Filter",
      description: "Find exactly what you need with powerful search tools"
    }
  ];

  const handleStarted = () =>{
    navigate('/signup');
  }

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial setup - hide elements
    gsap.set([heroTitleRef.current, heroSubtitleRef.current, heroButtonsRef.current], {
      opacity: 0,
      y: 100
    });

    gsap.set(navRef.current, {
      opacity: 0,
      y: -50
    });

    // Navbar animation
    tl.to(navRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    });

    // Hero animations
    tl.to(heroTitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out"
    }, "-=0.5")
    .to(heroSubtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=0.8")
    .to(heroButtonsRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=0.6");

    // Video animation
    if (videoRef.current) {
      gsap.fromTo(videoRef.current, 
        { 
          scale: 0.8,
          opacity: 0,
          rotation: -10
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: videoRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Use case cards animation
    useCaseCardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          {
            opacity: 0,
            y: 100,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: index * 0.2,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    // Feature cards animation
    featureCardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
            scale: 0.9
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addUseCaseRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      useCaseCardsRef.current[index] = el;
    }
  };

  const addFeatureRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      featureCardsRef.current[index] = el;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav ref={navRef} className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-violet-600">
                <BrainIcon className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">2nd Brain Vault</span>
            </div>
            <div className="flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#use-cases" className="text-gray-300 hover:text-white transition-colors">Use Cases</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
              <button className="px-6 py-2 bg-violet-600 text-white rounded-full hover:bg-violet-700 hover:shadow-lg transition-all duration-200" 
              onClick={handleStarted}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Large Title */}
      <section className="relative min-h-screen flex items-center justify-center bg-black">
        {/* Background Video */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            className="w-full h-full object-cover opacity-20"
            style={{ filter: 'brightness(0.3)' }}
          >
            <source src={improved} type="video/mp4" />
            {/* Fallback gradient if video doesn't load */}
            Your browser does not support the video tag.
          </video>
          {/* Fallback gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-black to-gray-900/20"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <h1 
            ref={heroTitleRef}
            className="text-8xl md:text-9xl lg:text-[12rem] font-black leading-none mb-8"
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 25%, #c084fc 50%, #e879f9 75%, #fbbf24 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 40px rgba(139, 92, 246, 0.3)'
            }}
          >
            VAULT
          </h1>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            <h2 
              ref={heroSubtitleRef}
              className="text-2xl md:text-4xl font-light text-gray-200 leading-relaxed"
            >
              Your Digital <span className="text-violet-400 font-semibold">Second Brain</span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Store, organize, and access all valuable digital content in one place.
              Never lose important information again.
            </p>
          </div>

          <div ref={heroButtonsRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
            <button onClick={handleStarted} className="px-10 py-4 bg-violet-600 text-white rounded-full text-lg font-semibold hover:bg-violet-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2">
              <span>Start Building Your Vault</span>
              <ArrowRightIcon className="w-5 h-5" />
            </button>
            <button className="px-10 py-4 border-2 border-violet-500 text-violet-400 rounded-full text-lg font-semibold hover:bg-violet-500/10 hover:text-violet-300 transition-all duration-300">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-violet-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-violet-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="container mx-auto px-6 py-24 bg-gray-900/50">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Four Powerful Use Cases
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover how 2nd Brain Vault transforms the way content is saved, organized, and accessed
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              ref={(el) => addUseCaseRef(el, index)}
              className="group p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-300"
            >
              <div className="inline-flex p-4 rounded-xl bg-violet-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                {React.cloneElement(useCase.icon, { className: "w-8 h-8 text-white" })}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-violet-300 transition-colors">
                {useCase.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Powered by Intelligence
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Advanced AI features that make content management effortless
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => addFeatureRef(el, index)}
              className="p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300 text-center group"
            >
              <div className="inline-flex p-3 rounded-xl bg-violet-600/20 mb-4 group-hover:bg-violet-600/40 group-hover:scale-110 transition-all duration-300">
                {React.cloneElement(feature.icon, { className: "w-6 h-6 text-violet-400" })}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Future Features Section */}
      <section className="container mx-auto px-6 py-24 bg-gray-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 bg-gradient-to-br from-violet-900/20 to-purple-900/20 backdrop-blur-md rounded-3xl border border-violet-500/20">
            <SparklesIcon className="w-16 h-16 text-violet-400 mx-auto mb-8" />
            <h2 className="text-4xl font-bold text-white mb-6">
              Coming Soon: AI Content Intelligence
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              AI will automatically scrape and analyze saved links, extract key information,
              and organize content intelligently. Click any saved link to see comprehensive summaries
              and related information.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-6 py-3 bg-violet-600/20 border border-violet-500/30 text-violet-300 rounded-full text-sm font-medium">
                Auto Content Extraction
              </span>
              <span className="px-6 py-3 bg-violet-600/20 border border-violet-500/30 text-violet-300 rounded-full text-sm font-medium">
                Smart Categorization
              </span>
              <span className="px-6 py-3 bg-violet-600/20 border border-violet-500/30 text-violet-300 rounded-full text-sm font-medium">
                Content Summaries
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Build Your Digital Vault Today
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Join the revolution of organized digital content management
          </p>
          <button onClick={handleStarted} className="px-12 py-4 bg-violet-600 text-white rounded-full text-xl font-semibold hover:bg-violet-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2 mx-auto">
            <span>Get Started for Free</span>
            <ArrowRightIcon className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="p-2 rounded-xl bg-violet-600">
              <BrainIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">2nd Brain Vault</span>
          </div>
          <p className="text-gray-400 text-center md:text-right">
            © 2025 2nd Brain Vault. Organize your digital life intelligently.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;