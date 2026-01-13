
import React, { useState } from 'react';
import { ClipboardCheck, Clock, AlertTriangle, CheckCircle2, MoreVertical, Search, FileText, ChevronRight, TrendingUp, AlertCircle, Users, X, Send, Phone } from 'lucide-react';
import { MOCK_JOB_CARDS } from '../services/mockData';
import { useViewMode } from '../App';
import { JobCard } from '../types';

const Warranty: React.FC = () => {
   const { mode } = useViewMode();
   const [selectedJC, setSelectedJC] = useState<JobCard | null>(null);
   const [showReviewDrawer, setShowReviewDrawer] = useState(false);
   const [filterStatus, setFilterStatus] = useState<string>('All');
   const [searchTerm, setSearchTerm] = useState('');
   const [instruction, setInstruction] = useState('');

   const filteredJCs = MOCK_JOB_CARDS.filter(jc => {
      const matchesStatus = filterStatus === 'All' || jc.status === filterStatus;
      const matchesSearch = jc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
         jc.regNo.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
   });

   const handleReview = (jc: JobCard) => {
      setSelectedJC(jc);
      setShowReviewDrawer(true);
   };

   if (mode === 'excel') {
      return (
         <div className="glass rounded-[32px] overflow-hidden shadow-2xl">
            <table className="w-full excel-table">
               <thead>
                  <tr className="bg-slate-100 dark:bg-charcoal-800 transition-colors">
                     <th>Job Card #</th>
                     <th>Reg No</th>
                     <th>Aging</th>
                     <th>Advisor</th>
                     <th>Status</th>
                     <th>MD Req</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-black/5 dark:divide-white/5">
                  {MOCK_JOB_CARDS.map(jc => (
                     <tr key={jc.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                        <td className="mono font-bold text-slate-900 dark:text-blue-500">{jc.id}</td>
                        <td className="mono text-slate-500 dark:text-slate-400">{jc.regNo}</td>
                        <td className={`font-black ${jc.agingDays > 1 ? 'text-red-500' : 'text-slate-600 dark:text-slate-300'}`}>{jc.agingDays}d</td>
                        <td className="text-slate-700 dark:text-slate-200">{jc.advisor}</td>
                        <td><span className="text-[10px] font-black px-2 py-1 bg-white/10 rounded-md uppercase tracking-widest">{jc.status}</span></td>
                        <td className="font-black">{jc.mdActionRequired ? 'YES' : 'NO'}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      );
   }

   return (
      <div className="space-y-12 pb-20">
         {/* Pipeline Flow Strip */}
         <div className="flex items-center gap-2 p-3 glass rounded-[40px] shadow-2xl overflow-x-auto no-scrollbar">
            {[
               { label: 'Drafted', count: 12, color: 'bg-slate-400' },
               { label: 'Submitted', count: 8, color: 'bg-blue-600' },
               { label: 'OEM Review', count: 5, color: 'bg-indigo-600' },
               { label: 'Needs Info', count: 3, color: 'bg-amber-500' },
               { label: 'Approved', count: 24, color: 'bg-emerald-600' },
            ].map((step, i) => (
               <React.Fragment key={i}>
                  <div
                     onClick={() => setFilterStatus(step.label)}
                     className={`min-w-[160px] flex-1 glass p-6 rounded-[32px] text-center relative overflow-hidden group border border-transparent hover:border-white/10 transition-all cursor-pointer ${filterStatus === step.label ? 'ring-2 ring-blue-500 bg-blue-500/5' : ''}`}
                  >
                     <div className={`absolute top-0 left-0 w-1 h-full ${step.color} shadow-[0_0_15px_rgba(59,130,246,0.3)]`}></div>
                     <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 group-hover:text-blue-400 transition-colors">{step.label}</p>
                     <p className="text-3xl font-black text-slate-900 dark:text-white transition-colors">{step.count}</p>
                  </div>
                  {i < 4 && <ChevronRight className="text-slate-200 dark:text-slate-800 shrink-0" size={20} />}
               </React.Fragment>
            ))}
            <div
               onClick={() => setFilterStatus('All')}
               className={`min-w-[160px] flex-1 glass p-6 rounded-[32px] text-center relative overflow-hidden group border border-transparent hover:border-white/10 transition-all cursor-pointer ${filterStatus === 'All' ? 'ring-2 ring-blue-500 bg-blue-500/5' : ''}`}
            >
               <div className="absolute top-0 left-0 w-1 h-full bg-slate-400"></div>
               <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 group-hover:text-blue-400 transition-colors">All JCs</p>
               <p className="text-3xl font-black text-slate-900 dark:text-white transition-colors">{MOCK_JOB_CARDS.length}</p>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Aging List */}
            <div className="lg:col-span-8 glass p-10 rounded-[56px] shadow-2xl relative border border-black/5 dark:border-white/5">
               <div className="flex justify-between items-center mb-12">
                  <div>
                     <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter transition-colors">Critical JC Aging</h3>
                     <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1">Pending MD Intervention (&gt;1 Day)</p>
                  </div>
                  <div className="relative group">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-500 transition-colors" size={18} />
                     <input
                        type="text"
                        placeholder="Search JC No..."
                        className="pl-12 pr-6 py-4 glass rounded-[24px] text-[10px] font-black outline-none uppercase tracking-widest border-none w-56 focus:w-80 transition-all focus:bg-slate-100 dark:focus:bg-charcoal-900 shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                     />
                  </div>
               </div>

               <div className="space-y-6">
                  {filteredJCs.map((jc) => (
                     <div key={jc.id} className="group relative glass p-8 rounded-[40px] hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex items-center gap-10 border border-transparent hover:border-blue-600/20">
                        <div className="w-20 text-center">
                           <span className={`text-4xl font-black leading-none block ${jc.agingDays > 1 ? 'text-red-500' : 'text-slate-900 dark:text-white'}`}>{jc.agingDays}</span>
                           <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-2 block">Days Age</span>
                        </div>

                        <div className="flex-1 min-w-0">
                           <div className="flex items-center gap-3 mb-2">
                              <span className="text-lg font-black text-slate-900 dark:text-white transition-colors">{jc.id}</span>
                              <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mono">{jc.regNo}</span>
                           </div>
                           <div className="flex items-center gap-4">
                              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                 <Users size={14} className="text-blue-500" /> {jc.advisor}
                              </p>
                              {jc.reasonCode && (
                                 <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-[9px] font-black rounded-full border border-amber-500/20">{jc.reasonCode}</span>
                              )}
                           </div>

                           {/* Progress Track */}
                           <div className="mt-6 h-2 w-full bg-slate-100 dark:bg-charcoal-900 rounded-full overflow-hidden border border-black/5 dark:border-white/5">
                              <div
                                 className={`h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(239,68,68,0.2)] ${jc.agingDays >= 3 ? 'bg-red-500' : 'bg-amber-500'}`}
                                 style={{ width: `${Math.min(jc.agingDays * 33, 100)}%` }}
                              ></div>
                           </div>
                        </div>

                        <div className="hidden md:block w-32">
                           <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-2xl block text-center transition-all ${jc.status === 'Approved' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' :
                              jc.status === 'OEM Review' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' :
                                 'glass text-slate-500 dark:text-slate-400'
                              }`}>
                              {jc.status}
                           </span>
                        </div>

                        <div>
                           {jc.mdActionRequired ? (
                              <button
                                 onClick={() => handleReview(jc)}
                                 className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-[20px] text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white transition-all active:scale-95"
                              >
                                 Review
                              </button>
                           ) : (
                              <button className="p-4 glass text-slate-300 dark:text-slate-700 hover:text-blue-600 dark:hover:text-blue-500 rounded-2xl transition-all">
                                 <MoreVertical size={22} />
                              </button>
                           )}
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Dashboard Side */}
            <div className="lg:col-span-4 space-y-8 flex flex-col">
               <div className="glass p-10 rounded-[56px] shadow-2xl relative overflow-hidden text-center flex-1 border border-black/5 dark:border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent transition-all">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-[32px]"></div>
                  <div className="w-24 h-24 bg-emerald-500/10 text-emerald-500 rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/10 ring-1 ring-emerald-500/20">
                     <TrendingUp size={40} />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tighter">Efficiency Hub</h4>
                  <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-relaxed mb-10">
                     Warranty cycle is <span className="text-emerald-500">+22% Optimized</span> vs Region.
                  </p>

                  <div className="grid grid-cols-2 gap-8 border-t border-black/5 dark:border-white/5 pt-10">
                     <div className="text-center">
                        <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter transition-colors">₹4.8L</p>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">Claimed Today</p>
                     </div>
                     <div className="text-center">
                        <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter transition-colors">₹12.4L</p>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">Pipe Value</p>
                     </div>
                  </div>
               </div>

               <div className="glass p-10 rounded-[48px] shadow-2xl border border-black/5 dark:border-white/5 transition-all">
                  <h4 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
                     <AlertCircle size={18} className="text-amber-500" /> Critical Stall Reasons
                  </h4>
                  <div className="space-y-6">
                     {[
                        { reason: 'Waiting for Parts', count: 5, color: 'bg-amber-500' },
                        { reason: 'OEM Review Delay', count: 3, color: 'bg-indigo-600' },
                        { reason: 'Document Error', count: 1, color: 'bg-red-500' }
                     ].map((stall, i) => (
                        <div key={i} className="flex justify-between items-center p-5 bg-slate-50 dark:bg-charcoal-950/40 rounded-3xl border border-black/5 dark:border-white/5 transition-colors">
                           <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{stall.reason}</span>
                           <span className={`text-[10px] font-black text-white px-3 py-1.5 rounded-xl shadow-lg ${stall.color}`}>{stall.count}</span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>

         {/* Review Drawer */}
         {showReviewDrawer && selectedJC && (
            <div className="fixed inset-0 z-[70] flex justify-end">
               <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" onClick={() => setShowReviewDrawer(false)}></div>
               <div className="relative glass w-full max-w-xl h-full shadow-[0_0_100px_rgba(0,0,0,0.5)] border-l border-white/5 p-12 flex flex-col animate-in slide-in-from-right duration-500">
                  <div className="flex justify-between items-start mb-12">
                     <div>
                        <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">MD Review</h2>
                        <p className="text-sm font-black text-blue-500 uppercase tracking-widest">{selectedJC.id} • Aging {selectedJC.agingDays} Days</p>
                     </div>
                     <button onClick={() => setShowReviewDrawer(false)} className="p-3 glass rounded-2xl text-slate-400 hover:text-white transition-all">
                        <X size={24} />
                     </button>
                  </div>

                  <div className="flex-1 space-y-12 overflow-y-auto no-scrollbar pb-12">
                     <div className="space-y-6">
                        <div className="p-8 bg-slate-100 dark:bg-charcoal-900 rounded-[40px] border border-black/5 dark:border-white/5">
                           <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">JC Core Specs</h4>
                           <div className="grid grid-cols-2 gap-8">
                              <div>
                                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Advisor</p>
                                 <p className="text-lg font-black text-slate-900 dark:text-white">{selectedJC.advisor}</p>
                              </div>
                              <div>
                                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Registration</p>
                                 <p className="text-lg font-black text-slate-900 dark:text-white">{selectedJC.regNo}</p>
                              </div>
                              <div>
                                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Stall Code</p>
                                 <p className="text-lg font-black text-amber-500">{selectedJC.reasonCode || 'Uncategorized'}</p>
                              </div>
                              <div>
                                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                 <p className="text-lg font-black text-blue-500">{selectedJC.status}</p>
                              </div>
                           </div>
                        </div>

                        <div className="space-y-4">
                           <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Executive Instructions</h4>
                           <textarea
                              rows={4}
                              placeholder="Enter directives for advisor or spares team..."
                              className="w-full bg-slate-100 dark:bg-charcoal-800 p-6 rounded-[32px] outline-none text-slate-900 dark:text-white font-bold transition-colors resize-none border border-transparent focus:border-blue-500"
                              value={instruction}
                              onChange={e => setInstruction(e.target.value)}
                           />
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-3 p-6 glass text-slate-900 dark:text-white rounded-3xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                           <Phone size={18} className="text-blue-500" /> Call Advisor
                        </button>
                        <button className="flex items-center justify-center gap-3 p-6 glass text-slate-900 dark:text-white rounded-3xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                           <AlertTriangle size={18} className="text-amber-500" /> Escalate OEM
                        </button>
                     </div>
                  </div>

                  <div className="pt-8 border-t border-black/5 dark:border-white/5">
                     <button
                        onClick={() => setShowReviewDrawer(false)}
                        className="w-full py-6 bg-blue-600 text-white rounded-[28px] font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl shadow-blue-900/50 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                     >
                        <Send size={20} /> Dispatch Directive
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default Warranty;
