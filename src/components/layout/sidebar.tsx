import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  DollarSign, 
  Calendar, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { MinervaLogo } from './minerva-logo';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'os-list', label: 'Ordens de Serviço', icon: FileText },
  { id: 'clientes', label: 'Clientes', icon: Users },
  { id: 'financeiro', label: 'Financeiro', icon: DollarSign },
  { id: 'calendario', label: 'Calendário', icon: Calendar },
  { id: 'configuracoes', label: 'Configurações', icon: Settings },
];

export function Sidebar({ currentPage, onNavigate, collapsed, onToggleCollapse }: SidebarProps) {
  return (
    <div className={`minerva-sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Logo */}
      <div className="minerva-sidebar-logo">
        {!collapsed ? (
          <MinervaLogo variant="full" className="px-2" />
        ) : (
          <MinervaLogo variant="icon" />
        )}
      </div>

      {/* Menu Items */}
      <nav className="minerva-sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`minerva-sidebar-item ${isActive ? 'active' : ''}`}
            >
              <Icon className="minerva-sidebar-item-icon" />
              {!collapsed && <span className="minerva-sidebar-item-text">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Toggle Button */}
      <div className="minerva-sidebar-footer">
        <button
          onClick={onToggleCollapse}
          className={`minerva-button minerva-button-ghost w-full ${collapsed ? 'px-0' : ''}`}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="ml-2">Recolher</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
