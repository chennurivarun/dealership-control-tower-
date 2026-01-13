
import React from 'react';
import { TrendingUp, AlertCircle, Clock, CheckCircle2, ChevronRight, ShieldCheck, Zap, Car, Activity, UserPlus } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
import { useViewMode } from '../App';

const data = [
  { name: 'Mon', movements: 24, revenue: 12 },
  { name: 'Tue', movements: 30, revenue: 18 },
  { name: 'Wed', movements: 45, revenue: 8 },
  { name: 'Thu', movements: 22, revenue: 22 },
  { name: 'Fri', movements: 35, revenue: 14 },
  { name: 'Sat', movements: 55, revenue: 28 },
  { name: 'Sun', movements: 40, revenue: 10 },
];

const StatCard = ({ title, value, sub, icon: Icon, colorClass, borderClass }: any) => (
  <div className={`glass p-10 rounded-[48px] relative overflow-hidden group shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-black/5 dark:border-white/5`}>
    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 opacity-10 group-hover:scale-150 transition-transform duration-1000 ${colorClass}`}></div>
    <div className="flex justify-between items-start mb-8">
      <div className={`p-4 rounded-[20px] ${colorClass} text-white shadow-2xl shadow-current/20 group-hover:scale-110 transition-transform`}>
        <Icon size={28} />
      </div>
      <div className="flex flex-col items-end">
        <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20 shadow-lg shadow-emerald-500/5">+12.5%</span>
      </div>
    </div>
    <h3 className="text-slate-500 text-[11px] font-black uppercase tracking-[0.2em] mb-2">{title}</h3>
    <div className="flex items-baseline gap-2">
      <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter transition-colors">{value}</span>
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{sub}</span>
    </div>
  </div>
);

const ControlTower: React.FC = () => {
  const { mode } = useViewMode();
  const [activeChart, setActiveChart] = React.useState<'Volume' | 'Revenue'>('Volume');

  const navigateTo = (hash: string) => {
    window.location.hash = hash;
  };

  if (mode === 'excel') {
    return (
      <div className="glass rounded-[32px] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-black/5 dark:border-white/5 bg-slate-50 dark:bg-charcoal-900/50 flex justify-between items-center transition-colors">
          <h3 className="font-black text-slate-400 uppercase tracking-[0.2em] text-xs">Executive Snapshot</h3>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-blue-600/10 text-blue-500 text-[10px] font-black rounded-lg">LIVE SYNC</span>
          </div>
        </div>
        <table className="w-full excel-table">
          <thead>
            <tr className="bg-slate-100 dark:bg-charcoal-800 transition-colors">
              <th>Performance Metric</th>
              <th>Current Status</th>
              <th>Target Threshold</th>
              <th>System Variance</th>
              <th>Operational Health</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/5">
            <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <td className="font-bold text-slate-900 dark:text-white">Fleet Utilization Index</td>
              <td className="mono text-slate-600 dark:text-slate-400">18 Active Cars</td>
              <td className="mono text-slate-600 dark:text-slate-400">20</td>
              <td className="text-red-500 font-black">-10.0%</td>
              <td><span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-md">OPTIMAL</span></td>
            </tr>
            <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <td className="font-bold text-slate-900 dark:text-white">ID Verification Queue</td>
              <td className="mono text-slate-600 dark:text-slate-400">04 Pending</td>
              <td className="mono text-slate-600 dark:text-slate-400">0</td>
              <td className="text-amber-500 font-black">+4.0</td>
              <td><span className="text-[10px] font-black text-amber-500 bg-amber-500/10 px-3 py-1 rounded-md">MONITORING</span></td>
            </tr>
            <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <td className="font-bold text-slate-900 dark:text-white">Warranty Aging (SLA &gt; 1d)</td>
              <td className="mono text-slate-600 dark:text-slate-400">26 Open JCs</td>
              <td className="mono text-slate-600 dark:text-slate-400">10</td>
              <td className="text-red-500 font-black">+160.0%</td>
              <td><span className="text-[10px] font-black text-red-500 bg-red-500/10 px-3 py-1 rounded-md">CRITICAL</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      {/* Executive KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div onClick={() => navigateTo('#/movement')} className="cursor-pointer">
          <StatCard title="Active Fleet" value="18" sub="Movement" icon={Car} colorClass="bg-blue-600" />
        </div>
        <div onClick={() => navigateTo('#/hire')} className="cursor-pointer">
          <StatCard title="BGV Pipeline" value="04" sub="Onboarding" icon={ShieldCheck} colorClass="bg-indigo-700" />
        </div>
        <div onClick={() => navigateTo('#/warranty')} className="cursor-pointer">
          <StatCard title="Stalled JCs" value="26" sub="Warranty" icon={Clock} colorClass="bg-amber-600" />
        </div>
        <div onClick={() => navigateTo('#/warranty')} className="cursor-pointer">
          <StatCard title="Claim Pipe" value="₹12.4L" sub="Expected" icon={TrendingUp} colorClass="bg-emerald-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Performance Visualization */}
        <div className="lg:col-span-8 glass p-12 rounded-[56px] shadow-2xl relative overflow-hidden transition-all border border-black/5 dark:border-white/5">
          <div className="flex justify-between items-center mb-12 relative z-10">
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter transition-colors">Velocity Performance</h3>
              <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1">Movement vs Yield Trends</p>
            </div>
            <div className="flex bg-slate-100 dark:bg-charcoal-900/50 p-1.5 rounded-2xl border border-black/5 dark:border-white/5 transition-colors">
              <button
                onClick={() => setActiveChart('Volume')}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all ${activeChart === 'Volume' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Volume
              </button>
              <button
                onClick={() => setActiveChart('Revenue')}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all ${activeChart === 'Revenue' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Revenue
              </button>
            </div>
          </div>
          <div className="h-96 relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.03)" className="dark:stroke-white/5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 11, fontWeight: '800' }} dy={20} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 11, fontWeight: '800' }} />
                <Tooltip
                  cursor={{ stroke: '#3b82f6', strokeWidth: 2 }}
                  contentStyle={{ borderRadius: '24px', border: '1px solid rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: '#0f172a', fontSize: '12px', fontWeight: '900' }}
                />
                <Area type="monotone" dataKey={activeChart === 'Volume' ? 'movements' : 'revenue'} stroke="#3b82f6" strokeWidth={5} fillOpacity={1} fill="url(#chartGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Priority Escalations Panel */}
        <div className="lg:col-span-4 space-y-8 flex flex-col">
          <div className="flex-1 glass p-10 rounded-[56px] shadow-2xl relative border border-black/5 dark:border-white/5 transition-all bg-white dark:bg-charcoal-900/40">
            <div className="absolute top-0 right-0 w-2.5 h-full bg-red-600/30 blur-[2px]"></div>
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">Priority Log</h3>
              <span className="text-[10px] font-black bg-red-600 text-white px-3 py-1.5 rounded-full pulse-alert shadow-lg shadow-red-900/50">3 CRITICAL</span>
            </div>

            <div className="space-y-8">
              {[
                { title: 'Overdue Fleet', sub: 'KA03NB (Rahul S) +15m', icon: Car, color: 'text-red-500', bg: 'bg-red-500/10', link: '#/movement' },
                { title: 'Spares Hazard', sub: 'Brake Pads @ critical 5%', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10', link: '#/spares' },
                { title: 'Identity Confirmed', sub: 'Aman Jha BGV Ready', icon: ShieldCheck, color: 'text-blue-500', bg: 'bg-blue-400/10', link: '#/hire' }
              ].map((item, i) => (
                <div key={i} onClick={() => navigateTo(item.link)} className="group flex gap-6 p-5 rounded-[32px] hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-500 cursor-pointer border border-transparent shadow-sm">
                  <div className={`${item.bg} ${item.color} p-4 rounded-2xl h-fit group-hover:scale-110 transition-transform duration-500 ring-1 ring-black/5 dark:ring-white/5`}>
                    <item.icon size={26} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.title}</p>
                    <p className="text-[11px] font-bold text-slate-500 tracking-tight truncate">{item.sub}</p>
                  </div>
                  <ChevronRight size={18} className="text-slate-300 dark:text-slate-700 mt-2 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>

            <button className="w-full py-6 mt-12 glass text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all rounded-[28px] border border-black/5 dark:border-white/5">
              Executive Command Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlTower;
