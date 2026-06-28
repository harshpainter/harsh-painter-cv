import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { supabase, hasSupabaseConfig } from '../supabaseClient'
import { 
  Mail, 
  MapPin, 
  Phone, 
  ExternalLink, 
  Layers, 
  Briefcase, 
  Award, 
  Settings, 
  Database,
  Loader
} from 'lucide-react'

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

// --- MOCK DATA FALLBACKS ---
const MOCK_PROFILE = {
  name: "Alex Rivera",
  title: "Integration Architect & Automation Engineer",
  location: "San Francisco, CA (Remote)",
  email: "alex@rivera.dev",
  linkedin_url: "https://linkedin.com/in/alexrivera-dev",
  summary: "Systems architect specializing in serverless automation, custom API integrations, and data engineering with 8+ years of experience. I bridge the gap between fragmented software suites and streamlined enterprise workflows, achieving a 40% reduction in manual overhead and managing 1,000+ product SKUs."
}

const MOCK_CORE_SKILLS = [
  { id: "cs-1", skill_name: "Operations Management", sort_order: 1 },
  { id: "cs-2", skill_name: "Business Process Design & Optimization", sort_order: 2 },
  { id: "cs-3", skill_name: "Workflow Automation", sort_order: 3 },
  { id: "cs-4", skill_name: "Business Transformation", sort_order: 4 },
  { id: "cs-5", skill_name: "Cross-functional Coordination", sort_order: 5 }
]

const MOCK_EXPERIENCE = [
  {
    id: "mock-exp-1",
    company: "Synthetix Automations",
    role: "Lead Automation Engineer",
    location: "San Francisco, CA",
    start_date: "2024",
    end_date: "Present",
    description: [
      "Architected scalable iPaaS solutions connecting CRM and ERP platforms, managing 1,000+ product SKUs and reducing latency by 85%.",
      "Developed custom Node.js middleware for transactional message routing, handling 2.5M+ daily payloads with zero downtime.",
      "Established automated error monitoring and self-healing worker flows, saving 30+ engineering hours per week."
    ],
    tools: ["Trello", "Slack", "Notion", "Apollo", "Clay", "Reply.io"],
    sort_order: 1
  },
  {
    id: "mock-exp-2",
    company: "CognitiveFlow Systems",
    role: "Integration Specialist",
    location: "Boston, MA",
    start_date: "2022",
    end_date: "2024",
    description: [
      "Built 20+ automation workflows and ETL pipelines translating complex behavioral telemetry into structured data warehouse tables.",
      "Created custom webhooks and OAuth integration layers for CRM platforms, resulting in a 40% reduction in manual operational work.",
      "Migrated legacy Python cron scripts to serverless event-driven workflows, lowering compute costs by 40%."
    ],
    tools: ["Trello", "Slack", "n8n", "JavaScript", "Pabbly Connect", "Intercom", "Fillout", "CRM systems"],
    sort_order: 2
  }
]

const MOCK_SKILLS = [
  {
    id: "mock-skill-1",
    category: "Automation & Integration",
    items: ["n8n", "Make (Integromat)", "Zapier", "Pabbly Connect", "API integrations", "JavaScript (workflow scripting)"],
    sort_order: 1
  },
  {
    id: "mock-skill-2",
    category: "CRM & Sales Ops",
    items: ["Freshsales CRM", "Intercom", "Apollo", "Clay", "Reply.io", "CRM pipeline management", "lead tracking"],
    sort_order: 2
  }
]

const MOCK_CERTIFICATIONS = [
  {
    id: "mock-cert-1",
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    year: "2024",
    sort_order: 1
  }
]

// --- NEO-BRUTALIST VIBRANT CARD COLORS ---
const CARD_COLORS = [
  'bg-[#FB923C]', // Bright Orange
  'bg-[#34D399]', // Emerald Green
  'bg-[#FBBF24]', // Canary Yellow
  'bg-[#38BDF8]', // Electric Blue
  'bg-[#F472B6]', // Candy Pink
  'bg-[#A78BFA]'  // Pastel Purple
]

