
import React, { useState, useEffect } from 'react';
import { Search, History, CheckCircle2, ShieldCheck, Sparkles, TrendingUp, Calendar, MapPin, Briefcase, ChevronRight, Info, AlertTriangle, MessageSquare } from 'lucide-react';
import { MOCK_EMPLOYEES } from '../services/mockData';
import { Employee } from '../types';
import { useViewMode } from '../App';
import { getHiringSnapshot } from '../services/geminiService';

const TrustScoreGauge = ({ score }: { score: number }) => {
  const radius = 90;
  const stroke = 14;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center group">
      <svg height={radius * 2} width={radius * 2} className="-rotate-90">
        <circle
          stroke="currentColor"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="text-slate-100 dark:text-white/5 transition-colors"
        />
        <circle
          stroke={score > 80 ? '#10b981' : score > 50 ? '#f59e0b' : '#ef4444'}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter group-hover:scale-110 transition-all">{score}</span>
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">Trust Score</span>
      </div>
    </div>
  );
};

const HireTrust: React.FC = () => {
  const { mode } = useViewMode();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(MOCK_EMPLOYEES[0]);
  const [snapshot, setSnapshot] = useState<string>('');

  useEffect(() => {
    if (selectedEmployee) {
      getHiringSnapshot(selectedEmployee.reviews.map(r => r.remarks)).then(setSnapshot);
    }
  }, [selectedEmployee]);

  if (mode === 'excel') {
    return (
      <div className="glass rounded-[32px] overflow-hidden shadow-2xl">
        <table className="w-full excel-table">
          <thead className="bg-slate-50 dark:bg-charcoal-800 transition-colors">
            <tr>
              <th>Employee ID</th>
              <th>Full Name</th>
              <th>ID Token (PAN)</th>
              <th>Trust Factor</th>
              <th>Exp. (Dealer Count)</th>
              <th>Last Verified</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/5">
            {MOCK_EMPLOYEES.map(emp => (
              <tr key={emp.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer" onClick={() => setSelectedEmployee(emp)}>
                <td className="mono text-blue-600 dark:text-blue-500 font-bold">#{emp.id.toUpperCase()}</td>
                <td className="font-bold text-slate-900 dark:text-white">{emp.name}</td>
                <td className="mono text-slate-500 dark:text-slate-400">{emp.pan}</td>
                <td className={`font-black ${emp.trustScore > 80 ? 'text-emerald-500' : 'text-amber-500'}`}>{emp.trustScore}</td>
                <td className="text-slate-600 dark:text-slate-400">{emp.verifiedEmployments} Dealers</td>
                <td className="text-slate-500">{emp.lastUpdated}</td>
                <td>
                  <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">VERIFIED</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      {/* Search Bar - World Class Design */}
      <div className="max-w-3xl mx-auto glass p-3 rounded-[32px] shadow-2xl ring-1 ring-black/5 dark:ring-white/10 flex items-center gap-4 transition-all">
        <div className="flex-1 flex items-center px-6 gap-4">
          <Search className="text-blue-500" size={24} />
          <input 
            type="text" 
            placeholder="Verify Employee PAN or Aadhaar token..." 
            className="w-full py-4 bg-transparent text-xl font-bold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="bg-blue-600 text-white px-10 py-4.5 rounded-[24px] font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-900/40 hover:scale-105 active:scale-95 transition-all">
          Lookup Trust
        </button>
      </div>

      {selectedEmployee && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Left - Trust Gauge & Snapshot */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass p-10 rounded-[48px] shadow-2xl relative overflow-hidden flex flex-col items-center border border-black/5 dark:border-white/5 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[64px] rounded-full"></div>
              
              <TrustScoreGauge score={selectedEmployee.trustScore} />

              <div className="mt-10 w-full grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-charcoal-800 p-5 rounded-3xl text-center border border-black/5 dark:border-white/5 transition-colors">
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Employments</p>
                   <p className="text-2xl font-black text-slate-900 dark:text-white">{selectedEmployee.verifiedEmployments}</p>
                </div>
                <div className="bg-slate-50 dark:bg-charcoal-800 p-5 rounded-3xl text-center border border-black/5 dark:border-white/5 transition-colors">
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Active Flags</p>
                   <p className={`text-2xl font-black ${selectedEmployee.flags > 0 ? 'text-red-500' : 'text-emerald-500'}`}>{selectedEmployee.flags}</p>
                </div>
              </div>

              <div className="mt-10 flex flex-col w-full gap-3 border-t border-black/5 dark:border-white/5 pt-6">
                 <div className="flex items-center justify-between text-xs px-2">
                    <span className="text-slate-500 font-bold">Identity Verified</span>
                    <span className="text-emerald-600 dark:text-emerald-500 flex items-center gap-1 font-black"><CheckCircle2 size={14}/> PAN + Aadhaar</span>
                 </div>
                 <div className="flex items-center justify-between text-xs px-2">
                    <span className="text-slate-500 font-bold">Last Verification</span>
                    <span className="text-slate-900 dark:text-white font-black">{selectedEmployee.lastUpdated}</span>
                 </div>
              </div>
            </div>

            <div className="glass p-8 rounded-[40px] border-l-4 border-blue-600 bg-blue-50 dark:bg-blue-600/5 shadow-xl relative overflow-hidden group transition-all">
               <div className="absolute top-4 right-4 text-blue-500/20 group-hover:scale-125 transition-transform duration-500"><Sparkles size={48}/></div>
               <h4 className="text-[10px] font-black text-blue-600 dark:text-blue-500 uppercase tracking-[0.3em] mb-4">Hiring AI Synthesis</h4>
               <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium italic transition-colors">
                 "{snapshot || "Analyzing verified history across India-wide dealership network..."}"
               </p>
            </div>
          </div>

          {/* Right - Timeline & Reviews */}
          <div className="lg:col-span-8 space-y-10">
            <div className="glass p-10 rounded-[48px] shadow-2xl relative border border-black/5 dark:border-white/5">
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3 transition-colors">
                  <History className="text-blue-600 dark:text-blue-500" size={28} />
                  Employment History
                </h3>
                <button className="text-[10px] font-black bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 px-5 py-2.5 rounded-xl uppercase tracking-widest transition-all">
                  Request Update
                </button>
              </div>

              <div className="relative">
                {/* Visual Timeline Bar */}
                <div className="absolute left-[24px] top-4 bottom-4 w-1.5 bg-gradient-to-b from-blue-600 via-slate-200 dark:via-charcoal-800 to-transparent rounded-full opacity-30 transition-all"></div>

                <div className="space-y-16">
                   {selectedEmployee.reviews.map((rev, idx) => (
                     <div key={idx} className="relative pl-16 group">
                        {/* Milestone Marker */}
                        <div className="absolute left-0 top-0 w-12 h-12 rounded-[20px] glass flex items-center justify-center text-blue-600 dark:text-blue-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 z-10 shadow-2xl border border-black/5 dark:border-white/10">
                           {rev.category === 'Performance' ? <TrendingUp size={24}/> : <Briefcase size={24}/>}
                        </div>
                        
                        <div className="space-y-4">
                           <div className="flex justify-between items-start">
                              <div>
                                 <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{rev.authorDealer}</h4>
                                 <div className="flex items-center gap-4 text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">
                                    <span className="flex items-center gap-1.5"><Calendar size={14} className="opacity-50"/> {rev.date}</span>
                                    <span className="flex items-center gap-1.5"><MapPin size={14} className="opacity-50"/> HQ Central</span>
                                 </div>
                              </div>
                              <div className="flex gap-1.5 bg-slate-100 dark:bg-charcoal-900 p-1.5 rounded-full border border-black/5 dark:border-white/5 transition-colors">
                                 {[1,2,3,4,5].map(s => (
                                   <div key={s} className={`w-2 h-2 rounded-full ${s <= rev.rating ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
                                 ))}
                              </div>
                           </div>

                           <div className="bg-white dark:bg-white/[0.02] p-8 rounded-[32px] border border-black/5 dark:border-white/5 shadow-xl transition-all duration-500 group-hover:border-blue-600/30 group-hover:bg-blue-50 dark:group-hover:bg-blue-600/5">
                              <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium transition-colors">"{rev.remarks}"</p>
                              
                              <div className="mt-6 flex flex-wrap gap-3">
                                 {['Process Integrity', 'KPI Target', 'Customer Satisfaction'].map(tag => (
                                   <span key={tag} className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 bg-slate-50 dark:bg-charcoal-900 border border-black/5 dark:border-white/10 rounded-xl text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:border-blue-200 dark:group-hover:border-blue-400/20 transition-all">
                                      {tag}
                                   </span>
                                 ))}
                              </div>

                              {rev.employeeResponse && (
                                <div className="mt-6 p-6 bg-slate-100 dark:bg-charcoal-950/50 rounded-3xl border-l-4 border-blue-600 dark:border-blue-500 relative transition-colors">
                                   <MessageSquare size={20} className="absolute -top-3 -right-3 text-blue-600 dark:text-blue-500 opacity-20" />
                                   <p className="text-[10px] font-black text-blue-600 dark:text-blue-500 uppercase tracking-widest mb-2">Verified Response</p>
                                   <p className="text-sm text-slate-600 dark:text-slate-400 italic transition-colors">"{rev.employeeResponse}"</p>
                                </div>
                              )}
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            </div>

            <div className="flex gap-5">
               <button className="flex-[2] bg-blue-600 text-white py-6 rounded-[32px] font-black tracking-[0.2em] uppercase text-xs shadow-2xl shadow-blue-900/40 hover:scale-[1.02] active:scale-95 transition-all">
                  Onboard Candidate
               </button>
               <button className="flex-1 glass text-slate-600 dark:text-white py-6 rounded-[32px] font-black tracking-[0.2em] uppercase text-xs shadow-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                  Detailed BGV
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HireTrust;
