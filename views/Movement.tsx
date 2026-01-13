
import React, { useState, useEffect } from 'react';
import { Car, Clock, Navigation, CheckCircle, MoreVertical, Plus, Filter, AlertTriangle, ChevronRight, MapPin, Gauge, X } from 'lucide-react';
import { MOCK_MOVEMENTS } from '../services/mockData';
import { MovementTimer, MovementStatus, MovementType } from '../types';
import { useViewMode } from '../App';

const ProgressCircle = ({ value, max, color }: { value: number, max: number, color: string }) => {
  const radius = 28;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (Math.min(Math.max(value, 0), max) / max) * circ;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-16 h-16 -rotate-90">
        <circle cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="5" fill="transparent" className="text-slate-100 dark:text-white/5 transition-colors" />
        <circle cx="32" cy="32" r={radius} stroke={color} strokeWidth="5" fill="transparent" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-1000" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
         <span className="text-lg font-black text-slate-900 dark:text-white leading-none transition-colors">{Math.abs(value)}</span>
         <span className="text-[7px] font-black text-slate-500 uppercase">Min</span>
      </div>
    </div>
  );
};

const VehicleCard: React.FC<{ movement: MovementTimer; onReturn: (id: string) => void }> = ({ movement, onReturn }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const calc = () => {
      const elap = Math.floor((Date.now() - movement.startTime) / 60000);
      setTimeLeft(movement.durationMinutes - elap);
    };
    calc();
    const t = setInterval(calc, 10000);
    return () => clearInterval(t);
  }, [movement]);

  const isOverdue = timeLeft < 0;
  const statusColor = isOverdue ? '#ef4444' : (timeLeft < 10 ? '#f59e0b' : '#3b82f6');
  const ribbonColor = isOverdue ? 'bg-red-600' : (timeLeft < 10 ? 'bg-amber-600' : 'bg-blue-600');

  return (
    <div className={`relative glass p-6 rounded-[32px] shadow-2xl transition-all duration-500 group premium-card-hover hover:scale-[1.03] hover:-translate-y-2 border border-black/5 dark:border-white/5 ${isOverdue ? 'pulse-alert ring-2 ring-red-500/20 shadow-red-900/10' : ''}`}>
      <div className={`status-ribbon ${ribbonColor} shadow-[0_0_20px_rgba(59,130,246,0.2)] rounded-l-full`}></div>
      
      <div className="flex justify-between items-start mb-8 pl-2">
        <div>
          <div className="flex items-center gap-2 mb-2">
             <span className="text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 rounded-lg transition-colors">
                {movement.type}
             </span>
             {isOverdue && <span className="text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 bg-red-600/10 text-red-600 dark:text-red-400 rounded-lg">CRITICAL</span>}
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter transition-colors">{movement.regNo}</h3>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{movement.model}</p>
        </div>
        <ProgressCircle value={timeLeft} max={movement.durationMinutes} color={statusColor} />
      </div>

      <div className="flex items-center gap-4 mb-8 p-3.5 bg-slate-50 dark:bg-charcoal-950/40 rounded-3xl border border-black/5 dark:border-white/5 shadow-inner group-hover:bg-slate-100 dark:group-hover:bg-charcoal-900 transition-colors">
        <div className="relative">
          <img src={`https://picsum.photos/seed/${movement.staffName}/48/48`} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white/5" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 border-2 border-white dark:border-charcoal-950 rounded-full"></div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-black text-slate-900 dark:text-white truncate transition-colors">{movement.staffName}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
             <CheckCircle size={10} className="text-emerald-500" />
             <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Gate Confirmed</span>
          </div>
        </div>
        <Navigation size={18} className="text-slate-400 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors" />
      </div>

      <div className="flex gap-3">
        <button 
          onClick={() => onReturn(movement.id)}
          className="flex-[2] bg-slate-900 dark:bg-white text-white dark:text-charcoal-950 py-4 rounded-[20px] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          Check-In
        </button>
        <button className="flex-1 glass text-slate-400 dark:text-slate-500 py-4 rounded-[20px] hover:text-slate-900 dark:hover:text-white transition-all flex items-center justify-center">
          <MoreVertical size={20}/>
        </button>
      </div>
    </div>
  );
};

