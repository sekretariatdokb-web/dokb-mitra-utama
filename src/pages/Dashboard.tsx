import { Users, UserCheck, UserX, UserPlus, MapPin } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const cityData = [
  { name: "Banjarmasin", anggota: 245 },
  { name: "Banjarbaru", anggota: 189 },
  { name: "Martapura", anggota: 134 },
  { name: "Pelaihari", anggota: 87 },
  { name: "Rantau", anggota: 56 },
  { name: "Kandangan", anggota: 42 },
];

const appData = [
  { name: "Gojek", value: 320, color: "hsl(142, 71%, 45%)" },
  { name: "Grab", value: 280, color: "hsl(199, 89%, 48%)" },
  { name: "Maxim", value: 120, color: "hsl(38, 92%, 50%)" },
  { name: "Lainnya", value: 33, color: "hsl(215, 13%, 50%)" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Ringkasan data organisasi DOKB</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Anggota" value={753} icon={Users} trend="+12 bulan ini" trendUp />
        <StatCard label="Anggota Aktif" value={689} icon={UserCheck} trend="91.5%" trendUp />
        <StatCard label="Non Aktif" value={64} icon={UserX} trend="8.5%" trendUp={false} />
        <StatCard label="Anggota Baru" value={12} icon={UserPlus} trend="Bulan ini" trendUp />
      </div>

      {/* Charts */}
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
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid hsl(214, 20%, 90%)",
                    boxShadow: "0 4px 12px hsl(217, 71%, 25%, 0.1)",
                  }}
                />
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
