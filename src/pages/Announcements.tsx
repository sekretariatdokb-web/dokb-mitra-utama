import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Megaphone, Calendar } from "lucide-react";

interface Announcement {
  id: string;
  judul: string;
  isi: string;
  tanggal: string;
  aktif: boolean;
}

const demoAnnouncements: Announcement[] = [
  { id: "1", judul: "Kenaikan Tarif Minimum", isi: "Mulai tanggal 1 April 2024, tarif minimum untuk layanan ride akan disesuaikan sesuai kebijakan baru dari pemerintah daerah.", tanggal: "2024-03-15", aktif: true },
  { id: "2", judul: "Rapat Anggota Tahunan", isi: "Seluruh anggota DOKB diundang untuk menghadiri Rapat Anggota Tahunan yang akan diadakan pada tanggal 20 April 2024.", tanggal: "2024-03-10", aktif: true },
  { id: "3", judul: "Pelatihan Keselamatan Berkendara", isi: "DOKB akan mengadakan pelatihan keselamatan berkendara gratis untuk seluruh anggota.", tanggal: "2024-02-28", aktif: false },
];

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(demoAnnouncements);
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleActive = (id: string) => {
    setAnnouncements(list => list.map(a => a.id === id ? { ...a, aktif: !a.aktif } : a));
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
            <form className="space-y-4 mt-4" onSubmit={(e) => { e.preventDefault(); setDialogOpen(false); }}>
              <div className="space-y-2">
                <Label>Judul</Label>
                <Input placeholder="Judul pengumuman" required />
              </div>
              <div className="space-y-2">
                <Label>Isi Pengumuman</Label>
                <Textarea placeholder="Tulis isi pengumuman..." rows={5} required />
              </div>
              <Button type="submit" className="w-full">Simpan Pengumuman</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

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
                <Switch checked={a.aktif} onCheckedChange={() => toggleActive(a.id)} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
