import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import dokbLogo from "@/assets/dokb-logo.png";

const demoMember = {
  nomor_anggota: "DOKB-001",
  nama_lengkap: "Ahmad Rizki",
  kota: "Banjarmasin",
  status: "Aktif" as const,
  tanggal_bergabung: "15 Januari 2024",
};

export default function MemberCard() {
  const verifyUrl = `https://app.dokb.or.id/verify/${demoMember.nomor_anggota}`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Kartu Anggota Digital</h1>
        <p className="text-muted-foreground mt-1">Preview kartu anggota digital DOKB</p>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-md">
          {/* Card front */}
          <div className="rounded-2xl gradient-primary p-6 text-primary-foreground shadow-elevated relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-primary-foreground/5 -translate-y-10 translate-x-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-primary-foreground/5 translate-y-10 -translate-x-10" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <img src={dokbLogo} alt="DOKB" className="h-10 w-10 rounded-lg bg-primary-foreground/10 p-1" />
                <div>
                  <h3 className="font-bold text-sm">KARTU ANGGOTA</h3>
                  <p className="text-xs text-primary-foreground/70">Driver Online Kalimantan Selatan Bersatu</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-primary-foreground/60 uppercase tracking-wider">Nama Anggota</p>
                  <p className="text-lg font-bold">{demoMember.nama_lengkap}</p>
                </div>
                <div className="flex gap-6">
                  <div>
                    <p className="text-xs text-primary-foreground/60 uppercase tracking-wider">Nomor Anggota</p>
                    <p className="font-semibold">{demoMember.nomor_anggota}</p>
                  </div>
                  <div>
                    <p className="text-xs text-primary-foreground/60 uppercase tracking-wider">Kota</p>
                    <p className="font-semibold">{demoMember.kota}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-end justify-between mt-6">
                <div>
                  <p className="text-xs text-primary-foreground/60">Berlaku sejak</p>
                  <p className="text-sm font-medium">{demoMember.tanggal_bergabung}</p>
                </div>
                <div className="bg-primary-foreground rounded-lg p-2">
                  <QRCodeSVG value={verifyUrl} size={72} level="M" />
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-4">
            Scan QR code untuk verifikasi keanggotaan
          </p>
        </div>
      </div>
    </div>
  );
}
