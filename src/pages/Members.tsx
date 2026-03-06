import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Download, Pencil, Trash2 } from "lucide-react";

interface Member {
  id: string;
  nomor_anggota: string;
  nama_lengkap: string;
  nomor_hp: string;
  email: string;
  kota: string;
  plat_kendaraan: string;
  jenis_kendaraan: string;
  tahun_kendaraan: string;
  aplikasi: string;
  status: "Aktif" | "Non Aktif";
  tanggal_bergabung: string;
}

const demoMembers: Member[] = [
  {
    id: "1", nomor_anggota: "DOKB-001", nama_lengkap: "Ahmad Rizki", nomor_hp: "08123456789",
    email: "ahmad@email.com", kota: "Banjarmasin", plat_kendaraan: "DA 1234 AB", jenis_kendaraan: "Toyota Avanza",
    tahun_kendaraan: "2020", aplikasi: "Gojek", status: "Aktif", tanggal_bergabung: "2024-01-15"
  },
  {
    id: "2", nomor_anggota: "DOKB-002", nama_lengkap: "Budi Santoso", nomor_hp: "08234567890",
    email: "budi@email.com", kota: "Banjarbaru", plat_kendaraan: "DA 5678 CD", jenis_kendaraan: "Honda Brio",
    tahun_kendaraan: "2021", aplikasi: "Grab", status: "Aktif", tanggal_bergabung: "2024-02-20"
  },
  {
    id: "3", nomor_anggota: "DOKB-003", nama_lengkap: "Siti Aminah", nomor_hp: "08345678901",
    email: "siti@email.com", kota: "Martapura", plat_kendaraan: "DA 9012 EF", jenis_kendaraan: "Daihatsu Sigra",
    tahun_kendaraan: "2019", aplikasi: "Maxim", status: "Non Aktif", tanggal_bergabung: "2024-03-10"
  },
];

const cities = ["Semua Kota", "Banjarmasin", "Banjarbaru", "Martapura", "Pelaihari", "Rantau", "Kandangan"];

export default function Members() {
  const [members] = useState<Member[]>(demoMembers);
  const [search, setSearch] = useState("");
  const [filterCity, setFilterCity] = useState("Semua Kota");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = members.filter((m) => {
    const matchSearch = m.nama_lengkap.toLowerCase().includes(search.toLowerCase()) ||
      m.nomor_anggota.toLowerCase().includes(search.toLowerCase());
    const matchCity = filterCity === "Semua Kota" || m.kota === filterCity;
    return matchSearch && matchCity;
  });

  const exportCSV = () => {
    const header = "Nomor Anggota,Nama,HP,Email,Kota,Plat,Kendaraan,Tahun,Aplikasi,Status,Tgl Bergabung\n";
    const rows = filtered.map(m =>
      `${m.nomor_anggota},${m.nama_lengkap},${m.nomor_hp},${m.email},${m.kota},${m.plat_kendaraan},${m.jenis_kendaraan},${m.tahun_kendaraan},${m.aplikasi},${m.status},${m.tanggal_bergabung}`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "anggota-dokb.csv";
    a.click();
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
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm"><Plus className="h-4 w-4 mr-2" /> Tambah Anggota</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Tambah Anggota Baru</DialogTitle>
              </DialogHeader>
              <form className="space-y-4 mt-4" onSubmit={(e) => { e.preventDefault(); setDialogOpen(false); }}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label>Nama Lengkap</Label>
                    <Input placeholder="Nama lengkap" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Nomor HP / WhatsApp</Label>
                    <Input placeholder="08xxxxxxxxxx" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="email@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Kota / Kabupaten</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Pilih kota" /></SelectTrigger>
                      <SelectContent>
                        {cities.slice(1).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Plat Kendaraan</Label>
                    <Input placeholder="DA 1234 AB" />
                  </div>
                  <div className="space-y-2">
                    <Label>Jenis Kendaraan</Label>
                    <Input placeholder="Toyota Avanza" />
                  </div>
                  <div className="space-y-2">
                    <Label>Tahun Kendaraan</Label>
                    <Input placeholder="2020" />
                  </div>
                  <div className="space-y-2">
                    <Label>Aplikasi</Label>
                    <Select>
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
                    <Select defaultValue="Aktif">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Aktif">Aktif</SelectItem>
                        <SelectItem value="Non Aktif">Non Aktif</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button type="submit" className="w-full">Simpan Anggota</Button>
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
                {filtered.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="font-medium text-primary">{m.nomor_anggota}</TableCell>
                    <TableCell>{m.nama_lengkap}</TableCell>
                    <TableCell className="hidden md:table-cell">{m.nomor_hp}</TableCell>
                    <TableCell className="hidden lg:table-cell">{m.kota}</TableCell>
                    <TableCell className="hidden lg:table-cell">{m.aplikasi}</TableCell>
                    <TableCell>
                      <Badge variant={m.status === "Aktif" ? "default" : "secondary"}>
                        {m.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Pencil className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
