import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Download, Pencil, Trash2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const cities = ["Semua Kota", "Banjarmasin", "Banjarbaru", "Martapura", "Pelaihari", "Rantau", "Kandangan"];

interface MemberForm {
  nama_lengkap: string;
  nomor_hp: string;
  email: string;
  kota: string;
  plat_kendaraan: string;
  jenis_kendaraan: string;
  tahun_kendaraan: string;
  aplikasi: string;
  status: string;
}

const emptyForm: MemberForm = {
  nama_lengkap: "", nomor_hp: "", email: "", kota: "", plat_kendaraan: "",
  jenis_kendaraan: "", tahun_kendaraan: "", aplikasi: "", status: "aktif",
};

export default function Members() {
  const { toast } = useToast();
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCity, setFilterCity] = useState("Semua Kota");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<MemberForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchMembers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("members").select("*").order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Gagal memuat data", description: error.message, variant: "destructive" });
    } else {
      setMembers(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchMembers(); }, []);

  const generateNomor = () => {
    const num = members.length + 1;
    return `DOKB-${String(num).padStart(3, "0")}`;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    if (editingId) {
      const { error } = await supabase.from("members").update({
        nama_lengkap: form.nama_lengkap,
        nomor_hp: form.nomor_hp,
        email: form.email,
        kota: form.kota,
        plat_kendaraan: form.plat_kendaraan,
        jenis_kendaraan: form.jenis_kendaraan,
        tahun_kendaraan: form.tahun_kendaraan ? parseInt(form.tahun_kendaraan) : null,
        aplikasi: form.aplikasi,
        status: form.status,
        updated_at: new Date().toISOString(),
      }).eq("id", editingId);
      setSaving(false);
      if (error) {
        toast({ title: "Gagal mengupdate", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Anggota diperbarui" });
    } else {
      const { error } = await supabase.from("members").insert({
        nomor_anggota: generateNomor(),
        nama_lengkap: form.nama_lengkap,
        nomor_hp: form.nomor_hp,
        email: form.email,
        kota: form.kota,
        plat_kendaraan: form.plat_kendaraan,
        jenis_kendaraan: form.jenis_kendaraan,
        tahun_kendaraan: form.tahun_kendaraan ? parseInt(form.tahun_kendaraan) : null,
        aplikasi: form.aplikasi,
        status: form.status,
      });
      setSaving(false);
      if (error) {
        toast({ title: "Gagal menyimpan", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Anggota ditambahkan" });
    }

    setDialogOpen(false);
    setForm(emptyForm);
    setEditingId(null);
    fetchMembers();
  };

  const handleEdit = (m: any) => {
    setForm({
      nama_lengkap: m.nama_lengkap,
      nomor_hp: m.nomor_hp || "",
      email: m.email || "",
      kota: m.kota || "",
      plat_kendaraan: m.plat_kendaraan || "",
      jenis_kendaraan: m.jenis_kendaraan || "",
      tahun_kendaraan: m.tahun_kendaraan?.toString() || "",
      aplikasi: m.aplikasi || "",
      status: m.status,
    });
    setEditingId(m.id);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus anggota ini?")) return;
    const { error } = await supabase.from("members").delete().eq("id", id);
    if (error) {
      toast({ title: "Gagal menghapus", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Anggota dihapus" });
      fetchMembers();
    }
  };

  const filtered = members.filter((m) => {
    const matchSearch = m.nama_lengkap.toLowerCase().includes(search.toLowerCase()) ||
      m.nomor_anggota.toLowerCase().includes(search.toLowerCase());
    const matchCity = filterCity === "Semua Kota" || m.kota === filterCity;
    return matchSearch && matchCity;
  });

  const exportCSV = () => {
    const header = "Nomor Anggota,Nama,HP,Email,Kota,Plat,Kendaraan,Tahun,Aplikasi,Status,Tgl Bergabung\n";
    const rows = filtered.map(m =>
      `${m.nomor_anggota},${m.nama_lengkap},${m.nomor_hp || ""},${m.email || ""},${m.kota || ""},${m.plat_kendaraan || ""},${m.jenis_kendaraan || ""},${m.tahun_kendaraan || ""},${m.aplikasi || ""},${m.status},${m.tanggal_bergabung}`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "anggota-dokb.csv";
    a.click();
  };

  const openAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Database Anggota</h1>
          <p className="text-muted-foreground mt-1">Kelola data anggota driver DOKB</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportCSV}>
            <Download className="h-4 w-4 mr-2" /> Export CSV
          </Button>
          <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) { setEditingId(null); setForm(emptyForm); } }}>
            <DialogTrigger asChild>
              <Button size="sm" onClick={openAdd}><Plus className="h-4 w-4 mr-2" /> Tambah Anggota</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingId ? "Edit Anggota" : "Tambah Anggota Baru"}</DialogTitle>
              </DialogHeader>
              <form className="space-y-4 mt-4" onSubmit={handleSave}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label>Nama Lengkap</Label>
                    <Input placeholder="Nama lengkap" required value={form.nama_lengkap} onChange={(e) => setForm({ ...form, nama_lengkap: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Nomor HP / WhatsApp</Label>
                    <Input placeholder="08xxxxxxxxxx" value={form.nomor_hp} onChange={(e) => setForm({ ...form, nomor_hp: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="email@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Kota / Kabupaten</Label>
                    <Select value={form.kota} onValueChange={(v) => setForm({ ...form, kota: v })}>
                      <SelectTrigger><SelectValue placeholder="Pilih kota" /></SelectTrigger>
                      <SelectContent>
                        {cities.slice(1).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Plat Kendaraan</Label>
                    <Input placeholder="DA 1234 AB" value={form.plat_kendaraan} onChange={(e) => setForm({ ...form, plat_kendaraan: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Jenis Kendaraan</Label>
                    <Input placeholder="Toyota Avanza" value={form.jenis_kendaraan} onChange={(e) => setForm({ ...form, jenis_kendaraan: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Tahun Kendaraan</Label>
                    <Input placeholder="2020" value={form.tahun_kendaraan} onChange={(e) => setForm({ ...form, tahun_kendaraan: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Aplikasi</Label>
                    <Select value={form.aplikasi} onValueChange={(v) => setForm({ ...form, aplikasi: v })}>
                      <SelectTrigger><SelectValue placeholder="Pilih aplikasi" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Gojek">Gojek</SelectItem>
                        <SelectItem value="Grab">Grab</SelectItem>
                        <SelectItem value="Maxim">Maxim</SelectItem>
                        <SelectItem value="Lainnya">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aktif">Aktif</SelectItem>
                        <SelectItem value="non_aktif">Non Aktif</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={saving}>
                  {saving ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Menyimpan...</> : "Simpan Anggota"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Cari nama atau nomor anggota..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <Select value={filterCity} onValueChange={setFilterCity}>
              <SelectTrigger className="w-full sm:w-48"><SelectValue /></SelectTrigger>
              <SelectContent>
                {cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No. Anggota</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead className="hidden md:table-cell">HP</TableHead>
                    <TableHead className="hidden lg:table-cell">Kota</TableHead>
                    <TableHead className="hidden lg:table-cell">Aplikasi</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        Belum ada data anggota
                      </TableCell>
                    </TableRow>
                  ) : filtered.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell className="font-medium text-primary">{m.nomor_anggota}</TableCell>
                      <TableCell>{m.nama_lengkap}</TableCell>
                      <TableCell className="hidden md:table-cell">{m.nomor_hp}</TableCell>
                      <TableCell className="hidden lg:table-cell">{m.kota}</TableCell>
                      <TableCell className="hidden lg:table-cell">{m.aplikasi}</TableCell>
                      <TableCell>
                        <Badge variant={m.status === "aktif" ? "default" : "secondary"}>
                          {m.status === "aktif" ? "Aktif" : "Non Aktif"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(m)}><Pencil className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(m.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
