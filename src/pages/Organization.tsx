import { Card, CardContent } from "@/components/ui/card";
import { User, Users } from "lucide-react";

interface OrgMember {
  jabatan: string;
  nama: string;
  wilayah?: string;
}

const pengurus: OrgMember[] = [
  { jabatan: "Ketua Umum", nama: "H. Muhammad Yusuf" },
  { jabatan: "Wakil Ketua", nama: "Ir. Rahmad Hidayat" },
  { jabatan: "Sekretaris", nama: "Ahmad Fauzi, S.H." },
  { jabatan: "Bendahara", nama: "Hj. Siti Nurhaliza" },
];

const pengurusWilayah: OrgMember[] = [
  { jabatan: "Koordinator Wilayah", nama: "Rudi Hartono", wilayah: "Banjarmasin" },
  { jabatan: "Koordinator Wilayah", nama: "Dedi Supriadi", wilayah: "Banjarbaru" },
  { jabatan: "Koordinator Wilayah", nama: "Eko Prasetyo", wilayah: "Martapura" },
  { jabatan: "Koordinator Wilayah", nama: "Wahyu Nugroho", wilayah: "Pelaihari" },
];

export default function Organization() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Struktur Organisasi</h1>
        <p className="text-muted-foreground mt-1">Susunan pengurus DOKB periode 2024-2027</p>
      </div>

      {/* Pengurus Inti */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <User className="h-5 w-5 text-primary" /> Pengurus Inti
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {pengurus.map((p, i) => (
            <Card key={i} className="animate-fade-in">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="rounded-full gradient-primary h-12 w-12 flex items-center justify-center text-primary-foreground font-bold text-lg shrink-0">
                  {p.nama.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{p.nama}</p>
                  <p className="text-sm text-muted-foreground">{p.jabatan}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Pengurus Wilayah */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" /> Pengurus Wilayah
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {pengurusWilayah.map((p, i) => (
            <Card key={i} className="animate-fade-in">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="rounded-full bg-secondary h-12 w-12 flex items-center justify-center text-secondary-foreground font-bold text-lg shrink-0">
                  {p.nama.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{p.nama}</p>
                  <p className="text-sm text-muted-foreground">{p.jabatan} — {p.wilayah}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
