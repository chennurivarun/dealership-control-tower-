
import React from 'react';
import { Settings, ShieldCheck, MapPin, Building2, Users, Database, Globe, Bell } from 'lucide-react';

const Admin: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Nav */}
        <div className="md:col-span-1 space-y-2">
          <h3 className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Configurations</h3>
          <button className="w-full text-left px-4 py-3 bg-blue-50 text-blue-600 rounded-xl font-bold flex items-center gap-3">
            <Building2 size={18} /> Dealer Group
          </button>
          <button className="w-full text-left px-4 py-3 text-slate-600 hover:bg-white rounded-xl font-medium flex items-center gap-3 transition-all">
            <MapPin size={18} /> Branches & Locations
          </button>
          <button className="w-full text-left px-4 py-3 text-slate-600 hover:bg-white rounded-xl font-medium flex items-center gap-3 transition-all">
            <ShieldCheck size={18} /> RBAC & Permissions
          </button>
          <button className="w-full text-left px-4 py-3 text-slate-600 hover:bg-white rounded-xl font-medium flex items-center gap-3 transition-all">
            <Database size={18} /> Data Retention (DPDP)
          </button>
          <button className="w-full text-left px-4 py-3 text-slate-600 hover:bg-white rounded-xl font-medium flex items-center gap-3 transition-all">
            <Globe size={18} /> Integrations (DMS/BGV)
          </button>
          <button className="w-full text-left px-4 py-3 text-slate-600 hover:bg-white rounded-xl font-medium flex items-center gap-3 transition-all">
            <Bell size={18} /> Notification Logic
          </button>
        </div>

        {/* Right Content */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Dealer Group Profile</h2>
                <p className="text-slate-500 text-sm">Main workspace configuration for Bharath Hyundai Group.</p>
              </div>
              <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold">Save Changes</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">Tenant Name</label>
                <input type="text" defaultValue="Bharath Hyundai Group" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">GSTIN</label>
                <input type="text" defaultValue="29AAAAA0000A1Z5" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">Corporate Email</label>
                <input type="email" defaultValue="admin@bharathhyundai.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">OEM Partnership</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none">
                  <option>Hyundai Motor India</option>
                  <option>Maruti Suzuki</option>
                  <option>Tata Motors</option>
                </select>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100">
              <h4 className="text-sm font-bold text-slate-900 mb-4">Security Policy</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div>
                    <p className="text-sm font-bold text-slate-900">Force Aadhaar Offline Verification</p>
                    <p className="text-xs text-slate-500">Require e-KYC XML for all new showroom hires.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-10 h-6 rounded-full accent-blue-600" />
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div>
                    <p className="text-sm font-bold text-slate-900">Evidence Requirement</p>
                    <p className="text-xs text-slate-500">Enable mandatory document upload for severe reviews.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-10 h-6 rounded-full accent-blue-600" />
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div>
                    <p className="text-sm font-bold text-slate-900">Right-to-Reply Notification</p>
                    <p className="text-xs text-slate-500">Auto-send SMS/Email to employee upon exit review publication.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-10 h-6 rounded-full accent-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
