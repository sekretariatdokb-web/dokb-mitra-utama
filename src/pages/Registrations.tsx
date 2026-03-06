import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Check, X } from "lucide-react";

interface Registration {
  id: string;
  nama_lengkap: string;
  nomor_hp: string;
  kota: string;
  jenis_kendaraan: string;
  plat_kendaraan: string;
  aplikasi: string;
  tanggal_daftar: string;
  status: "Menunggu" | "Disetujui" | "Ditolak";
}

const demoRegistrations: Registration[] = [
  { id: "1", nama_lengkap: "Rudi Hartono", nomor_hp: "08567890123", kota: "Banjarmasin", jenis_kendaraan: "Honda Jazz", plat_kendaraan: "DA 3456 GH", aplikasi: "Gojek", tanggal_daftar: "2024-03-01", status: "Menunggu" },
  { id: "2", nama_lengkap: "Dewi Lestari", nomor_hp: "08678901234", kota: "Banjarbaru", jenis_kendaraan: "Toyota Calya", plat_kendaraan: "DA 7890 IJ", aplikasi: "Grab", tanggal_daftar: "2024-03-02", status: "Menunggu" },
  { id: "3", nama_lengkap: "Fahmi Hidayat", nomor_hp: "08789012345", kota: "Martapura", jenis_kendaraan: "Suzuki Ertiga", plat_kendaraan: "DA 2345 KL", aplikasi: "Maxim", tanggal_daftar: "2024-02-28", status: "Disetujui" },
];

export default function Registrations() {
  const [registrations, setRegistrations] = useState<Registration[]>(demoRegistrations);

  const updateStatus = (id: string, status: "Disetujui" | "Ditolak") => {
    setRegistrations(regs => regs.map(r => r.id === id ? { ...r, status } : r));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Pendaftaran Anggota Baru</h1>
        <p className="text-muted-foreground mt-1">Kelola pendaftaran driver yang masuk</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Daftar Pendaftaran</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead className="hidden sm:table-cell">HP</TableHead>
                  <TableHead className="hidden md:table-cell">Kota</TableHead>
                  <TableHead className="hidden lg:table-cell">Kendaraan</TableHead>
                  <TableHead className="hidden lg:table-cell">Aplikasi</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.nama_lengkap}</TableCell>
                    <TableCell className="hidden sm:table-cell">{r.nomor_hp}</TableCell>
                    <TableCell className="hidden md:table-cell">{r.kota}</TableCell>
                    <TableCell className="hidden lg:table-cell">{r.jenis_kendaraan}</TableCell>
                    <TableCell className="hidden lg:table-cell">{r.aplikasi}</TableCell>
                    <TableCell>
                      <Badge variant={r.status === "Disetujui" ? "default" : r.status === "Ditolak" ? "destructive" : "secondary"}>
                        {r.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {r.status === "Menunggu" && (
                        <div className="flex justify-end gap-1">
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-success" onClick={() => updateStatus(r.id, "Disetujui")}>
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => updateStatus(r.id, "Ditolak")}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
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
