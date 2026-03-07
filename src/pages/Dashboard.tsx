import { useEffect, useState } from "react";
import { Users, UserCheck, UserX, UserPlus, MapPin } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { supabase } from "@/integrations/supabase/client";

const APP_COLORS: Record<string, string> = {
  Gojek: "hsl(142, 71%, 45%)",
  Grab: "hsl(199, 89%, 48%)",
  Maxim: "hsl(38, 92%, 50%)",
  Lainnya: "hsl(215, 13%, 50%)",
};

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, aktif: 0, nonAktif: 0, bulanIni: 0 });
  const [cityData, setCityData] = useState<{ name: string; anggota: number }[]>([]);
  const [appData, setAppData] = useState<{ name: string; value: number; color: string }[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const { data: members } = await supabase.from("members").select("status, kota, aplikasi, tanggal_bergabung");
      if (!members) return;

      const now = new Date();
      const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);

      const total = members.length;
      const aktif = members.filter(m => m.status === "aktif").length;
      const nonAktif = total - aktif;
      const bulanIni = members.filter(m => m.tanggal_bergabung >= firstOfMonth).length;
      setStats({ total, aktif, nonAktif, bulanIni });

      // City distribution
      const cityMap: Record<string, number> = {};
      members.forEach(m => { if (m.kota) cityMap[m.kota] = (cityMap[m.kota] || 0) + 1; });
      setCityData(Object.entries(cityMap).map(([name, anggota]) => ({ name, anggota })).sort((a, b) => b.anggota - a.anggota));

      // App distribution
      const appMap: Record<string, number> = {};
      members.forEach(m => { if (m.aplikasi) appMap[m.aplikasi] = (appMap[m.aplikasi] || 0) + 1; });
      setAppData(Object.entries(appMap).map(([name, value]) => ({ name, value, color: APP_COLORS[name] || "hsl(215, 13%, 50%)" })));
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Ringkasan data organisasi DOKB</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Anggota" value={stats.total} icon={Users} trend={`${stats.bulanIni} baru bulan ini`} trendUp />
        <StatCard label="Anggota Aktif" value={stats.aktif} icon={UserCheck} trend={stats.total ? `${((stats.aktif / stats.total) * 100).toFixed(1)}%` : "0%"} trendUp />
        <StatCard label="Non Aktif" value={stats.nonAktif} icon={UserX} trend={stats.total ? `${((stats.nonAktif / stats.total) * 100).toFixed(1)}%` : "0%"} trendUp={false} />
        <StatCard label="Anggota Baru" value={stats.bulanIni} icon={UserPlus} trend="Bulan ini" trendUp />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="h-4 w-4 text-primary" />
              Distribusi Anggota per Kota
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(215, 13%, 50%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 13%, 50%)" />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(214, 20%, 90%)" }} />
                <Bar dataKey="anggota" fill="hsl(217, 71%, 25%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Aplikasi yang Digunakan</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={appData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {appData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-4 justify-center mt-2">
              {appData.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-sm">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
