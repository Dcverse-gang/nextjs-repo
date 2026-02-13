"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  DollarSign,
  Eye,
  Settings,
  LogOut,
  Plus,
  Bell,
  ChevronRight,
  Activity,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { apiClient } from "@/lib/api";
import { auth, type User } from "@/lib/auth";
import { toast } from "sonner";
import { Logo } from "@/components/logo";

interface DashboardStats {
  total_clones?: number;
  total_earnings?: number;
  total_views?: number;
  recent_activity?: Array<{
    message: string;
    time: string;
  }>;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = auth.getToken();
      const storedUser = auth.getUser();

      if (!token || !storedUser) {
        router.push("/login");
        return;
      }

      try {
        // Verify token
        const response = await apiClient.get("/auth/me");
        setUser(response.data);

        // Get dashboard stats
        const statsResponse = await apiClient.get("/dashboard/stats");
        setStats(statsResponse.data);
      } catch (error) {
        auth.clearAuth();
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    auth.clearAuth();
    toast.success("Logged out successfully");
    router.push("/");
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-background"
        data-testid="dashboard-loading"
      >
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <div className="font-mono text-lg text-foreground/70">Loading...</div>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      icon: Users,
      label: "Total Clones",
      value: stats?.total_clones || 0,
      change: "+12%",
      positive: true,
      gradient: "from-blue-500 to-purple-500",
    },
    {
      icon: DollarSign,
      label: "Total Earnings",
      value: `$${(stats?.total_earnings || 0).toLocaleString()}`,
      change: "+8%",
      positive: true,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Eye,
      label: "Total Views",
      value: (stats?.total_views || 0).toLocaleString(),
      change: "+24%",
      positive: true,
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Users, label: "My Clones", active: false },
    { icon: DollarSign, label: "Earnings", active: false },
    { icon: Activity, label: "Analytics", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  return (
    <div className="min-h-screen flex bg-background" data-testid="dashboard-page">
      {/* Sidebar */}
      <aside
        className="hidden md:flex flex-col w-64 bg-card border-r border-border"
        data-testid="dashboard-sidebar"
      >
        <div className="p-6 border-b border-border">
          <Link href="/">
            <Logo width={200} height={50} className="h-6 w-auto" />
          </Link>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <button
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    item.active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-foreground/70 hover:bg-accent hover:text-foreground"
                  }`}
                  data-testid={`sidebar-${item.label.toLowerCase().replace(" ", "-")}`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-foreground/70 hover:bg-accent hover:text-foreground rounded-lg text-sm font-medium transition-all"
            data-testid="logout-btn"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header
          className="bg-card border-b border-border px-6 md:px-8 py-4 sticky top-0 z-40 backdrop-blur-sm bg-card/80"
          data-testid="dashboard-header"
        >
          <div className="flex items-center justify-between">
            <div className="md:hidden">
              <Logo width={200} height={50} className="h-6 w-auto" />
            </div>
            <h1 className="hidden md:block font-heading text-xl font-bold text-foreground">
              Dashboard
            </h1>

            <div className="flex items-center gap-4">
              <button
                className="p-2 text-foreground/70 hover:text-foreground hover:bg-accent rounded-lg transition-colors relative"
                data-testid="notifications-btn"
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center font-mono text-sm font-semibold">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <span className="hidden md:block font-medium text-sm text-foreground">
                  {user?.name}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 md:p-8">
          {/* Welcome Section */}
          <div className="mb-8" data-testid="welcome-section">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2 text-foreground">
              Welcome back, {user?.name?.split(" ")[0]}
            </h2>
            <p className="text-foreground/70">
              Here's what's happening with your AI clones.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" data-testid="stats-grid">
            {statCards.map((stat, index) => (
              <div
                key={index}
                className="stat-card group cursor-pointer"
                data-testid={`stat-card-${index}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <stat.icon size={20} className="text-white" />
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      stat.positive
                        ? "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950"
                        : "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <p className="text-xs uppercase tracking-wider text-foreground/60 mb-1 font-medium">
                  {stat.label}
                </p>
                <p className="font-heading text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions & Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <div className="card" data-testid="quick-actions">
              <h3 className="font-heading text-lg font-semibold mb-6 text-foreground">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  className="w-full flex items-center justify-between p-4 bg-primary text-primary-foreground hover:bg-primary-hover rounded-lg transition-all group shadow-sm"
                  data-testid="create-clone-btn"
                >
                  <div className="flex items-center gap-3">
                    <Plus size={18} />
                    <span className="font-medium text-sm">Create New Clone</span>
                  </div>
                  <ChevronRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
                <button
                  className="w-full flex items-center justify-between p-4 border border-border hover:border-foreground/20 hover:bg-accent rounded-lg transition-all group"
                  data-testid="view-analytics-btn"
                >
                  <div className="flex items-center gap-3">
                    <TrendingUp size={18} className="text-foreground/70" />
                    <span className="font-medium text-sm text-foreground">View Analytics</span>
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-foreground/40 group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card" data-testid="recent-activity">
              <h3 className="font-heading text-lg font-semibold mb-6 text-foreground">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {stats?.recent_activity?.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <p className="text-sm font-medium text-foreground">{activity.message}</p>
                    <p className="text-xs text-foreground/60 mt-1">{activity.time}</p>
                  </div>
                ))}
                {(!stats?.recent_activity || stats.recent_activity.length === 0) && (
                  <div className="text-center py-8">
                    <Activity size={48} className="text-foreground/20 mx-auto mb-4" />
                    <p className="text-foreground/60 text-sm">No recent activity</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Getting Started */}
          <div className="mt-8 card card-gradient" data-testid="getting-started">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-heading text-xl font-semibold mb-2 text-primary-foreground">
                  Ready to create your first clone?
                </h3>
                <p className="text-primary-foreground/80">
                  Upload your likeness data and start earning today.
                </p>
              </div>
              <button
                className="btn bg-primary-foreground text-primary hover:bg-primary-foreground/90 whitespace-nowrap"
                data-testid="get-started-btn"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
