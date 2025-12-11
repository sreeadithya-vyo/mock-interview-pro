import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Plus,
  History,
  BarChart3,
  Settings,
  HelpCircle,
  CreditCard,
  User,
  Video,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const mainNavItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/new-mock", icon: Plus, label: "New Mock" },
  { href: "/history", icon: History, label: "History" },
  { href: "/compare", icon: BarChart3, label: "Compare" },
];

const settingsNavItems = [
  { href: "/profile", icon: User, label: "Profile" },
  { href: "/settings", icon: Settings, label: "Settings" },
  { href: "/billing", icon: CreditCard, label: "Billing" },
];

const supportNavItems = [
  { href: "/faq", icon: HelpCircle, label: "Help & FAQ" },
];

export function DashboardSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const NavItem = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
        isActive(href)
          ? "bg-primary text-primary-foreground shadow-soft"
          : "text-muted-foreground hover:text-foreground hover:bg-accent"
      )}
    >
      <Icon className="w-5 h-5 shrink-0" />
      {!collapsed && <span>{label}</span>}
    </Link>
  );

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 bottom-0 bg-card border-r border-border transition-all duration-300 z-40",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full p-3">
        {/* Logo Section */}
        <div className="flex items-center justify-between mb-6 px-3 pt-2">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <Video className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">MockMaster</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 space-y-1">
          {!collapsed && (
            <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Main
            </p>
          )}
          {mainNavItems.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}

          {!collapsed && (
            <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 mt-6">
              Account
            </p>
          )}
          {collapsed && <div className="my-4 border-t border-border" />}
          {settingsNavItems.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </div>

        {/* Support Section */}
        <div className="border-t border-border pt-3 space-y-1">
          {supportNavItems.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </div>
      </div>
    </aside>
  );
}