const TAG_BG_COLORS = [
  'bg-[#FEE2E2]', // Red
  'bg-[#FEF3C7]', // Amber
  'bg-[#D1FAE5]', // Emerald
  'bg-[#DBEAFE]', // Blue
  'bg-[#F3E8FF]', // Purple
  'bg-[#FCE7F3]', // Pink
  'bg-[#ECFDF5]'  // Greenish white
]

// --- DYNAMIC IMPACT STATISTICS HIGHLIGHTER (BRUTALIST STICKER TYPE) ---
function highlightStats(text) {
  if (!text || typeof text !== 'string') return text;
  
  const regex = /(\b\d+(?:,\d+)*(?:\.\d+)?[M|k]?(?:\+)?%?\s*(?:years|product\s+SKUs|reduction|automation\s+workflows|daily\s+payloads|B2B\s+brand|operational\s+work)?\b)/gi;
  
  const parts = text.split(regex);
  return parts.map((part, i) => {
    if (part.match(regex)) {
      return (
        <span 
          key={i} 
          className="font-mono font-extrabold text-black bg-[#FBBF24] border border-black px-1.5 py-0.5 rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mx-0.5 inline-block"
        >
          {part}
        </span>
      );
    }
    return part;
  });
}

function CV() {
  const [profile, setProfile] = useState(MOCK_PROFILE)
  const [coreSkills, setCoreSkills] = useState(MOCK_CORE_SKILLS)
  const [experience, setExperience] = useState(MOCK_EXPERIENCE)
  const [skills, setSkills] = useState(MOCK_SKILLS)
  const [certifications, setCertifications] = useState(MOCK_CERTIFICATIONS)
  
  const [loading, setLoading] = useState(true)
  const [usingMock, setUsingMock] = useState(true)
  
  const containerRef = useRef(null)
  const [showBackToTop, setShowBackToTop] = useState(false)

  const handleScroll = () => {
    if (containerRef.current) {
      setShowBackToTop(containerRef.current.scrollTop > window.innerHeight / 2)
    }
  }

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    async function fetchData() {
      if (!hasSupabaseConfig || !supabase) {
        console.log("No Supabase configuration found. Rendering mock portfolio data.");
        setUsingMock(true)
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setUsingMock(false)

        // 1. Fetch Profile
        const { data: profileData, error: profileErr } = await supabase
          .from('profiles')
          .select('*')
          .maybeSingle()

        if (profileErr) {
          console.warn("Failed to fetch profiles, falling back to mock profile data:", profileErr.message)
        } else if (profileData) {
          setProfile(profileData)
        }

        // 2. Fetch Core Skills
        const { data: coreSkillsData, error: coreSkillsErr } = await supabase
          .from('core_skills')
          .select('*')
          .order('sort_order', { ascending: true })

        if (coreSkillsErr) {
          console.warn("Failed to fetch core skills, falling back to mock core skills:", coreSkillsErr.message)
        } else if (coreSkillsData && coreSkillsData.length > 0) {
          setCoreSkills(coreSkillsData)
        }

        // 3. Fetch Experience
        const { data: expData, error: expErr } = await supabase
          .from('experience')
          .select('*')
          .order('sort_order', { ascending: true })

        if (expErr) {
          console.warn("Failed to fetch experience, falling back to mock experience data:", expErr.message)
        } else if (expData && expData.length > 0) {
          setExperience(expData)
        }

        // 4. Fetch Skills
        const { data: skillsData, error: skillsErr } = await supabase
          .from('skills')
          .select('*')
          .order('sort_order', { ascending: true })

        if (skillsErr) {
          console.warn("Failed to fetch skills, falling back to mock skills data:", skillsErr.message)
        } else if (skillsData && skillsData.length > 0) {
          setSkills(skillsData)
        }

        // 5. Fetch Certifications
        const { data: certData, error: certErr } = await supabase
          .from('certifications')
          .select('*')
          .order('sort_order', { ascending: true })

        if (certErr) {
          console.warn("Failed to fetch certifications, falling back to mock certs data:", certErr.message)
        } else if (certData && certData.length > 0) {
          setCertifications(certData)
        }

      } catch (err) {
        console.error("Unexpected error fetching live data, utilizing mock fallbacks:", err)
        setUsingMock(true)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F4F0] text-black flex flex-col items-center justify-center font-mono border-8 border-black">
        <Loader className="w-8 h-8 animate-spin text-black mb-4 stroke-[3]" />
        <span className="text-sm font-bold uppercase tracking-widest text-black">CONNECTING SYSTEM CHUNKS...</span>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      onScroll={handleScroll}
      className="h-screen lg:overflow-y-scroll overflow-y-auto scroll-smooth lg:snap-y lg:snap-mandatory bg-transparent no-scrollbar"
    >
      
      {/* --- STICKY BACK TO HOME NAVIGATION --- */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          to="/"
          className="border-2 border-black bg-white px-3 py-1.5 font-mono text-xs font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:bg-[#F472B6] transition-all cursor-pointer inline-block text-black decoration-none"
        >
          [ ← HOME ]
        </Link>
      </div>

      {/* --- PREVIEW BANNER --- */}
      {usingMock && (
        <div className="bg-[#FBBF24] border-b-4 border-black px-4 py-3 sticky top-0 z-50 animate-fade-in font-mono text-xs font-bold flex flex-col sm:flex-row items-center justify-between gap-3 shadow-[0_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-2">
            <span className="h-3.5 w-3.5 bg-red-500 border-2 border-black inline-block animate-pulse"></span>
            <p className="text-black uppercase">
              [PREVIEW MODE]: Displaying Retro-Tech mock data. Insert your credentials in .env to connect live database.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white border-2 border-black px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Settings className="w-3.5 h-3.5 animate-spin text-black" />
            <span className="uppercase text-[10px]">Pending keys (.env)</span>
          </div>
        </div>
      )}

      {/* --- BACK TO TOP FLOATING BUTTON --- */}
      {showBackToTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 border-2 border-black bg-white p-3 font-mono text-xs font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:bg-[#F472B6] transition-all cursor-pointer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileTap={{ scale: 0.95 }}
        >
          [ TOP ↑ ]
        </motion.button>
      )}

      {/* --- SECTION 1: HERO DASHBOARD --- */}
      <section className="w-full min-h-screen lg:h-screen lg:snap-start flex flex-col justify-center py-8 px-4 sm:p-10 lg:p-12 bg-transparent relative overflow-hidden">
        
        {usingMock && (
          <div className="absolute top-4 left-4 right-4 bg-[#FBBF24] border-2 border-black px-3 py-1.5 font-mono text-[10px] font-bold flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-10 max-w-max">
            <span className="h-2 w-2 bg-red-500 border border-black inline-block animate-pulse"></span>
            <span>PREVIEW MODE - EDIT .ENV TO CONNECT LIVE DATABASE</span>
          </div>
        )}

        <div className="max-w-5xl mx-auto w-full space-y-4 lg:space-y-6">
          <motion.header 
            className="space-y-3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-5xl lg:text-7.5xl font-black uppercase tracking-tight text-black leading-none">
                {profile.name}
              </h1>
              <div className="flex flex-wrap gap-2">
                <span className="font-mono text-xs uppercase tracking-wider text-black font-extrabold bg-[#38BDF8] border-2 border-black px-3 py-1 inline-block shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  {profile.title}
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-black font-extrabold bg-[#F472B6] border-2 border-black px-3 py-1 inline-block shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 stroke-[2.5]" />
                  {profile.location}
                </span>
              </div>
            </div>
          </motion.header>

          <div className="border-t-4 border-black"></div>

          {/* Equal Height Flex Grid Layout: Stacks on mobile/tablet, stretches on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            
            {/* Bio & Contacts Column */}
            <div className="flex flex-col justify-between space-y-4 h-full">
              <div className="text-black text-sm md:text-base font-semibold leading-relaxed bg-white p-4 sm:p-5 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] h-full">
                {highlightStats(profile.summary)}
              </div>
              
              {/* Contacts */}
              <div className="flex flex-wrap gap-3 font-mono text-xs font-bold">
                <div className="border-2 border-black bg-white px-3 py-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
                  <Mail className="w-4 h-4 stroke-[2.5]" />
                  <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors">{profile.email}</a>
                </div>
                {profile.linkedin_url && (
                  <div className="border-2 border-black bg-[#A78BFA] px-3 py-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 hover:translate-y-[-1px] transition-all">
                    <LinkedInIcon className="w-4 h-4 stroke-[2.5]" />
                    <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="flex items-center gap-1">
                      LINKEDIN <ExternalLink className="w-3 h-3 stroke-[2.5]" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Core Competencies Column: Removed inner height viewport restrictions to flow nicely on mobile */}
            <div className="bg-white border-4 border-black p-4 sm:p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between h-full">
              <div className="space-y-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 font-extrabold block border-b-2 border-black pb-1">Core Competencies</span>
                <div className="flex flex-wrap gap-1.5">
                  {coreSkills.map((cs, idx) => {
                    const stickerColor = TAG_BG_COLORS[idx % TAG_BG_COLORS.length];
                    return (
                      <span 
                        key={cs.id || idx} 
                        className={`border-2 border-black ${stickerColor} px-2.5 py-0.5 font-mono text-[10px] font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black hover:scale-105 transition-transform`}
                      >
                        {cs.skill_name}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="text-[9px] font-mono text-zinc-400 mt-3 border-t border-black/10 pt-2 block uppercase">
                18 Strategic Enterprise capabilities
              </div>
            </div>
          </div>

          <div className="border-t-4 border-black pt-4 flex justify-between items-center text-xs font-mono font-bold text-zinc-500">
            <span>SCROLL DOWN OR SWIPE TO NAVIGATE</span>
            <div className="flex items-center gap-1.5 animate-bounce">
              <span>&darr;</span>
            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION 2: EXPERIENCE TIMELINE --- */}
      <section className="w-full min-h-screen lg:h-screen lg:snap-start grid grid-cols-1 lg:grid-cols-3 py-8 px-4 sm:p-10 lg:p-12 bg-transparent relative overflow-hidden border-t-4 border-black">
        
        {/* Left column heading (1/3) */}
        <div className="flex flex-col justify-center lg:h-full pr-0 lg:pr-4 lg:col-span-1 pb-6 lg:pb-0">
          <div className="bg-[#FB923C] border-4 border-black p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-1">
            <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight text-black leading-none">
              EXPERIENCE
            </h2>
            <div className="border-t-2 border-black my-2.5"></div>
            <p className="font-mono text-[10px] font-black text-black">
              8+ YEARS DRIVING WORKFLOW OPTIMIZATIONS & BUSINESS TRANSFORMATIONS
            </p>
          </div>
        </div>

        {/* Right column (2/3): Scrollable on desktop, inline/natural overflow on mobile/tablet */}
        <div className="lg:h-full lg:overflow-y-auto pr-2 no-scrollbar lg:col-span-2 space-y-5 py-4 lg:py-8 self-center h-auto overflow-y-visible">
          {experience.map((exp, idx) => {
            const cardColor = CARD_COLORS[idx % CARD_COLORS.length];
            return (
              <motion.div
                key={exp.id || idx}
                className={`${cardColor} p-4 sm:p-5 rounded-none border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 text-black space-y-3`}
              >
                {/* Job Header */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b-2 border-black/40 pb-2">
                  <h3 className="text-sm font-black uppercase tracking-tight text-black">
                    {exp.role} <span className="font-medium lowercase text-black/60">at</span> {exp.company}
                  </h3>
                  <span className="font-mono text-[10px] font-black bg-white border border-black px-2 py-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap self-start">
                    {exp.start_date} — {exp.end_date}
                  </span>
                </div>

                {/* Metadata: Location */}
                <div className="font-mono text-[9px] text-black font-extrabold uppercase tracking-widest bg-white/40 px-2 py-0.5 border border-black/10 inline-block">
                  {exp.location}
                </div>

                {/* Description points */}
                <ul className="space-y-1.5 text-black font-medium text-xs leading-relaxed list-none pl-0">
                  {exp.description.map((bullet, bIdx) => (
                    <li key={bIdx} className="relative pl-3.5">
                      <span className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-black border border-black"></span>
                      {highlightStats(bullet)}
                    </li>
                  ))}
                </ul>

                {/* Tools Used stickers */}
                {exp.tools && exp.tools.length > 0 && (
                  <div className="pt-2 border-t border-black/20 flex flex-wrap gap-1.5">
                    {exp.tools.map((tool, tIdx) => {
                      const tagColor = TAG_BG_COLORS[(idx + tIdx) % TAG_BG_COLORS.length];
                      return (
                        <span 
                          key={tIdx} 
                          className={`border-2 border-black ${tagColor} px-2 py-0.5 font-mono text-[9.5px] font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black`}
                        >
                          {tool}
                        </span>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </section>

      {/* --- SECTION 3: SKILLS & TOOLS MATRIX --- */}
      <section className="w-full min-h-screen lg:h-screen lg:snap-start px-4 py-8 sm:p-10 lg:px-12 bg-transparent flex flex-col justify-center relative overflow-hidden border-t-4 border-black">
        <div className="max-w-5xl mx-auto w-full space-y-4">
          
          <div className="flex items-center gap-3">
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black border-4 border-black bg-white px-4 py-1.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block">
              SKILLS & TOOLS MATRIX
            </h2>
          </div>
          
          <div className="border-t-4 border-black"></div>

          {/* Categorized micro-sticker lists: scrollable on desktop, inline/expanded on mobile/tablet */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:max-h-[66vh] lg:overflow-y-auto pr-2 no-scrollbar pt-2 max-h-none overflow-y-visible">
            {skills.map((skillGroup, idx) => {
              const cardColor = idx % 2 === 0 ? 'bg-[#FBBF24]' : 'bg-[#06B6D4]'
              return (
                <div 
                  key={skillGroup.id || idx} 
                  className={`${cardColor} border-4 border-black p-3.5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-2.5 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all`}
                >
                  <h3 className="font-mono text-xs uppercase tracking-widest text-black font-extrabold border-b-2 border-black pb-1.5">
                    {skillGroup.category}
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {skillGroup.items.map((item, itemIdx) => {
                      const stickerColor = TAG_BG_COLORS[(idx + itemIdx) % TAG_BG_COLORS.length];
                      return (
                        <span 
                          key={itemIdx} 
                          className={`border border-black ${stickerColor} px-2 py-0.5 font-mono text-[10px] font-bold shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] text-black`}
                        >
                          {item}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* --- SECTION 4: CREDENTIALS & EDUCATION --- */}
      <section className="w-full min-h-screen lg:h-screen lg:snap-start py-8 px-4 sm:p-10 lg:p-12 bg-transparent flex flex-col justify-center relative overflow-hidden border-t-4 border-black">
        <div className="max-w-5xl mx-auto w-full space-y-6">
          
          <div className="flex items-center gap-3">
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black border-4 border-black bg-white px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block">
              CREDENTIALS & TRAINING
            </h2>
          </div>

          <div className="border-t-4 border-black"></div>

          {/* Certifications and Education split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Certifications Card: Scrollable on desktop, fits completely on mobile */}
            <div className="bg-[#C084FC] border-4 border-black p-4 sm:p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 h-full space-y-4 lg:max-h-[50vh] lg:overflow-y-auto pr-2 no-scrollbar max-h-none overflow-y-visible">
              <h3 className="text-lg font-black uppercase tracking-tight text-black border-b-2 border-black pb-2">Certifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {certifications.map((cert, idx) => (
                  <div key={cert.id || idx} className="text-xs border-b border-dashed border-black/20 pb-1.5 leading-tight flex flex-col justify-between h-full">
                    <div>
                      <span className="text-black font-extrabold">{cert.name}</span>
                      <span className="text-black/60 font-bold block text-[10px] uppercase font-mono mt-0.5">{cert.issuer}</span>
                    </div>
                    {cert.year && (
                      <span className="font-mono text-[9px] font-bold bg-white border border-black px-1.5 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] self-start mt-1 shrink-0">{cert.year}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Education Block Card */}
            <div className="bg-[#C084FC] border-4 border-black p-4 sm:p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex flex-col justify-between h-full min-h-[32vh]">
              <div className="space-y-4">
                <h3 className="text-lg font-black uppercase tracking-tight text-black border-b-2 border-black pb-2">Education</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-tight text-black">Bachelor of Computer Applications (BCA)</h4>
                    <p className="font-mono text-[11px] font-bold text-black/60 uppercase mt-0.5">Dr. C.V. Raman University | 2013 – 2016</p>
                  </div>
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-black/60 font-extrabold block">Academic Focus</span>
                    <div className="flex flex-wrap gap-1.5">
                      {["Computer Science", "Data Handling", "Information Systems", "Applied Problem Solving"].map((item, itemIdx) => {
                        const stickerColor = TAG_BG_COLORS[itemIdx % TAG_BG_COLORS.length];
                        return (
                          <span 
                            key={itemIdx} 
                            className={`border border-black ${stickerColor} px-2 py-0.5 font-mono text-[9px] font-bold shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] text-black`}
                          >
                            {item}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-black pt-4 mt-6 flex items-center justify-between text-[11px] font-mono font-bold text-black/60">
                <span>Languages: English, Hindi, Gujarati</span>
                <span className="text-black uppercase font-black">[SYSTEM ONLINE]</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- SECTION 5: THANK YOU & OUTRO SLIDE --- */}
      <section className="w-full min-h-screen lg:h-screen lg:snap-start flex flex-col justify-between py-8 px-4 sm:p-10 lg:p-12 bg-transparent relative overflow-hidden border-t-4 border-black">
        <div></div>

        {/* Center content block */}
        <div className="max-w-3xl mx-auto w-full text-center space-y-6">
          <div className="space-y-4">
            <motion.h2 
              className="text-4xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-black leading-none"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100 }}
            >
              THANK YOU
            </motion.h2>
            <p className="font-mono text-sm sm:text-base font-extrabold text-[#4F46E5] uppercase tracking-wide">
              Let's build scalable systems together.
            </p>
          </div>

          <div className="border-t-4 border-black w-24 mx-auto my-6"></div>

          {/* Outro badge links */}
          <div className="flex flex-wrap justify-center gap-4 font-mono text-sm font-bold">
            <a 
              href={`mailto:${profile.email}`} 
              className="border-4 border-black bg-[#FB923C] px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2 cursor-pointer text-black"
            >
              <Mail className="w-5 h-5 stroke-[2.5]" />
              EMAIL ME
            </a>
            {profile.linkedin_url && (
              <a 
                href={profile.linkedin_url} 
                target="_blank" 
                rel="noreferrer" 
                className="border-4 border-black bg-[#A78BFA] px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2 cursor-pointer text-black"
              >
                <LinkedInIcon className="w-5 h-5 stroke-[2.5]" />
                LINKEDIN
              </a>
            )}
          </div>
        </div>

        {/* Stuck minimal footer */}
        <footer className="w-full text-center font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-widest pt-6 border-t-2 border-black/10">
          &copy; 2026 HARSH PAINTER // ALL RIGHTS RESERVED.
        </footer>
      </section>

    </div>
  )
}

export default CV
