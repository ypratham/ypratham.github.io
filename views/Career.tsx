import React from 'react';
import { EXPERIENCE } from '../constants';
import { Briefcase, MapPin, Calendar, CheckSquare } from 'lucide-react';

const Career: React.FC = () => {
  return (
    <div className="flex-grow flex flex-col p-6 md:p-12 h-full overflow-hidden bg-[#0F1923]">
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-[#ECE8E1]/10 flex justify-between items-end">
        <div>
           <h2 className="text-6xl font-header font-bold uppercase text-white tracking-tighter">Career</h2>
           <p className="text-[#ECE8E1]/50 uppercase tracking-widest text-sm flex items-center gap-2">
             <Briefcase size={14} /> Service Record & Experience
           </p>
        </div>
      </div>

      {/* Match History / Career List */}
      <div className="flex-grow overflow-y-auto custom-scrollbar pr-4 pb-20 space-y-4">
        {EXPERIENCE.map((exp, index) => (
          <div 
            key={exp.id} 
            className="group relative flex flex-col md:flex-row bg-[#0F1923] border border-[#ECE8E1]/10 hover:border-[#FF4655] transition-all duration-300 min-h-[120px] overflow-hidden"
          >
            {/* Left Status Bar */}
            <div className={`w-2 md:w-4 ${index === 0 ? 'bg-[#4ade80]' : 'bg-[#ECE8E1]/20'} group-hover:bg-[#FF4655] transition-colors`}></div>

            {/* Main Content Content */}
            <div className="flex-grow flex flex-col md:flex-row items-stretch">
               
               {/* 1. Job Role Section */}
               <div className="p-6 md:w-1/3 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#ECE8E1]/5 bg-[#ECE8E1]/5">
                  <h3 className="text-2xl font-header font-bold text-white uppercase leading-none mb-2 group-hover:text-[#FF4655] transition-colors">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#ECE8E1]/50 uppercase tracking-widest">
                    <CheckSquare size={12} />
                    <span>{exp.type}</span>
                  </div>
               </div>

               {/* 2. Company & Location */}
               <div className="p-6 md:w-1/4 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#ECE8E1]/5">
                  <div className="text-lg font-bold text-[#ECE8E1] uppercase mb-1">{exp.company}</div>
                  <div className="flex items-center gap-2 text-xs text-[#ECE8E1]/40 uppercase tracking-wide">
                     <MapPin size={12} />
                     {exp.location}
                  </div>
               </div>

               {/* 3. Description & Stats */}
               <div className="p-6 md:w-1/3 flex flex-col justify-center">
                  <p className="text-sm text-[#ECE8E1]/70 leading-relaxed mb-2">
                    {exp.description}
                  </p>
               </div>

               {/* 4. Date / Score */}
               <div className="p-6 md:w-auto flex flex-col justify-center items-end ml-auto bg-[#000]/20">
                  <div className="text-xl font-header font-bold text-[#ECE8E1] uppercase">{exp.period.split(' - ')[0]}</div>
                  <div className="text-xs text-[#ECE8E1]/30 uppercase tracking-widest mb-1">TO</div>
                  <div className={`text-xl font-header font-bold uppercase ${exp.period.includes('PRESENT') ? 'text-[#4ade80]' : 'text-[#ECE8E1]/50'}`}>
                    {exp.period.split(' - ')[1] || 'NOW'}
                  </div>
               </div>

            </div>

            {/* Hover Glitch Overlay */}
            <div className="absolute inset-0 bg-[#FF4655]/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></div>
          </div>
        ))}

        <div className="flex justify-center py-8">
           <div className="text-[#ECE8E1]/20 uppercase tracking-[0.5em] text-xs">End of Service Record</div>
        </div>
      </div>
    </div>
  );
};

export default Career;