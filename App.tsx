
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  Car, 
  ClipboardCheck, 
  Package, 
  Users, 
  Settings, 
  Bell,
  ChevronRight,
  ShieldCheck,
  Layout,
  Table as TableIcon,
  Sun,
  Moon
} from 'lucide-react';

import ControlTower from './views/ControlTower';
import HireTrust from './views/HireTrust';
import Movement from './views/Movement';
import Warranty from './views/Warranty';
import Spares from './views/Spares';
import People from './views/People';
import Admin from './views/Admin';

type ViewMode = 'visual' | 'excel';
const ViewContext = createContext<{ mode: ViewMode; setMode: (m: ViewMode) => void }>({ mode: 'visual', setMode: () => {} });
export const useViewMode = () => useContext(ViewContext);

const SidebarLink = ({ to, icon: Icon, label, active }: { to: string, icon: any, label: string, active: boolean }) => (
  <Link
    to={to}
    className={`group relative flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
      active 
        ? 'bg-brand text-white shadow-xl shadow-blue-500/30 dark:shadow-blue-900/40 translate-x-1' 
        : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-blue-400'
    }`}
  >
    <Icon size={18} className={active ? 'scale-110' : 'group-hover:scale-110 transition-transform duration-300'} />
    <span className={`font-bold text-sm tracking-tight ${active ? 'opacity-100' : 'opacity-80'}`}>{label}</span>
    {active && <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-white rounded-full" />}
  </Link>
);

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { mode, setMode } = useViewMode();
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-charcoal-950 transition-colors duration-500">
      {/* Sidebar */}
      <aside className="w-72 bg-white/80 dark:bg-charcoal-900 border-r border-slate-200/60 dark:border-white/5 flex flex-col fixed inset-y-0 z-50 transition-colors duration-500 backdrop-blur-md">
        <div className="p-8 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20">
              <ShieldCheck size={28} className="text-white" />
            </div>
            <div>
              <h2 className="font-black text-xl text-slate-900 dark:text-white tracking-tighter leading-none transition-colors">DealerTrust</h2>
              <span className="text-[10px] font-black text-blue-500 tracking-[0.2em] uppercase">OS Platform</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
          <div className="px-4 pb-4">
            <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">Modules</h3>
          </div>
          <SidebarLink to="/" icon={LayoutDashboard} label="Control Tower" active={location.pathname === '/'} />
          <SidebarLink to="/hire" icon={Search} label="Hire & Trust" active={location.pathname === '/hire'} />
          <SidebarLink to="/movement" icon={Car} label="Fleet Board" active={location.pathname === '/movement'} />
          <SidebarLink to="/warranty" icon={ClipboardCheck} label="Warranty Flow" active={location.pathname === '/warranty'} />
          <SidebarLink to="/spares" icon={Package} label="Spares Matrix" active={location.pathname === '/spares'} />
          <SidebarLink to="/people" icon={Users} label="People & Exit" active={location.pathname === '/people'} />
        </nav>

        <div className="p-6 border-t border-slate-200 dark:border-white/5 space-y-6">
          <div className="bg-slate-100 dark:bg-charcoal-800 p-1 rounded-2xl flex gap-1 border border-slate-200 dark:border-white/5 transition-colors duration-500">
            <button 
              onClick={() => setMode('visual')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all ${mode === 'visual' ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-sm dark:shadow-lg' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              <Layout size={14} /> Visual
            </button>
            <button 
              onClick={() => setMode('excel')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all ${mode === 'excel' ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-sm dark:shadow-lg' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              <TableIcon size={14} /> Excel
            </button>
          </div>
          <SidebarLink to="/admin" icon={Settings} label="Settings" active={location.pathname === '/admin'} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-12">
        <header className="flex justify-between items-start mb-12">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">
              <span>Bharath Hyundai Central</span>
              <ChevronRight size={12} className="opacity-50" />
              <span className="text-slate-500 dark:text-slate-400 transition-colors uppercase tracking-widest">
                {location.pathname === '/' ? 'OVERVIEW' : location.pathname.substring(1).toUpperCase()}
              </span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter transition-colors">
              {location.pathname === '/' && 'Control Tower'}
              {location.pathname === '/hire' && 'Hire & Trust'}
              {location.pathname === '/movement' && 'Fleet Board'}
              {location.pathname === '/warranty' && 'Warranty Flow'}
              {location.pathname === '/spares' && 'Spares Matrix'}
              {location.pathname === '/people' && 'People & Exit'}
              {location.pathname === '/admin' && 'Settings'}
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex bg-white dark:bg-charcoal-800 p-1.5 rounded-2xl border border-slate-200 dark:border-white/5 transition-all shadow-sm">
               <button 
                 onClick={() => setIsDarkMode(false)} 
                 className={`p-2.5 rounded-xl transition-all ${!isDarkMode ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-400'}`}
               >
                 <Sun size={18}/>
               </button>
               <button 
                 onClick={() => setIsDarkMode(true)}
                 className={`p-2.5 rounded-xl transition-all ${isDarkMode ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-400'}`}
               >
                 <Moon size={18}/>
               </button>
            </div>
            <button className="p-3.5 glass text-slate-400 hover:text-blue-500 relative rounded-2xl transition-all">
              <Bell size={20} />
              <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-white dark:border-charcoal-900"></span>
            </button>
            <div className="flex items-center gap-4 pl-6 border-l border-slate-200 dark:border-white/5">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-slate-900 dark:text-white transition-colors">Madan Gopal</p>
                <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Managing Director</p>
              </div>
              <div className="relative group cursor-pointer">
                <img src="https://picsum.photos/seed/md/64/64" className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white dark:ring-white/5 shadow-xl group-hover:ring-blue-500/50 transition-all" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-charcoal-950 rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
};

export default function App() {
  const [mode, setMode] = useState<ViewMode>('visual');

  return (
    <ViewContext.Provider value={{ mode, setMode }}>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/" element={<ControlTower />} />
            <Route path="/hire" element={<HireTrust />} />
            <Route path="/movement" element={<Movement />} />
            <Route path="/warranty" element={<Warranty />} />
            <Route path="/spares" element={<Spares />} />
            <Route path="/people" element={<People />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </AppLayout>
      </Router>
    </ViewContext.Provider>
  );
}
