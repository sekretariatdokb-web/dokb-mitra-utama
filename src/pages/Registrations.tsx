import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Check, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

export default function Registrations() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRegistrations = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("registrations").select("*").order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Gagal memuat data", description: error.message, variant: "destructive" });
    } else {
      setRegistrations(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchRegistrations(); }, []);

  const handleApprove = async (reg: any) => {
    // Update registration status
    const { error: updateError } = await supabase.from("registrations")
      .update({ status: "approved", reviewed_by: user?.id })
      .eq("id", reg.id);

    if (updateError) {
      toast({ title: "Gagal menyetujui", description: updateError.message, variant: "destructive" });
      return;
    }

    // Auto-add to members
    const count = await supabase.from("members").select("id", { count: "exact", head: true });
    const num = (count.count || 0) + 1;

    const { error: memberError } = await supabase.from("members").insert({
      nomor_anggota: `DOKB-${String(num).padStart(3, "0")}`,
      nama_lengkap: reg.nama_lengkap,
      nomor_hp: reg.nomor_hp,
      kota: reg.kota,
      jenis_kendaraan: reg.jenis_kendaraan,
      plat_kendaraan: reg.plat_kendaraan,
      aplikasi: reg.aplikasi,
      status: "aktif",
    });

    if (memberError) {
      toast({ title: "Gagal menambah anggota", description: memberError.message, variant: "destructive" });
    } else {
      toast({ title: "Pendaftaran disetujui dan anggota ditambahkan" });
    }
    fetchRegistrations();
  };

  const handleReject = async (id: string) => {
    const { error } = await supabase.from("registrations")
      .update({ status: "rejected", reviewed_by: user?.id })
      .eq("id", id);

    if (error) {
      toast({ title: "Gagal menolak", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Pendaftaran ditolak" });
      fetchRegistrations();
    }
  };

  const statusBadge = (status: string) => {
    if (status === "approved") return <Badge variant="default">Disetujui</Badge>;
    if (status === "rejected") return <Badge variant="destructive">Ditolak</Badge>;
    return <Badge variant="secondary">Menunggu</Badge>;
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
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
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
                  {registrations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        Belum ada pendaftaran masuk
                      </TableCell>
                    </TableRow>
                  ) : registrations.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">{r.nama_lengkap}</TableCell>
                      <TableCell className="hidden sm:table-cell">{r.nomor_hp}</TableCell>
                      <TableCell className="hidden md:table-cell">{r.kota}</TableCell>
                      <TableCell className="hidden lg:table-cell">{r.jenis_kendaraan}</TableCell>
                      <TableCell className="hidden lg:table-cell">{r.aplikasi}</TableCell>
                      <TableCell>{statusBadge(r.status)}</TableCell>
                      <TableCell className="text-right">
                        {r.status === "pending" && (
                          <div className="flex justify-end gap-1">
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600" onClick={() => handleApprove(r)}>
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => handleReject(r.id)}>
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
