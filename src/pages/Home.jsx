import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase, hasSupabaseConfig } from '../supabaseClient'
import { Mail, ExternalLink, MapPin, Loader, FileText, LayoutTemplate } from 'lucide-react'

// --- CUSTOM SVG LINKEDIN ICON ---
const LinkedInIcon = (props) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const MOCK_PROFILE = {
  name: "Harsh Painter",
  title: "Operations Manager | Business Operations | Workflow Automation | Business Transformation",
  location: "Surat, Gujarat, India",
  email: "harsh.painter@gmail.com",
  linkedin_url: "https://linkedin.com/in/harsh-painter"
}

function Home() {
  const [profile, setProfile] = useState(MOCK_PROFILE)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProfile() {
      if (!hasSupabaseConfig || !supabase) {
        setLoading(false)
        return
      }
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .maybeSingle()

        if (error) {
          console.warn("Failed to fetch profile in Home:", error.message)
        } else if (data) {
          setProfile(data)
        }
      } catch (err) {
        console.error("Error fetching profile:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F4F0] text-black flex flex-col items-center justify-center font-mono border-8 border-black">
        <Loader className="w-8 h-8 animate-spin text-black mb-4 stroke-[3]" />
        <span className="text-sm font-bold uppercase tracking-widest text-black">CONNECTING SYSTEM CHUNKS...</span>
      </div>
    )
  }

  // Split title string by pipe | for tag display
  const taglineTags = profile.title
    ? profile.title.split('|').map(tag => tag.trim())
    : []

  return (
    <div className="min-h-screen w-full flex flex-col justify-between py-12 px-4 sm:p-10 lg:p-16 relative overflow-hidden bg-transparent">
      


      <div className="max-w-4xl mx-auto w-full flex-grow flex flex-col justify-center space-y-8 lg:space-y-12 my-auto">
        
        {/* Name and Tagline Section */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        >
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black uppercase tracking-tighter text-black leading-none select-none sm:whitespace-nowrap">
              {profile.name}
            </h1>
            
            {/* Location sticker */}
            <span className="font-mono text-xs uppercase tracking-wider text-black font-extrabold bg-[#F472B6] border-2 border-black px-3 py-1 inline-block shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] select-none">
              <MapPin className="w-3.5 h-3.5 stroke-[2.5] inline-block mr-1.5 align-text-bottom" />
              {profile.location}
            </span>
          </div>

          <div className="border-t-4 border-black"></div>

          {/* Tagline badges */}
          <div className="flex flex-wrap gap-2 pt-1 select-none">
            {taglineTags.map((tag, idx) => (
              <span 
                key={idx} 
                className="font-mono text-xxs sm:text-xs uppercase tracking-wide text-black font-extrabold bg-white border-2 border-black px-2.5 py-0.5 inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Massive Neo-Brutalist Navigation Buttons Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.15
              }
            }
          }}
        >
          {/* Button 1: CV / RESUME */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } }
            }}
          >
            <Link 
              to="/cv"
              className="group block w-full border-4 border-black bg-[#FBBF24] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 text-black decoration-none"
            >
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-black/60 font-extrabold block">Interactive Portfolio</span>
                  <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">VIEW MY CV / RESUME</h2>
                </div>
                <FileText className="w-8 h-8 stroke-[2.5] group-hover:rotate-6 transition-transform" />
              </div>
            </Link>
          </motion.div>

          {/* Button 2: VALUE DECK */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } }
            }}
          >
            <Link 
              to="/valuedeck"
              className="group block w-full border-4 border-black bg-[#34D399] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 text-black decoration-none"
            >
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-black/60 font-extrabold block">Impact metrics & slide deck</span>
                  <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">EXPLORE MY VALUE-DECK</h2>
                </div>
                <LayoutTemplate className="w-8 h-8 stroke-[2.5] group-hover:rotate-6 transition-transform" />
              </div>
            </Link>
          </motion.div>

          {/* Button 3: LINKEDIN */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } }
            }}
          >
            <a 
              href={profile.linkedin_url}
              target="_blank"
              rel="noreferrer"
              className="group block w-full border-4 border-black bg-[#38BDF8] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 text-black decoration-none"
            >
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-black/60 font-extrabold block">LinkedIn Network</span>
                  <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">LINKEDIN PROFILE</h2>
                </div>
                <LinkedInIcon className="w-8 h-8 stroke-[2.5] group-hover:rotate-6 transition-transform" />
              </div>
            </a>
          </motion.div>

          {/* Button 4: GET IN TOUCH */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } }
            }}
          >
            <a 
              href={`mailto:${profile.email}`}
              className="group block w-full border-4 border-black bg-[#F472B6] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 text-black decoration-none"
            >
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-black/60 font-extrabold block">Direct communication</span>
                  <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">GET IN TOUCH / EMAIL</h2>
                </div>
                <Mail className="w-8 h-8 stroke-[2.5] group-hover:rotate-6 transition-transform" />
              </div>
            </a>
          </motion.div>
        </motion.div>

      </div>

      {/* Footer */}
      <footer className="w-full text-center font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest pt-8 border-t border-black/5 select-none">
        &copy; 2026 {profile.name.toUpperCase()} // ALL RIGHTS RESERVED.
      </footer>
      
    </div>
  )
}

export default Home
