import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { CheckCircle } from "lucide-react";
import dokbLogo from "@/assets/dokb-logo.png";

export default function PublicRegistration() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center animate-fade-in">
          <CardContent className="pt-8 pb-8">
            <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">Pendaftaran Berhasil!</h2>
            <p className="text-muted-foreground">
              Terima kasih telah mendaftar sebagai anggota DOKB. Tim kami akan meninjau pendaftaran Anda. Silakan tunggu konfirmasi.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-lg w-full animate-fade-in">
        <CardHeader className="text-center pb-2">
          <img src={dokbLogo} alt="DOKB" className="h-14 w-14 mx-auto mb-3 rounded-xl" />
          <CardTitle className="text-xl">Pendaftaran Anggota DOKB</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Driver Online Kalimantan Selatan Bersatu</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
            <div className="space-y-2">
              <Label>Nama Lengkap</Label>
              <Input placeholder="Masukkan nama lengkap" required />
            </div>
            <div className="space-y-2">
              <Label>Nomor HP / WhatsApp</Label>
              <Input placeholder="08xxxxxxxxxx" required />
            </div>
            <div className="space-y-2">
              <Label>Kota / Kabupaten</Label>
              <Select required>
                <SelectTrigger><SelectValue placeholder="Pilih kota" /></SelectTrigger>
                <SelectContent>
                  {["Banjarmasin", "Banjarbaru", "Martapura", "Pelaihari", "Rantau", "Kandangan"].map(c =>
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Jenis Kendaraan</Label>
                <Input placeholder="Toyota Avanza" required />
              </div>
              <div className="space-y-2">
                <Label>Plat Kendaraan</Label>
                <Input placeholder="DA 1234 AB" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Aplikasi Driver</Label>
              <Select required>
                <SelectTrigger><SelectValue placeholder="Pilih aplikasi" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gojek">Gojek</SelectItem>
                  <SelectItem value="Grab">Grab</SelectItem>
                  <SelectItem value="Maxim">Maxim</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full h-11">Daftar Sekarang</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
