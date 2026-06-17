import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export function AdminLayout() {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-8 text-center">Loading Admin...</div>;

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col gap-6 overflow-y-auto">
        <h1 className="text-xl font-bold font-display tracking-tight text-white/90">Oneroof Admin</h1>
        <nav className="flex flex-col gap-1.5">
          <Link to="/admin" className="px-3 py-1.5 rounded hover:bg-slate-800 transition text-sm font-semibold">Dashboard</Link>
          
          <div className="text-xs uppercase font-extrabold text-slate-500 mt-4 px-3 tracking-wider">Pages</div>
          <Link to="/admin/pages/home" className="px-3 py-1 text-xs font-medium rounded hover:bg-slate-800 transition text-slate-300">Home Page</Link>
          <Link to="/admin/pages/about" className="px-3 py-1 text-xs font-medium rounded hover:bg-slate-800 transition text-slate-300">About Page</Link>
          <Link to="/admin/pages/contact" className="px-3 py-1 text-xs font-medium rounded hover:bg-slate-800 transition text-slate-300">Contact Page</Link>
          
          <div className="text-xs uppercase font-extrabold text-slate-500 mt-4 px-3 tracking-wider">Systems & Products</div>
          <Link to="/admin/collections/services/edit/residential-solar-system" className="px-3 py-1 text-xs font-medium rounded hover:bg-slate-800 transition text-slate-300">Residential Solar Systems</Link>
          <Link to="/admin/collections/services/edit/commercial-solar-system" className="px-3 py-1 text-xs font-medium rounded hover:bg-slate-800 transition text-slate-300">Commercial Solar Systems</Link>
          <Link to="/admin/collections/services/edit/ev-chargers" className="px-3 py-1 text-xs font-medium rounded hover:bg-slate-800 transition text-slate-300">EV Chargers</Link>
          <Link to="/admin/collections/services/edit/solar-inverters" className="px-3 py-1 text-xs font-medium rounded hover:bg-slate-800 transition text-slate-300">Solar Inverters</Link>
          <Link to="/admin/collections/services/edit/solar-panel" className="px-3 py-1 text-xs font-medium rounded hover:bg-slate-800 transition text-slate-300">Solar Panels</Link>
          <Link to="/admin/collections/services/edit/battery-storage" className="px-3 py-1 text-xs font-medium rounded hover:bg-slate-800 transition text-slate-300">Battery Storage Solutions</Link>
          
          <div className="text-xs uppercase font-extrabold text-slate-500 mt-4 px-3 tracking-wider">Services</div>
          <Link to="/admin/collections/services/edit/solar-panel-installation" className="px-3 py-1 text-xs font-medium rounded hover:bg-slate-800 transition text-slate-300">Solar Panel Installation</Link>
          <Link to="/admin/collections/services/edit/solar-inverter-installation" className="px-3 py-1 text-xs font-medium rounded hover:bg-slate-800 transition text-slate-300">Solar Inverter Installation</Link>
          <Link to="/admin/collections/services/edit/solar-battery-installation" className="px-3 py-1 text-xs font-medium rounded hover:bg-slate-800 transition text-slate-300">Solar Battery Installation</Link>
          <Link to="/admin/collections/services/edit/repairs-and-maintenance" className="px-3 py-1 text-xs font-medium rounded hover:bg-slate-800 transition text-slate-300">Repairs & Maintenance</Link>

          <div className="border-t border-slate-800 mt-4 pt-4">
            <Link to="/admin/collections/services" className="px-3 py-1 text-xs font-semibold text-slate-400 hover:text-white block">View All Raw Collection Docs</Link>
          </div>
        </nav>
        <div className="mt-auto pt-4">
          <Link to="/" className="text-sm text-slate-400 hover:text-white">← Back to Site</Link>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
