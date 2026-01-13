
import React, { useState } from 'react';
import { Package, Box, Zap, Barcode, Search, Filter, AlertCircle, ShoppingCart, ArrowUpRight, TrendingUp, Layers, X, Plus, Clipboard } from 'lucide-react';
import { MOCK_SPARES, MOCK_JOB_CARDS } from '../services/mockData';
import { useViewMode } from '../App';
import { SparePart } from '../types';

const Spares: React.FC = () => {
  const { mode } = useViewMode();
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [selectedPart, setSelectedPart] = useState<SparePart | null>(null);
  const [issueData, setIssueData] = useState({
    jobCardId: MOCK_JOB_CARDS[0].id,
    qty: 1
  });

  const handleIssue = (part: SparePart) => {
    setSelectedPart(part);
    setShowIssueModal(true);
  };

  if (mode === 'excel') {
    return (
      <div className="glass rounded-[32px] overflow-hidden shadow-2xl">
        <table className="w-full excel-table">
          <thead className="bg-slate-100 dark:bg-charcoal-800 transition-colors">
            <tr>
              <th>Part No</th>
              <th>Description</th>
              <th>Stock On Hand</th>
              <th>Min SOH</th>
              <th>Category</th>
              <th>Valuation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/5">
            {MOCK_SPARES.map(p => (
              <tr key={p.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <td className="mono text-blue-600 dark:text-blue-500 font-bold">{p.partNo}</td>
                <td className="font-bold text-slate-900 dark:text-white">{p.name}</td>
                <td className={`mono ${p.onHand <= p.minLevel ? 'text-red-500 font-black' : 'text-slate-600 dark:text-slate-300'}`}>{p.onHand}</td>
                <td className="mono text-slate-500">{p.minLevel}</td>
                <td><span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-white/10 rounded-md transition-colors">{p.category}</span></td>
                <td className="mono text-slate-700 dark:text-slate-200">₹{(p.onHand * 1450).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
         <div className="glass p-10 rounded-[48px] shadow-2xl relative overflow-hidden group border border-black/5 dark:border-white/5 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700"></div>
            <Box size={32} className="text-blue-500 mb-8" />
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">Inventory Matrix</h4>
            <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">₹84.2L</p>
         </div>
         <div className="glass p-10 rounded-[48px] shadow-2xl relative overflow-hidden group border border-black/5 dark:border-white/5 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/10 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700"></div>
            <ShoppingCart size={32} className="text-emerald-500 mb-8" />
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">Weekly Outflow</h4>
            <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">₹14.8L</p>
         </div>
         <div className="glass p-10 rounded-[48px] shadow-2xl relative overflow-hidden group border border-black/5 dark:border-white/5 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700"></div>
            <AlertCircle size={32} className="text-red-500 mb-8 shadow-[0_0_15px_rgba(239,68,68,0.2)]" />
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">Critical Restock</h4>
            <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">12 <span className="text-sm font-bold opacity-30 tracking-normal">SKUs</span></p>
         </div>
         <div className="glass p-10 rounded-[48px] shadow-2xl relative overflow-hidden group border border-black/5 dark:border-white/5 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700"></div>
            <TrendingUp size={32} className="text-indigo-500 mb-8" />
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">Demand Index</h4>
            <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">4.2x</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Heatmap Section */}
        <div className="lg:col-span-8 glass p-12 rounded-[56px] shadow-2xl relative border border-black/5 dark:border-white/5 transition-all">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
              <div>
                 <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter transition-colors">Visual Matrix</h3>
                 <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1">Real-time Stock Health Bin Map</p>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                 <div className="relative group flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-500 transition-colors" size={18}/>
                    <input type="text" placeholder="Scan or Type Part No..." className="pl-12 pr-6 py-4 glass rounded-[24px] text-[10px] font-black outline-none uppercase tracking-widest border-none w-full md:w-64 focus:md:w-80 transition-all focus:bg-slate-100 dark:focus:bg-charcoal-900 shadow-sm transition-colors"/>
                 </div>
                 <button className="glass p-4 text-slate-400 dark:text-slate-600 hover:text-blue-500 dark:hover:text-blue-400 rounded-[20px] transition-all">
                    <Barcode size={24}/>
                 </button>
              </div>
           </div>

           <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-3.5">
              {Array.from({length: 96}).map((_, i) => {
                const colors = ['bg-emerald-500', 'bg-emerald-400', 'bg-amber-500', 'bg-red-600', 'bg-slate-200 dark:bg-charcoal-800'];
                const status = colors[Math.floor(Math.random() * colors.length)];
                return (
                  <div 
                    key={i} 
                    className={`aspect-square rounded-[12px] ${status} shadow-xl cursor-pointer hover:scale-[1.3] hover:z-30 transition-all duration-500 group relative ring-1 ring-white/5`}
                  >
                     <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 hidden group-hover:block z-40">
                        <div className="glass bg-white dark:bg-charcoal-950 p-5 rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.3)] w-48 ring-1 ring-black/5 dark:ring-white/10 animate-in fade-in zoom-in-95">
                           <p className="text-[8px] font-black uppercase tracking-[0.2em] mb-2 text-slate-500">BIN SLOT {Math.floor(i/12)+1}-{i%12}</p>
                           <p className="text-xs font-black text-slate-900 dark:text-white leading-tight">Clutch Disc Assembly-H</p>
                           <div className="mt-4 flex items-center justify-between border-t border-black/5 dark:border-white/5 pt-3">
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">In Stock</span>
                              <span className="text-xs font-black text-blue-500">142</span>
                           </div>
                        </div>
                     </div>
                  </div>
                );
              })}
           </div>

           <div className="mt-12 flex flex-wrap gap-10 pt-10 border-t border-black/5 dark:border-white/5 transition-all">
              {[
                { label: 'Healthy (80%+)', color: 'bg-emerald-500' },
                { label: 'Reorder (40%)', color: 'bg-amber-500' },
                { label: 'Critical (10%)', color: 'bg-red-600' },
                { label: 'Stock Out', color: 'bg-slate-200 dark:bg-charcoal-800' }
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3">
                   <div className={`w-3 h-3 rounded-full ${item.color} shadow-lg`}></div>
                   <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">{item.label}</span>
                </div>
              ))}
           </div>
        </div>

        {/* High Velocity Sidebar */}
        <div className="lg:col-span-4 space-y-8 flex flex-col">
           <div className="glass p-12 rounded-[56px] shadow-2xl relative overflow-hidden flex-1 border border-black/5 dark:border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent transition-all">
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter mb-10 flex items-center gap-3">
                 <Zap size={22} className="text-amber-500" /> Fast Movers
              </h3>
              
              <div className="space-y-6">
                 {MOCK_SPARES.map((part, i) => (
                   <div key={i} className="group relative glass p-6 rounded-[32px] hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border border-transparent hover:border-blue-600/20 bg-slate-50/50 dark:bg-charcoal-900/40">
                      <div className="flex justify-between items-start mb-6">
                         <div className="p-4 bg-blue-600/10 text-blue-600 rounded-[20px] group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                            <Layers size={22} />
                         </div>
                         <button 
                           onClick={() => handleIssue(part)}
                           className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white transition-all shadow-xl"
                         >
                            Issue
                         </button>
                      </div>
                      <h4 className="text-lg font-black text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{part.name}</h4>
                      <p className="text-[10px] font-black text-slate-400 mono uppercase tracking-widest mb-6">{part.partNo}</p>
                      
                      <div className="flex items-center justify-between p-4 bg-white dark:bg-charcoal-950/40 rounded-2xl border border-black/5 dark:border-white/5 transition-all">
                         <div>
                            <p className="text-[8px] font-black text-slate-400 uppercase mb-1 tracking-widest">SOH</p>
                            <p className="text-sm font-black text-slate-900 dark:text-white transition-colors">{part.onHand}</p>
                         </div>
                         <div className="text-right">
                            <p className="text-[8px] font-black text-slate-400 uppercase mb-1 tracking-widest">Velocity</p>
                            <p className="text-sm font-black text-emerald-500 flex items-center gap-1.5 justify-end">HIGH <TrendingUp size={12}/></p>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>

              <button className="w-full py-6 mt-12 glass text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all rounded-[28px] border border-black/5 dark:border-white/5">
                Optimize Inventory
              </button>
           </div>
        </div>
      </div>

      {/* Quick Issue Modal */}
      {showIssueModal && selectedPart && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xl">
           <div className="glass w-full max-w-md rounded-[48px] shadow-2xl p-10 relative animate-in fade-in zoom-in-95 duration-300">
              <button onClick={() => setShowIssueModal(false)} className="absolute top-8 right-8 text-slate-400 hover:text-white">
                 <X size={24}/>
              </button>
              
              <div className="flex items-center gap-4 mb-10">
                 <div className="p-4 bg-blue-600/10 text-blue-500 rounded-3xl">
                    <Package size={32}/>
                 </div>
                 <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">Issue Spare</h2>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{selectedPart.partNo}</p>
                 </div>
              </div>

              <div className="space-y-8">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Link to Job Card</label>
                    <div className="relative">
                       <Clipboard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
                       <select 
                         className="w-full bg-slate-100 dark:bg-charcoal-800 pl-12 pr-4 py-4 rounded-2xl outline-none text-slate-900 dark:text-white font-black appearance-none transition-all"
                         value={issueData.jobCardId}
                         onChange={e => setIssueData({...issueData, jobCardId: e.target.value})}
                       >
                          {MOCK_JOB_CARDS.map(jc => <option key={jc.id} value={jc.id}>{jc.id} ({jc.regNo})</option>)}
                       </select>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Quantity</label>
                       <div className="flex items-center glass rounded-2xl p-1">
                          <button onClick={() => setIssueData({...issueData, qty: Math.max(1, issueData.qty - 1)})} className="flex-1 py-3 text-slate-400 hover:text-blue-500 transition-colors">
                             <Plus className="rotate-45" size={20}/>
                          </button>
                          <span className="flex-1 text-center font-black text-slate-900 dark:text-white text-lg">{issueData.qty}</span>
                          <button onClick={() => setIssueData({...issueData, qty: Math.min(selectedPart.onHand, issueData.qty + 1)})} className="flex-1 py-3 text-slate-400 hover:text-blue-500 transition-colors">
                             <Plus size={20}/>
                          </button>
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">SOH (Post-Issue)</label>
                       <div className="py-4 px-6 bg-slate-50 dark:bg-charcoal-900/50 rounded-2xl text-center">
                          <span className="text-lg font-black text-emerald-500 transition-colors">{selectedPart.onHand - issueData.qty}</span>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="mt-12 flex gap-4">
                 <button onClick={() => setShowIssueModal(false)} className="flex-1 py-4 glass text-slate-500 font-black uppercase text-[10px] tracking-widest rounded-2xl">Abort</button>
                 <button onClick={() => { alert('Part issued successfully.'); setShowIssueModal(false); }} className="flex-[2] py-4 bg-blue-600 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-2xl shadow-blue-900/40 hover:scale-[1.02] transition-all">Confirm Issuance</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Spares;