const Movement: React.FC = () => {
  const { mode } = useViewMode();
  const [movements, setMovements] = useState(MOCK_MOVEMENTS);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [newMove, setNewMove] = useState({
    regNo: '',
    model: '',
    type: MovementType.TEST_DRIVE,
    staffName: 'Rahul Sharma',
    duration: 30
  });

  const handleCreateMove = () => {
    if (!newMove.regNo || !newMove.model) return;
    const movement: MovementTimer = {
      id: `mov-${Date.now()}`,
      regNo: newMove.regNo,
      model: newMove.model,
      type: newMove.type,
      staffName: newMove.staffName,
      startTime: Date.now(),
      durationMinutes: newMove.duration,
      status: MovementStatus.ACTIVE,
      escortedLevel: 1
    };
    setMovements([movement, ...movements]);
    setShowMoveModal(false);
    setNewMove({ regNo: '', model: '', type: MovementType.TEST_DRIVE, staffName: 'Rahul Sharma', duration: 30 });
  };

  if (mode === 'excel') {
    return (
      <div className="glass rounded-[32px] overflow-hidden shadow-2xl">
        <table className="w-full excel-table">
          <thead className="bg-slate-100 dark:bg-charcoal-800 transition-colors">
            <tr>
              <th>Reg No</th>
              <th>Vehicle Model</th>
              <th>Movement Type</th>
              <th>Staff Responsible</th>
              <th>Started At</th>
              <th>SLA Target</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/5">
            {movements.map(m => (
              <tr key={m.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <td className="font-black text-slate-900 dark:text-white">{m.regNo}</td>
                <td className="text-slate-500 dark:text-slate-400 font-bold">{m.model}</td>
                <td><span className="text-[10px] font-black px-2 py-1 bg-slate-100 dark:bg-white/5 rounded-md uppercase tracking-widest text-slate-600 dark:text-slate-400">{m.type}</span></td>
                <td className="font-bold text-slate-700 dark:text-slate-200">{m.staffName}</td>
                <td className="mono text-slate-400 dark:text-slate-500">{new Date(m.startTime).toLocaleTimeString()}</td>
                <td className="mono text-slate-600 dark:text-slate-400">{m.durationMinutes}m</td>
                <td className="text-blue-600 dark:text-blue-500 font-black cursor-pointer uppercase text-[10px] tracking-widest" onClick={() => setMovements(prev => prev.filter(x => x.id !== m.id))}>CHECK-IN</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
        <div className="glass p-2 rounded-[24px] flex gap-2 shadow-2xl transition-all">
           <button className="px-8 py-3 bg-white dark:bg-white text-slate-900 rounded-[18px] font-black text-xs uppercase tracking-widest shadow-xl transition-all">Showroom Fleet</button>
           <button className="px-8 py-3 text-slate-500 dark:text-slate-500 font-bold text-xs uppercase tracking-widest hover:text-slate-900 dark:hover:text-slate-300 transition-all">Service Yard</button>
           <button className="px-8 py-3 text-slate-500 dark:text-slate-500 font-bold text-xs uppercase tracking-widest hover:text-slate-900 dark:hover:text-slate-300 transition-all">Stockyard</button>
        </div>
        
        <div className="flex gap-4">
          <button className="glass p-4 text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 hover:scale-110 transition-all shadow-sm">
            <Filter size={24} />
          </button>
          <button 
            onClick={() => setShowMoveModal(true)}
            className="bg-blue-600 text-white px-10 py-4 rounded-[24px] font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-blue-900/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
          >
            <Plus size={24} />
            Move Vehicle
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* ACTIVE LANE */}
        <div className="space-y-8">
          <div className="flex items-center justify-between px-6">
             <div className="flex items-center gap-3">
               <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
               <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">Fleet Active</h3>
             </div>
             <span className="glass px-3 py-1 rounded-full text-[10px] font-bold text-slate-500 dark:text-slate-400">{movements.filter(m => (m.durationMinutes - Math.floor((Date.now() - m.startTime) / 60000)) >= 10).length}</span>
          </div>
          <div className="space-y-8">
            {movements.filter(m => (m.durationMinutes - Math.floor((Date.now() - m.startTime) / 60000)) >= 10).map(m => (
              <VehicleCard key={m.id} movement={m} onReturn={(id) => setMovements(prev => prev.filter(x => x.id !== id))} />
            ))}
          </div>
        </div>

        {/* DUE SOON LANE */}
        <div className="space-y-8">
          <div className="flex items-center justify-between px-6">
             <div className="flex items-center gap-3">
               <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>
               <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">Returning Soon</h3>
             </div>
             <span className="glass px-3 py-1 rounded-full text-[10px] font-bold text-slate-500 dark:text-slate-400">{movements.filter(m => {
               const l = m.durationMinutes - Math.floor((Date.now() - m.startTime) / 60000);
               return l >= 0 && l < 10;
             }).length}</span>
          </div>
          <div className="space-y-8">
            {movements.filter(m => {
              const l = m.durationMinutes - Math.floor((Date.now() - m.startTime) / 60000);
              return l >= 0 && l < 10;
            }).map(m => (
              <VehicleCard key={m.id} movement={m} onReturn={(id) => setMovements(prev => prev.filter(x => x.id !== id))} />
            ))}
          </div>
        </div>

        {/* OVERDUE LANE */}
        <div className="space-y-8">
          <div className="flex items-center justify-between px-6">
             <div className="flex items-center gap-3">
               <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse"></div>
               <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">Critical Escalations</h3>
             </div>
             <span className="glass px-3 py-1 rounded-full text-[10px] font-bold text-slate-500 dark:text-slate-400">{movements.filter(m => (m.durationMinutes - Math.floor((Date.now() - m.startTime) / 60000)) < 0).length}</span>
          </div>
          <div className="space-y-8">
            {movements.filter(m => (m.durationMinutes - Math.floor((Date.now() - m.startTime) / 60000)) < 0).map(m => (
              <VehicleCard key={m.id} movement={m} onReturn={(id) => setMovements(prev => prev.filter(x => x.id !== id))} />
            ))}
            {movements.filter(m => (m.durationMinutes - Math.floor((Date.now() - m.startTime) / 60000)) < 0).length === 0 && (
              <div className="glass p-20 rounded-[48px] border-dashed border-2 border-black/5 dark:border-white/5 flex flex-col items-center justify-center opacity-30">
                 <CheckCircle size={48} className="mb-4 text-emerald-500" />
                 <p className="text-xs font-black text-slate-700 dark:text-white uppercase tracking-[0.2em]">Zero Critical Violations</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Initiation Modal */}
      {showMoveModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
           <div className="glass w-full max-w-lg rounded-[48px] shadow-2xl p-10 relative animate-in fade-in zoom-in-95 duration-300">
              <button onClick={() => setShowMoveModal(false)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 dark:hover:text-white">
                 <X size={24}/>
              </button>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-8">Move Vehicle</h2>
              
              <div className="space-y-6">
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Registration No</label>
                    <input 
                      type="text" 
                      placeholder="e.g. KA01MH1234" 
                      className="w-full bg-slate-100 dark:bg-charcoal-800 p-4 rounded-2xl outline-none text-slate-900 dark:text-white font-black uppercase tracking-widest transition-colors"
                      value={newMove.regNo}
                      onChange={e => setNewMove({...newMove, regNo: e.target.value})}
                    />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Vehicle Model</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Creta N-Line" 
                      className="w-full bg-slate-100 dark:bg-charcoal-800 p-4 rounded-2xl outline-none text-slate-900 dark:text-white font-bold transition-colors"
                      value={newMove.model}
                      onChange={e => setNewMove({...newMove, model: e.target.value})}
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Type</label>
                      <select 
                        className="w-full bg-slate-100 dark:bg-charcoal-800 p-4 rounded-2xl outline-none text-slate-900 dark:text-white font-bold appearance-none transition-colors"
                        value={newMove.type}
                        onChange={e => setNewMove({...newMove, type: e.target.value as MovementType})}
                      >
                         {Object.values(MovementType).map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Staff</label>
                      <input 
                        type="text" 
                        className="w-full bg-slate-100 dark:bg-charcoal-800 p-4 rounded-2xl outline-none text-slate-900 dark:text-white font-bold transition-colors"
                        value={newMove.staffName}
                        readOnly
                      />
                    </div>
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Duration (Minutes)</label>
                    <div className="flex gap-2">
                       {[15, 30, 45, 60].map(m => (
                         <button 
                           key={m}
                           onClick={() => setNewMove({...newMove, duration: m})}
                           className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase transition-all ${newMove.duration === m ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/40' : 'bg-slate-100 dark:bg-charcoal-800 text-slate-500 dark:text-slate-400 hover:text-blue-500'}`}
                         >
                           {m} Min
                         </button>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="mt-12 flex gap-4">
                 <button onClick={() => setShowMoveModal(false)} className="flex-1 py-4 glass text-slate-500 font-black uppercase text-[10px] tracking-widest rounded-2xl">Cancel</button>
                 <button onClick={handleCreateMove} className="flex-[2] py-4 bg-blue-600 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-2xl shadow-blue-900/40 hover:scale-[1.02] active:scale-95 transition-all">Generate Gate Pass</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Movement;
