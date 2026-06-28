import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Settings, BarChart2, CheckCircle, Database, LayoutTemplate, Briefcase, Award, GraduationCap } from 'lucide-react'

// --- NEO-BRUTALIST COLOR PALETTE ---
const TAG_BG_COLORS = [
  'bg-[#FEE2E2]', // Red
  'bg-[#FEF3C7]', // Amber
  'bg-[#D1FAE5]', // Emerald
  'bg-[#DBEAFE]', // Blue
  'bg-[#F3E8FF]', // Purple
  'bg-[#FCE7F3]', // Pink
  'bg-[#ECFDF5]'  // Greenish white
]

function ValueDeck() {
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

      {/* --- SLIDE 1: THE VALUE IN BRIEF --- */}
      <section className="w-full min-h-screen lg:h-screen lg:snap-start flex flex-col justify-center py-12 px-4 sm:p-10 lg:p-12 bg-transparent relative overflow-hidden">
        <div className="max-w-5xl mx-auto w-full space-y-6">
          
          <div className="space-y-1 select-none">
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 font-extrabold block">Slide 01 // Overview</span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black border-4 border-black bg-white px-4 py-1.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block">
              THE VALUE IN BRIEF
            </h2>
          </div>

          <div className="border-t-4 border-black"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* Left side: HUGE bold header */}
            <div className="lg:col-span-5">
              <div className="bg-[#FB923C] border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-full flex flex-col justify-between min-h-[22vh]">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-black leading-none select-none">
                  THE OPERATIONAL LEVERAGE
                </h2>
                <div className="font-mono text-[10px] uppercase tracking-wider text-black/60 font-black border-t border-black/20 pt-4 mt-6">
                  systems architect // process engineer
                </div>
              </div>
            </div>

            {/* Right side: stacked high-contrast block cards */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-6">
              
              {/* Card A: Thesis */}
              <div className="bg-[#FBBF24] border-4 border-black p-5 sm:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-2">
                <h3 className="font-mono text-[10px] uppercase tracking-wider text-black/60 font-extrabold border-b border-black/20 pb-1 select-none">THE THESIS</h3>
                <p className="font-semibold text-xs sm:text-sm md:text-base leading-relaxed text-black">
                  Founders build vision; I build the automated systems that make that vision executable. I specialize in bridging the gap between messy, unstructured business growth and strict, automated, data-driven architecture.
                </p>
              </div>

              {/* Card B: Core Metrics */}
              <div className="bg-[#34D399] border-4 border-black p-5 sm:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-3">
                <h3 className="font-mono text-[10px] uppercase tracking-wider text-black/60 font-extrabold border-b border-black/20 pb-1 select-none">CORE METRICS MATRIX</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[10px] sm:text-xs font-bold text-black select-none">
                  <div className="bg-white/40 border border-black/10 p-2.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)] flex flex-col justify-between">
                    <span className="text-base sm:text-lg font-black block leading-none mb-0.5">8+ Years</span>
                    <span className="font-medium text-black/80">Optimizing business transformation across tech startups & luxury brands</span>
                  </div>
                  <div className="bg-white/40 border border-black/10 p-2.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)] flex flex-col justify-between">
                    <span className="text-base sm:text-lg font-black block leading-none mb-0.5">40% Reduction</span>
                    <span className="font-medium text-black/80">In manual overhead via custom API and automation pipeline builds</span>
                  </div>
                  <div className="bg-white/40 border border-black/10 p-2.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)] flex flex-col justify-between">
                    <span className="text-base sm:text-lg font-black block leading-none mb-0.5">1,000+ SKUs</span>
                    <span className="font-medium text-black/80">Actively managed and scaled across global e-commerce environments</span>
                  </div>
                  <div className="bg-white/40 border border-black/10 p-2.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)] flex flex-col justify-between">
                    <span className="text-base sm:text-lg font-black block leading-none mb-0.5">20+ Systems</span>
                    <span className="font-medium text-black/80">Built entirely from scratch for distributed remote teams</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          <div className="border-t-4 border-black pt-4 flex justify-between items-center text-xs font-mono font-bold text-zinc-500">
            <span>SCROLL DOWN FOR SKILLS MATRIX</span>
            <span className="animate-bounce">&darr;</span>
          </div>

        </div>
      </section>

      {/* --- SLIDE 2: ARCHITECTURAL SKILLS & TECH DNA --- */}
      <section className="w-full min-h-screen lg:h-screen lg:snap-start flex flex-col justify-center py-12 px-4 sm:p-10 lg:p-12 bg-transparent relative overflow-hidden border-t-4 border-black">
        <div className="max-w-5xl mx-auto w-full space-y-6">
          
          <div className="space-y-1 select-none">
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 font-extrabold block">Slide 02 // Core Competencies</span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black border-4 border-black bg-white px-4 py-1.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block">
              ARCHITECTURAL SKILLS & TECH DNA
            </h2>
          </div>

          <div className="border-t-4 border-black"></div>

          {/* Three massive colored columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            
            {/* Column 1: Vibrant Cyan */}
            <div className="bg-[#38BDF8] border-4 border-black p-5 sm:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-black border-b-2 border-black/30 pb-2 select-none leading-tight">
                  [ 01 // ARCHITECTURAL WORKFLOW ENGINEERING ]
                </h3>
                
                {/* Core Thesis */}
                <div className="space-y-1">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-black/60 font-black block select-none">Core Thesis</span>
                  <p className="text-xs sm:text-sm font-extrabold leading-relaxed text-black">
                    Translating messy, human-dependent operational bottlenecks into air-tight, automated software infrastructure.
                  </p>
                </div>
                
                {/* Key Capabilities */}
                <div className="space-y-1">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-black/60 font-black block select-none">Key Capabilities</span>
                  <p className="text-[11px] sm:text-xs font-semibold leading-relaxed text-black/95">
                    Custom JavaScript workflow scripting, end-to-end API integration architecture, custom webhooks, and complex database management.
                  </p>
                </div>
              </div>

              {/* Engine Tags */}
              <div className="space-y-2 pt-2 border-t border-black/10">
                <span className="font-mono text-[8px] uppercase tracking-widest text-black/60 font-black block select-none">Engine Tags</span>
                <div className="flex flex-wrap gap-1.5 select-none">
                  {["n8n", "Make (Integromat)", "JavaScript", "APIs", "SQL"].map((tag, tagIdx) => (
                    <span 
                      key={tagIdx} 
                      className="border border-black bg-white px-2 py-0.5 font-mono text-[9px] font-bold shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] text-black"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Soft Pink */}
            <div className="bg-[#F472B6] border-4 border-black p-5 sm:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-black border-b-2 border-black/30 pb-2 select-none leading-tight">
                  [ 02 // REVENUE OPERATIONS & GTM ARCHITECTURE ]
                </h3>
                
                {/* Core Thesis */}
                <div className="space-y-1">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-black/60 font-black block select-none">Core Thesis</span>
                  <p className="text-xs sm:text-sm font-extrabold leading-relaxed text-black">
                    Structuring data-driven sales pipelines that eliminate coordination friction and accelerate outbound revenue engine velocity.
                  </p>
                </div>
                
                {/* Key Capabilities */}
                <div className="space-y-1">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-black/60 font-black block select-none">Key Capabilities</span>
                  <p className="text-[11px] sm:text-xs font-semibold leading-relaxed text-black/95">
                    Algorithmic Ideal Customer Profile (ICP) data mapping, automated multi-channel outbound sequencing, and centralized multi-channel CRM architecture.
                  </p>
                </div>
              </div>

              {/* Engine Tags */}
              <div className="space-y-2 pt-2 border-t border-black/10">
                <span className="font-mono text-[8px] uppercase tracking-widest text-black/60 font-black block select-none">Engine Tags</span>
                <div className="flex flex-wrap gap-1.5 select-none">
                  {["Clay", "Apollo", "Reply.io", "Freshsales", "Intercom"].map((tag, tagIdx) => (
                    <span 
                      key={tagIdx} 
                      className="border border-black bg-white px-2 py-0.5 font-mono text-[9px] font-bold shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] text-black"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 3: Light Violet */}
            <div className="bg-[#A78BFA] border-4 border-black p-5 sm:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-black border-b-2 border-black/30 pb-2 select-none leading-tight">
                  [ 03 // DIGITAL SUPPLY CHAIN & SKU INFRASTRUCTURE ]
                </h3>
                
                {/* Core Thesis */}
                <div className="space-y-1">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-black/60 font-black block select-none">Core Thesis</span>
                  <p className="text-xs sm:text-sm font-extrabold leading-relaxed text-black">
                    Building highly scalable backend frameworks to monitor product lifecycles, global pricing alerts, and high-throughput multi-channel catalogs.
                  </p>
                </div>
                
                {/* Key Capabilities */}
                <div className="space-y-1">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-black/60 font-black block select-none">Key Capabilities</span>
                  <p className="text-[11px] sm:text-xs font-semibold leading-relaxed text-black/95">
                    Optimization of 1,000+ SKU workflows, automated live commodity rate tracking modules (Gold, Silver, USD), and cross-functional operational dashboard development.
                  </p>
                </div>
              </div>

              {/* Engine Tags */}
              <div className="space-y-2 pt-2 border-t border-black/10">
                <span className="font-mono text-[8px] uppercase tracking-widest text-black/60 font-black block select-none">Engine Tags</span>
                <div className="flex flex-wrap gap-1.5 select-none">
                  {["Rutgers Supply Chain", "Amazon Seller Central", "Flipkart", "KPI Dashboards"].map((tag, tagIdx) => (
                    <span 
                      key={tagIdx} 
                      className="border border-black bg-white px-2.5 py-0.5 font-mono text-[9px] font-bold shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] text-black"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          <div className="border-t-4 border-black pt-4 flex justify-between items-center text-xs font-mono font-bold text-zinc-500">
            <span>SCROLL DOWN FOR CASE STUDIES</span>
            <span className="animate-bounce">&darr;</span>
          </div>

        </div>
      </section>

      {/* --- SLIDE 3: SIGNATURE LANDMARK SYSTEMS DELIVERED --- */}
      <section className="w-full min-h-screen lg:h-screen lg:snap-start flex flex-col justify-center py-12 px-4 sm:p-10 lg:p-12 bg-transparent relative overflow-hidden border-t-4 border-black">
        <div className="max-w-5xl mx-auto w-full space-y-6">
          
          <div className="space-y-1 select-none">
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 font-extrabold block">Slide 03 // Real World Proof</span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black border-4 border-black bg-white px-4 py-1.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block">
              SIGNATURE LANDMARK SYSTEMS DELIVERED
            </h2>
          </div>

          <div className="border-t-4 border-black"></div>

          {/* Case Studies grid */}
          <div className="space-y-6 lg:max-h-[64vh] lg:overflow-y-auto pr-2 no-scrollbar">
            
            {/* Box 1: Finegrown */}
            <div className="bg-white border-4 border-black p-5 sm:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
              <div className="md:col-span-4 flex flex-col justify-between bg-[#FBBF24] border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-h-[14vh] md:min-h-0 select-none">
                <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-black leading-tight">
                  Finegrown Infrastructure Overhaul
                </h3>
                <span className="font-mono text-[9px] font-extrabold bg-white border border-black px-1.5 py-0.5 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] self-start mt-4">CASE STUDY 01</span>
              </div>
              
              <div className="md:col-span-8 space-y-3.5 flex flex-col justify-between text-xs sm:text-sm font-semibold">
                <div className="space-y-2">
                  <div><span className="font-mono font-bold text-zinc-500 block text-[9px] uppercase tracking-wider select-none">The Inefficiency:</span> Multi-department friction coordinating 1,000+ product SKUs alongside variable daily market changes.</div>
                  <div><span className="font-mono font-bold text-zinc-500 block text-[9px] uppercase tracking-wider select-none">The Build:</span> Developed an independent pipeline utilizing n8n + JavaScript to automate communication alerts, unified multiple contact channels into one absolute CRM view, and engineered real-time automated alerts for global commodity rate metrics (Gold, Silver, USD).</div>
                </div>
                <div className="bg-[#D1FAE5] border-2 border-black p-2.5 font-mono text-[9.5px] sm:text-xs font-black text-black flex items-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mt-2 select-none">
                  <span className="text-[9px] uppercase px-1.5 py-0.5 bg-white border border-black leading-none">PROOF</span>
                  <span>Cut manual tracking and operational overhead by ~40% across 6 cross-functional team spaces.</span>
                </div>
              </div>
            </div>

            {/* Box 2: ArkWave */}
            <div className="bg-white border-4 border-black p-5 sm:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
              <div className="md:col-span-4 flex flex-col justify-between bg-[#38BDF8] border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-h-[14vh] md:min-h-0 select-none">
                <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-black leading-tight">
                  ArkWave Scale Infrastructure
                </h3>
                <span className="font-mono text-[9px] font-extrabold bg-white border border-black px-1.5 py-0.5 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] self-start mt-4">CASE STUDY 02</span>
              </div>
              
              <div className="md:col-span-8 space-y-3.5 flex flex-col justify-between text-xs sm:text-sm font-semibold">
                <div className="space-y-2">
                  <div><span className="font-mono font-bold text-zinc-500 block text-[9px] uppercase tracking-wider select-none">The Inefficiency:</span> High human-error dependencies across decentralized remote startups.</div>
                  <div><span className="font-mono font-bold text-zinc-500 block text-[9px] uppercase tracking-wider select-none">The Build:</span> Architected and launched 20+ specialized custom workflow engines spanning CRM management, data handling validation, and automated lead tracking nodes.</div>
                </div>
                <div className="bg-[#D1FAE5] border-2 border-black p-2.5 font-mono text-[9.5px] sm:text-xs font-black text-black flex items-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mt-2 select-none">
                  <span className="text-[9px] uppercase px-1.5 py-0.5 bg-white border border-black leading-none">PROOF</span>
                  <span>Eliminated repetitive admin loops and stabilized high scalability for global clients.</span>
                </div>
              </div>
            </div>

          </div>

          <div className="border-t-4 border-black pt-4 flex justify-between items-center text-xs font-mono font-bold text-zinc-500">
            <span>SCROLL DOWN FOR TRAINING & EDUCATION</span>
            <span className="animate-bounce">&darr;</span>
          </div>

        </div>
      </section>

      {/* --- SLIDE 4: RECOGNIZED TRAINING & CORE STACK --- */}
      <section className="w-full min-h-screen lg:h-screen lg:snap-start flex flex-col justify-center py-12 px-4 sm:p-10 lg:p-12 bg-transparent relative overflow-hidden border-t-4 border-black">
        <div className="max-w-5xl mx-auto w-full space-y-6">
          
          <div className="space-y-1 select-none">
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 font-extrabold block">Slide 04 // Credentials</span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black border-4 border-black bg-white px-4 py-1.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block">
              RECOGNIZED TRAINING & CORE STACK
            </h2>
          </div>

          <div className="border-t-4 border-black"></div>

          {/* Certifications and Education Split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            
            {/* Left Box (Certifications Track) */}
            <div className="bg-[#C084FC] border-4 border-black p-5 sm:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between h-full space-y-4">
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight text-black border-b-2 border-black/30 pb-2 mb-4 select-none">
                  Certifications Track
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 select-none">
                  {[
                    { name: "McKinsey Forward Program", desc: "Leadership, business, and digital tech tools" },
                    { name: "UPenn Operations Management", desc: "Wharton School syllabus on process operations" },
                    { name: "Google AI Professional", desc: "Applied Artificial Intelligence integrations" },
                    { name: "Rutgers Supply Chain Logistics", desc: "Advanced logistics management and supply chain design" }
                  ].map((cert, idx) => (
                    <div key={idx} className="bg-white/40 border border-black/10 p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)] flex flex-col justify-between text-xs">
                      <span className="font-black text-black block mb-0.5">{cert.name}</span>
                      <span className="text-black/75 text-[10px] font-bold leading-tight mt-0.5">{cert.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="font-mono text-[9px] uppercase font-bold text-black/60 border-t border-black/15 pt-2 block">
                Verified Enterprise Training Credentials
              </div>
            </div>

            {/* Right Box (Academic Core) */}
            <div className="bg-[#C084FC] border-4 border-black p-5 sm:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between h-full min-h-[30vh]">
              <div className="space-y-4">
                <h3 className="text-xl font-black uppercase tracking-tight text-black border-b-2 border-black/30 pb-2 mb-4 select-none">
                  Academic Core
                </h3>
                <div className="space-y-4 text-black">
                  <div>
                    <h4 className="text-base sm:text-lg font-black uppercase tracking-tight text-black flex items-center gap-2 select-none">
                      <GraduationCap className="w-5 h-5 stroke-[2.5]" />
                      Bachelor of Computer Applications (BCA)
                    </h4>
                    <p className="font-mono text-[11px] font-extrabold text-black/70 uppercase mt-1">Dr. C.V. Raman University | 2013 – 2016</p>
                  </div>
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-black/60 font-extrabold block select-none">Core Academic Focus</span>
                    <div className="flex flex-wrap gap-1.5 select-none">
                      {["Data Handling", "Information Systems", "Applied Problem Solving", "System Architecture"].map((item, itemIdx) => {
                        return (
                          <span 
                            key={itemIdx} 
                            className="border border-black bg-white px-2.5 py-0.5 font-mono text-[10px] font-bold shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] text-black"
                          >
                            {item}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-black/15 pt-4 mt-6 flex items-center justify-between text-[11px] font-mono font-bold text-black/60 select-none">
                <span>Languages: English, Hindi, Gujarati</span>
                <span className="text-black uppercase font-black">[SYSTEM ONLINE]</span>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  )
}

export default ValueDeck
