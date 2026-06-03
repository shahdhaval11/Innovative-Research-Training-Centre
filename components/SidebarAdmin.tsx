
// import { NAV_ITEMS } from "@/modules/admin/dashboard/constData/const";
// import Link from "next/link";

// // ─── Types ────────────────────────────────────────────────────────────────────
// interface AdminUser {
//   id: string; name: string; email: string; role: string; avatar: string;
// }

// // ─── Sidebar ──────────────────────────────────────────────────────────────────
// function SidebarAdmin({
//   user, collapsed, onToggle, onLogout,
// }: {
//   user: AdminUser; collapsed: boolean; onToggle: () => void; onLogout: () => void;
// }) {
//   return (
//     <aside
//       className={`flex flex-col bg-[#1e293b] border-r border-slate-700/50 h-full transition-all duration-300 ${
//         collapsed ? "w-16" : "w-60"
//       }`}
//     >
//       {/* Logo */}
//       <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-700/50">
//         <div className="w-9 h-9 rounded-xl bg-[#6366f1] flex items-center justify-center font-black text-white text-sm shrink-0">
//           NR
//         </div>
//         {!collapsed && (
//           <div className="leading-tight overflow-hidden">
//             <p className="text-white font-bold text-xs tracking-wide truncate">IRTC Admin</p>
//             <p className="text-[#818cf8] text-[10px] tracking-widest uppercase truncate">Control Panel</p>
//           </div>
//         )}
//       </div>

//       {/* Nav */}
//       <nav className="flex-1 py-4 flex flex-col gap-1 px-2 overflow-y-auto">
//         {NAV_ITEMS.map((item) => (
//           <Link
//             key={item.label}
//             href={item.link}
//             className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group ${
//               item.active
//                 ? "bg-[#6366f1] text-white"
//                 : "text-slate-400 hover:bg-slate-700/50 hover:text-white"
//             }`}
//           >
//             <span className="text-base shrink-0">{item.icon}</span>
//             {!collapsed && (
//               <span className="text-sm font-medium truncate">{item.label}</span>
//             )}
//             {!collapsed && item.active && (
//               <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
//             )}
//           </Link>
//         ))}
//       </nav>

//       {/* User + collapse */}
//       <div className="border-t border-slate-700/50 p-3 flex flex-col gap-2">
//         {/* User card */}
//         <div className={`flex items-center gap-3 bg-slate-700/30 rounded-xl p-2.5 ${collapsed ? "justify-center" : ""}`}>
//           <div className="w-8 h-8 rounded-lg bg-[#6366f1] flex items-center justify-center font-black text-white text-xs shrink-0">
//             {user.avatar}
//           </div>
//           {!collapsed && (
//             <div className="flex-1 overflow-hidden">
//               <p className="text-white text-xs font-bold truncate">{user.name}</p>
//               <p className="text-slate-400 text-[10px] capitalize truncate">{user.role}</p>
//             </div>
//           )}
//         </div>

//         {/* Collapse toggle */}
//         <button
//           onClick={onToggle}
//           className="flex items-center justify-center gap-2 text-slate-500 hover:text-white text-xs py-1.5 rounded-xl hover:bg-slate-700/30 transition-all"
//         >
//           <span>{collapsed ? "→" : "←"}</span>
//           {!collapsed && <span>Collapse</span>}
//         </button>

//         {/* Logout */}
//         <button
//           onClick={onLogout}
//           className="flex items-center justify-center gap-2 text-red-400 hover:text-red-300 text-xs py-1.5 rounded-xl hover:bg-red-500/10 transition-all"
//         >
//           <span>🚪</span>
//           {!collapsed && <span>Sign Out</span>}
//         </button>
//       </div>
//     </aside>
//   );
// }

// export default SidebarAdmin;

"use client";

import { usePathname, useRouter } from "next/navigation";
import { NAV_ITEMS } from "@/modules/admin/dashboard/constData/const";

// ─── Types ────────────────────────────────────────────────────────────────────
interface AdminUser {
  id: string; name: string; email: string; role: string; avatar: string;
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function SidebarAdmin({
  user, collapsed, onToggle, onLogout,
}: {
  user: AdminUser; collapsed: boolean; onToggle: () => void; onLogout: () => void;
}) {
  const pathname = usePathname();
  const router   = useRouter();

  // Active detection — exact match for dashboard, startsWith for all others
  const isActive = (link: string): boolean => {
    if (link === "/admin/dashboard") return pathname === "/admin/dashboard";
    return pathname.startsWith(link);
  };

  return (
    <aside
      className={`flex flex-col bg-[#1e293b] border-r border-slate-700/50 h-full transition-all duration-300 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-700/50">
        {collapsed ? (
          <img
            src="/nanonovaLogo.png"
            alt="Nanonova"
            className="h-8 w-8 object-contain brightness-0 invert shrink-0"
          />
        ) : (
          <>
            <img
              src="/nanonovaLogo.png"
              alt="Nanonova Research and Training Center"
              className="h-10 w-auto object-contain brightness-0 invert shrink-0"
            />
            <div className="leading-tight overflow-hidden">
              <p className="text-white font-bold text-xs tracking-wide truncate">IRTC Admin</p>
              <p className="text-[#818cf8] text-[10px] tracking-widest uppercase truncate">Control Panel</p>
            </div>
          </>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 flex flex-col gap-1 px-2 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.link);
          return (
            <button
              key={item.label}
              onClick={() => router.push(item.link)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 w-full group ${
                active
                  ? "bg-[#6366f1] text-white"
                  : "text-slate-400 hover:bg-slate-700/50 hover:text-white"
              }`}
            >
              <span className="text-base shrink-0">{item.icon}</span>
              {!collapsed && (
                <span className="text-sm font-medium truncate">{item.label}</span>
              )}
              {!collapsed && active && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
              )}
            </button>
          );
        })}
      </nav>

      {/* User + collapse */}
      <div className="border-t border-slate-700/50 p-3 flex flex-col gap-2">
        {/* User card */}
        <div className={`flex items-center gap-3 bg-slate-700/30 rounded-xl p-2.5 ${collapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-lg bg-[#6366f1] flex items-center justify-center font-black text-white text-xs shrink-0">
            {user.avatar}
          </div>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="text-white text-xs font-bold truncate">{user.name}</p>
              <p className="text-slate-400 text-[10px] capitalize truncate">{user.role}</p>
            </div>
          )}
        </div>

        {/* Collapse toggle */}
        <button
          onClick={onToggle}
          className="flex items-center justify-center gap-2 text-slate-500 hover:text-white text-xs py-1.5 rounded-xl hover:bg-slate-700/30 transition-all"
        >
          <span>{collapsed ? "→" : "←"}</span>
          {!collapsed && <span>Collapse</span>}
        </button>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="flex items-center justify-center gap-2 text-red-400 hover:text-red-300 text-xs py-1.5 rounded-xl hover:bg-red-500/10 transition-all"
        >
          <span>🚪</span>
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}

export default SidebarAdmin;