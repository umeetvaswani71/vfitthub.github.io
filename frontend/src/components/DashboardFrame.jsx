import { useState } from "react";
import { LogOut, Table } from "lucide-react";
import "./DashboardFrame.css";

export default function DashboardFrame({ user, title, onLogout, children, menuOptions, activeView, setActiveView }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <span className="eyebrow">{user.role}</span>
          <h1>{title}</h1>
        </div>
        <div className="topbar-actions">
          <div className="menu-dropdown">
            <button className="menu-button" onClick={() => setMenuOpen((open) => !open)}>
              Menu <Table size={18} />
            </button>
            {menuOpen && (
              <div className="menu-panel">
                {menuOptions.map((option) => (
                  <button
                    key={option.id}
                    className={activeView === option.id ? "dropdown-item active" : "dropdown-item"}
                    onClick={() => {
                      setActiveView(option.id);
                      setMenuOpen(false);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="icon-button" onClick={onLogout} title="Logout">
            <LogOut size={20} />
          </button>
        </div>
      </header>
      {children}
    </main>
  );
}
