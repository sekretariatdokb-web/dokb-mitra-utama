import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileWarning, Calendar, User } from "lucide-react";

interface Report {
  id: string;
  judul: string;
  kategori: string;
  deskripsi: string;
  pengirim: string;
  tanggal: string;
  status: "Baru" | "Diproses" | "Selesai";
}

const demoReports: Report[] = [
  { id: "1", judul: "Tarif terlalu murah di area Banjarbaru", kategori: "Tarif terlalu murah", deskripsi: "Tarif order dari Banjarbaru ke Martapura hanya Rp 15.000, tidak sebanding dengan jarak tempuh.", pengirim: "Ahmad Rizki", tanggal: "2024-03-14", status: "Baru" },
  { id: "2", judul: "Order fiktif berulang", kategori: "Order fiktif", deskripsi: "Mendapat 3 order fiktif berturut-turut di area Banjarmasin Utara.", pengirim: "Budi Santoso", tanggal: "2024-03-13", status: "Diproses" },
  { id: "3", judul: "Akun terkena suspend tanpa alasan", kategori: "Masalah akun", deskripsi: "Akun Grab saya di-suspend tanpa notifikasi, sudah banding tapi belum ada tanggapan.", pengirim: "Siti Aminah", tanggal: "2024-03-12", status: "Selesai" },
];

const statusColor = {
  Baru: "destructive" as const,
  Diproses: "default" as const,
  Selesai: "secondary" as const,
};

export default function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Laporan Driver</h1>
        <p className="text-muted-foreground mt-1">Laporan masalah dari anggota driver</p>
      </div>

      <div className="space-y-4">
        {demoReports.map((r) => (
          <Card key={r.id} className="animate-fade-in">
            <CardContent className="p-5">
              <div className="flex gap-3">
                <div className="rounded-lg bg-destructive/10 p-2.5 shrink-0 h-fit">
                  <FileWarning className="h-4 w-4 text-destructive" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-foreground">{r.judul}</h3>
                    <Badge variant={statusColor[r.status]}>{r.status}</Badge>
                  </div>
                  <Badge variant="outline" className="mt-1 text-xs">{r.kategori}</Badge>
                  <p className="text-sm text-muted-foreground mt-2">{r.deskripsi}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <User className="h-3 w-3" /> {r.pengirim}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" /> {r.tanggal}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
