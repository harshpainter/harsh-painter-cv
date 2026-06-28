import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Settings, BarChart2, CheckCircle, Database } from 'lucide-react'

function ValueDeck() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-between py-12 px-4 sm:p-10 lg:p-16 relative overflow-hidden bg-transparent">
      
      {/* --- STICKY BACK TO HOME NAVIGATION --- */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          to="/"
          className="border-2 border-black bg-white px-3 py-1.5 font-mono text-xs font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:bg-[#F472B6] transition-all cursor-pointer inline-block text-black decoration-none"
        >
          [ ← HOME ]
        </Link>
      </div>

      <div className="max-w-4xl mx-auto w-full flex-grow flex flex-col justify-center space-y-8 my-auto pt-10">
        
        {/* Header Block */}
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-1.5">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tight text-black leading-none">
              PERFORMANCE VALUE-DECK
            </h1>
            <span className="font-mono text-[10px] uppercase tracking-wider text-black bg-[#34D399] border-2 border-black px-3 py-1 inline-block shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] select-none">
              SYSTEM CONSOLE // DECK_LOADER
            </span>
          </div>
          <div className="border-t-4 border-black"></div>
        </motion.div>

        {/* Main Console Box (Heavy Neo-Brutalist Layout) */}
        <motion.div 
          className="border-4 border-black bg-white p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.1 }}
        >
          {/* Deck Status Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-black/40 pb-4">
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 bg-[#FB923C] border-2 border-black inline-block animate-pulse"></span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider">[STATUS]: BUILDING VALUE DECK</span>
            </div>
            <div className="flex items-center gap-2 bg-[#FEF3C7] border-2 border-black px-2.5 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Settings className="w-4 h-4 animate-spin text-black" />
              <span className="uppercase text-[10px] font-mono font-bold text-black">In Progress // 75% Loaded</span>
            </div>
          </div>

          {/* Console Text Area */}
          <div className="space-y-4 font-mono text-sm leading-relaxed text-black">
            <p className="text-zinc-500">// INITIALIZING METRIC DECK SYSTEM...</p>
            <p>
              This section is currently being configured to display a full performance slide deck highlighting key operations metrics, growth stats, and enterprise workflows.
            </p>
            
            {/* Loading Bar Graphic */}
            <div className="bg-[#F4F4F0] border-2 border-black p-3 font-mono text-xs text-black/80 font-bold space-y-1.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div>COMPILE: src/assets/value_deck_v1.0.pdf</div>
              <div className="text-[#34D399] tracking-tighter">
                [████████████████████████████████░░░░░░░░░░] 76.4% COMPLETED
              </div>
            </div>
          </div>

          {/* Under Construction Cards Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            
            {/* Metric Preview 1 */}
            <div className="border-2 border-black bg-[#FB923C] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black space-y-1.5">
              <BarChart2 className="w-5 h-5 stroke-[2.5]" />
              <div className="font-mono text-[9px] uppercase font-bold text-black/70">Efficiency Metric</div>
              <div className="text-base font-black uppercase tracking-tight">40% Overhead</div>
              <div className="font-mono text-[9px] font-bold">Manual work reduction via automations</div>
            </div>

            {/* Metric Preview 2 */}
            <div className="border-2 border-black bg-[#38BDF8] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black space-y-1.5">
              <Database className="w-5 h-5 stroke-[2.5]" />
              <div className="font-mono text-[9px] uppercase font-bold text-black/70">Scalability Metric</div>
              <div className="text-base font-black uppercase tracking-tight">1,000+ SKUs</div>
              <div className="font-mono text-[9px] font-bold">Synchronized product catalogs</div>
            </div>

            {/* Metric Preview 3 */}
            <div className="border-2 border-black bg-[#A78BFA] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black space-y-1.5">
              <CheckCircle className="w-5 h-5 stroke-[2.5]" />
              <div className="font-mono text-[9px] uppercase font-bold text-black/70">Reliability Metric</div>
              <div className="text-base font-black uppercase tracking-tight">85% Latency</div>
              <div className="font-mono text-[9px] font-bold">Middleware throughput reduction</div>
            </div>

          </div>

          {/* Helper instructions footer */}
          <div className="border-t border-black/10 pt-4 flex justify-between items-center text-[10px] font-mono font-bold text-zinc-400 uppercase">
            <span>Security: encrypted</span>
            <span>Ref: HP-DECK-2026</span>
          </div>

        </motion.div>

      </div>

      {/* Footer */}
      <footer className="w-full text-center font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest pt-8 border-t border-black/5 select-none">
        &copy; 2026 HARSH PAINTER // ALL RIGHTS RESERVED.
      </footer>

    </div>
  )
}

export default ValueDeck
