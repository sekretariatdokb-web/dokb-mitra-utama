import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Megaphone, Calendar, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

export default function Announcements() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchAnnouncements = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("announcements").select("*").order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Gagal memuat pengumuman", description: error.message, variant: "destructive" });
    } else {
      setAnnouncements(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchAnnouncements(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("announcements").insert({
      judul,
      isi,
      created_by: user?.id,
    });
    setSaving(false);
    if (error) {
      toast({ title: "Gagal menyimpan", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Pengumuman dibuat" });
    setJudul("");
    setIsi("");
    setDialogOpen(false);
    fetchAnnouncements();
  };

  const toggleActive = async (id: string, currentState: boolean) => {
    const { error } = await supabase.from("announcements").update({ aktif: !currentState, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) {
      toast({ title: "Gagal mengubah status", description: error.message, variant: "destructive" });
    } else {
      setAnnouncements(list => list.map(a => a.id === id ? { ...a, aktif: !currentState } : a));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Pengumuman</h1>
          <p className="text-muted-foreground mt-1">Kelola pengumuman organisasi</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4 mr-2" /> Buat Pengumuman</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Pengumuman Baru</DialogTitle>
            </DialogHeader>
            <form className="space-y-4 mt-4" onSubmit={handleCreate}>
              <div className="space-y-2">
                <Label>Judul</Label>
                <Input placeholder="Judul pengumuman" required value={judul} onChange={(e) => setJudul(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Isi Pengumuman</Label>
                <Textarea placeholder="Tulis isi pengumuman..." rows={5} required value={isi} onChange={(e) => setIsi(e.target.value)} />
              </div>
              <Button type="submit" className="w-full" disabled={saving}>
                {saving ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Menyimpan...</> : "Simpan Pengumuman"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : announcements.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">Belum ada pengumuman</p>
      ) : (
        <div className="space-y-4">
          {announcements.map((a) => (
            <Card key={a.id} className="animate-fade-in">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3 flex-1 min-w-0">
                    <div className="rounded-lg gradient-primary p-2.5 shrink-0 h-fit">
                      <Megaphone className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-foreground">{a.judul}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{a.isi}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" /> {a.tanggal}
                        </span>
                        <Badge variant={a.aktif ? "default" : "secondary"}>{a.aktif ? "Aktif" : "Tidak Aktif"}</Badge>
                      </div>
                    </div>
                  </div>
                  <Switch checked={a.aktif} onCheckedChange={() => toggleActive(a.id, a.aktif)} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
