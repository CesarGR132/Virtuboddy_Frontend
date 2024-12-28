import { Home, Calendar, FileText, Mic, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Calendar, label: "Calendar", href: "/calendar" },
    { icon: FileText, label: "Summarize", href: "/summarize" },
    { icon: Mic, label: "Voice to Text", href: "/voice" },
  ];

  const handleLogout = () => {
    // Add logout logic here
    navigate("/");
  };

  return (
    <div
      className={cn(
        "relative flex flex-col h-screen bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="p-4 flex justify-between items-center border-b">
        {!collapsed && (
          <span className="text-xl font-semibold text-primary">Dashboard</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto hover:bg-accent/50"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors"
          >
            <item.icon className="h-5 w-5" />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-2 border-t">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}