
import React, { useState } from 'react';
import { Users, UserMinus, Search, Filter, ShieldAlert, CheckCircle2, MoreVertical, FileText, AlertTriangle, Sparkles, X, ChevronRight, Mail, Phone, MapPin } from 'lucide-react';
import { MOCK_EMPLOYEES } from '../services/mockData';
import { Employee, EmployeeReview } from '../types';
import { cleanReviewWithAI } from '../services/geminiService';

const People: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);
  const [showExitModal, setShowExitModal] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState<Employee | null>(null);
  const [exitReview, setExitReview] = useState({
    category: 'Exit',
    rating: 3,
    remarks: '',
    evidenceType: '',
    isRehireEligible: true,
    isSevere: false
  });
  const [isCleaning, setIsCleaning] = useState(false);

  const handleExitClick = (emp: Employee) => {
    setSelectedEmp(emp);
    setShowExitModal(true);
  };

  const handleAIClean = async () => {
    if (!exitReview.remarks) return;
    setIsCleaning(true);
    const cleaned = await cleanReviewWithAI(exitReview.remarks);
    setExitReview(prev => ({ ...prev, remarks: cleaned }));
    setIsCleaning(false);
  };

  const confirmExit = () => {
    if (exitReview.isSevere && !exitReview.remarks) {
      alert("Evidence-backed remarks are required for severe flags.");
      return;
    }
    alert(`Exit process completed for ${selectedEmp?.name}. Employment certified. Remarks recorded and employee notified as per DPDP Act.`);
    setShowExitModal(false);
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="relative w-full md:w-[480px] group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={22} />
          <input 
            type="text" 
            placeholder="Search directory by name, role or PAN..." 
            className="w-full pl-14 pr-6 py-4 glass border border-black/5 dark:border-white/5 rounded-[24px] outline-none text-slate-900 dark:text-white font-bold transition-all focus:bg-white dark:focus:bg-charcoal-900 shadow-sm"
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-8 py-4 glass border border-black/5 dark:border-white/5 text-slate-500 dark:text-slate-400 rounded-[20px] font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 hover:text-blue-500 transition-all">
            <Filter size={18} />
            Filter
          </button>
          <button className="flex-1 md:flex-none px-10 py-4 bg-blue-600 text-white rounded-[24px] font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl shadow-blue-900/40 flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all">
            <Users size={18} />
            Bulk Import
          </button>
        </div>
      </div>

      <div className="glass rounded-[56px] shadow-2xl relative overflow-hidden border border-black/5 dark:border-white/5 transition-all">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 dark:bg-charcoal-800 transition-colors">
              <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Employee Detail</th>
              <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Organization</th>
              <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Trust Quotient</th>
              <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Lifecycle Status</th>
              <th className="px-10 py-6"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/5">
            {employees.map(emp => (
              <tr key={emp.id} className="group hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors cursor-pointer">
                <td className="px-10 py-8">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <img src={`https://picsum.photos/seed/${emp.id}/64/64`} className="w-16 h-16 rounded-[24px] object-cover ring-2 ring-white/10 shadow-xl" />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white dark:border-charcoal-900 rounded-full shadow-lg"></div>
                    </div>
                    <div>
                      <p className="text-lg font-black text-slate-900 dark:text-white transition-colors">{emp.name}</p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-widest mt-0.5">{emp.pan}</p>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-8">
                  <p className="text-sm font-black text-slate-700 dark:text-slate-200 transition-colors">{emp.currentRole}</p>
                  <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mt-1 opacity-70">{emp.department}</p>
                </td>
                <td className="px-10 py-8">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-2 bg-slate-100 dark:bg-charcoal-900 rounded-full overflow-hidden border border-black/5 dark:border-white/5">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${emp.trustScore > 70 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : emp.trustScore > 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                        style={{ width: `${emp.trustScore}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-black text-slate-900 dark:text-white">{emp.trustScore}</span>
                  </div>
                </td>
                <td className="px-10 py-8">
                  <span className="flex items-center gap-2 text-[10px] font-black text-emerald-600 dark:text-emerald-500 tracking-[0.2em] uppercase">
                    <CheckCircle2 size={16} /> Active Hire
                  </span>
                </td>
                <td className="px-10 py-8 text-right">
                  <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                    <button 
                      onClick={() => handleExitClick(emp)}
                      className="px-6 py-2.5 bg-red-600/10 text-red-600 dark:text-red-500 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-xl"
                    >
                       Relieve
                    </button>
                    <button className="p-2.5 glass text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Exit Review Flow - High Compliance Modal */}
      {showExitModal && selectedEmp && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
          <div className="glass w-full max-w-2xl rounded-[56px] shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-500 border border-white/5">
            <div className="p-10 border-b border-black/5 dark:border-white/5 flex justify-between items-center bg-slate-50/50 dark:bg-charcoal-900/50 transition-colors">
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-1">Exit Certification</h2>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Employee: {selectedEmp.name}</p>
              </div>
              <button onClick={() => setShowExitModal(false)} className="p-4 glass rounded-[24px] text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">
                <X size={24} />
              </button>
            </div>

            <div className="p-10 overflow-y-auto no-scrollbar space-y-10">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Structured Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button 
                        key={star} 
                        onClick={() => setExitReview(prev => ({ ...prev, rating: star }))}
                        className={`w-12 h-12 rounded-2xl font-black transition-all ${exitReview.rating >= star ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/30' : 'bg-slate-100 dark:bg-charcoal-800 text-slate-400 hover:text-blue-500'}`}
                      >
                        {star}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Rehire Eligibility</label>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setExitReview(prev => ({ ...prev, isRehireEligible: true }))}
                      className={`flex-1 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest border-2 transition-all ${exitReview.isRehireEligible ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500' : 'border-slate-100 dark:border-charcoal-800 text-slate-400'}`}
                    >
                      Eligible
                    </button>
                    <button 
                      onClick={() => setExitReview(prev => ({ ...prev, isRehireEligible: false }))}
                      className={`flex-1 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest border-2 transition-all ${!exitReview.isRehireEligible ? 'border-red-500 bg-red-500/10 text-red-500 shadow-xl shadow-red-900/10' : 'border-slate-100 dark:border-charcoal-800 text-slate-400'}`}
                    >
                      Restricted
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Exit Remarks (Auditable)</label>
                  <button 
                    onClick={handleAIClean}
                    disabled={isCleaning}
                    className="text-[10px] flex items-center gap-2 text-blue-600 dark:text-blue-500 font-black uppercase tracking-widest hover:underline disabled:opacity-50"
                  >
                    <Sparkles size={14} className={isCleaning ? 'animate-spin' : ''} /> {isCleaning ? 'Refining...' : 'Refine with AI'}
                  </button>
                </div>
                <textarea 
                  rows={4}
                  placeholder="Summarize performance and exit reason objectively..."
                  className="w-full p-6 bg-slate-100 dark:bg-charcoal-800 border border-transparent focus:border-blue-500/30 rounded-[32px] outline-none text-slate-900 dark:text-white font-bold transition-all resize-none"
                  value={exitReview.remarks}
                  onChange={(e) => setExitReview(prev => ({ ...prev, remarks: e.target.value }))}
                />
              </div>

              <div className="flex items-center gap-6 p-6 bg-red-500/5 rounded-[32px] border border-red-500/10">
                <div className="flex-1">
                  <p className="text-sm font-black text-red-600 dark:text-red-500 tracking-tight">Serious Misconduct Flag</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Requires evidence linkage per compliance policy.</p>
                </div>
                <div className="relative inline-flex items-center cursor-pointer" onClick={() => setExitReview(prev => ({ ...prev, isSevere: !prev.isSevere }))}>
                   <div className={`w-14 h-8 rounded-full transition-all duration-300 ${exitReview.isSevere ? 'bg-red-600' : 'bg-slate-200 dark:bg-charcoal-800'}`}></div>
                   <div className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 transform ${exitReview.isSevere ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              </div>

              {exitReview.isSevere && (
                <div className="space-y-6 p-8 bg-slate-100 dark:bg-charcoal-900/50 rounded-[40px] border border-red-600/20 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="flex items-center gap-3 text-red-600 mb-2">
                    <ShieldAlert size={22} />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">Compliance Evidence Required</span>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Report Date</label>
                      <input type="date" className="w-full px-4 py-3 bg-white dark:bg-charcoal-800 border border-black/5 dark:border-white/5 rounded-xl text-sm font-bold text-slate-900 dark:text-white" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Evidence Category</label>
                      <select className="w-full px-4 py-3 bg-white dark:bg-charcoal-800 border border-black/5 dark:border-white/5 rounded-xl text-sm font-bold text-slate-900 dark:text-white appearance-none outline-none">
                        <option>Police FIR Log</option>
                        <option>Internal Audit Findings</option>
                        <option>CCTV / Digital Proof</option>
                        <option>Financial Forgery</option>
                      </select>
                    </div>
                  </div>
                  <div className="border-2 border-dashed border-slate-200 dark:border-white/10 p-8 rounded-[32px] text-center hover:bg-slate-200 dark:hover:bg-charcoal-800 cursor-pointer transition-all group">
                    <FileText size={32} className="mx-auto text-slate-400 group-hover:text-red-500 transition-colors mb-2" />
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Link Supporting Documents (PDF/JPG)</p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-10 bg-slate-50 dark:bg-charcoal-900 border-t border-black/5 dark:border-white/5 flex gap-5 transition-colors">
              <button 
                onClick={() => setShowExitModal(false)}
                className="flex-1 py-5 glass border border-black/5 dark:border-white/5 text-slate-500 dark:text-slate-400 rounded-[28px] font-black uppercase tracking-[0.3em] text-[10px] hover:text-slate-900 dark:hover:text-white transition-all"
              >
                Abort
              </button>
              <button 
                onClick={confirmExit}
                className="flex-[2] py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[28px] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
              >
                Finalize & Update Trust History
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default People;
