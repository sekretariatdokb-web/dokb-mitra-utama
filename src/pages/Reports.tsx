import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { FileWarning, Calendar, User, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const statusColor: Record<string, "destructive" | "default" | "secondary"> = {
  pending: "destructive",
  diproses: "default",
  selesai: "secondary",
};

const statusLabel: Record<string, string> = {
  pending: "Baru",
  diproses: "Diproses",
  selesai: "Selesai",
};

export default function Reports() {
  const { toast } = useToast();
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("reports")
      .select("*, profiles:submitted_by(full_name)")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Gagal memuat laporan", description: error.message, variant: "destructive" });
    } else {
      setReports(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchReports(); }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("reports").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Gagal mengubah status", description: error.message, variant: "destructive" });
    } else {
      setReports(list => list.map(r => r.id === id ? { ...r, status } : r));
      toast({ title: "Status diperbarui" });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Laporan Driver</h1>
        <p className="text-muted-foreground mt-1">Laporan masalah dari anggota driver</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : reports.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">Belum ada laporan masuk</p>
      ) : (
        <div className="space-y-4">
          {reports.map((r) => (
            <Card key={r.id} className="animate-fade-in">
              <CardContent className="p-5">
                <div className="flex gap-3">
                  <div className="rounded-lg bg-destructive/10 p-2.5 shrink-0 h-fit">
                    <FileWarning className="h-4 w-4 text-destructive" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-foreground">{r.judul}</h3>
                      <Badge variant={statusColor[r.status] || "secondary"}>{statusLabel[r.status] || r.status}</Badge>
                    </div>
                    <Badge variant="outline" className="mt-1 text-xs">{r.kategori}</Badge>
                    <p className="text-sm text-muted-foreground mt-2">{r.deskripsi}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <User className="h-3 w-3" /> {r.profiles?.full_name || "Anonim"}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" /> {new Date(r.created_at).toLocaleDateString("id-ID")}
                      </span>
                    </div>
                    {r.status !== "selesai" && (
                      <div className="mt-3">
                        <Select value={r.status} onValueChange={(v) => updateStatus(r.id, v)}>
                          <SelectTrigger className="w-40 h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Baru</SelectItem>
                            <SelectItem value="diproses">Diproses</SelectItem>
                            <SelectItem value="selesai">Selesai</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
