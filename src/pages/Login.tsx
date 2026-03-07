import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import dokbLogo from "@/assets/dokb-logo.png";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session, loading: authLoading, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (session) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast({ title: "Login gagal", description: error.message, variant: "destructive" });
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full border border-primary-foreground/20" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full border border-primary-foreground/20" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full border border-primary-foreground/10" />
        </div>
        <div className="relative z-10 text-center max-w-md">
          <img src={dokbLogo} alt="DOKB Logo" className="mx-auto h-24 w-24 mb-8 rounded-2xl bg-primary-foreground/10 p-3" />
          <h1 className="text-3xl font-bold text-primary-foreground mb-4">DOKB Super Admin Portal</h1>
          <p className="text-primary-foreground/80 text-lg leading-relaxed">
            Perkumpulan Driver Online Kalimantan Selatan Bersatu
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <div className="rounded-xl bg-primary-foreground/10 px-4 py-2 text-sm text-primary-foreground/90">
              Manajemen Anggota
            </div>
            <div className="rounded-xl bg-primary-foreground/10 px-4 py-2 text-sm text-primary-foreground/90">
              Dashboard Statistik
            </div>
          </div>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md animate-fade-in">
          <div className="lg:hidden flex flex-col items-center mb-8">
            <img src={dokbLogo} alt="DOKB Logo" className="h-16 w-16 mb-4 rounded-xl" />
            <h1 className="text-xl font-bold text-foreground">DOKB Portal</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground">Masuk ke Portal</h2>
            <p className="mt-2 text-muted-foreground">Silakan masuk menggunakan akun Anda</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@dokb.or.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-11" disabled={loading}>
              {loading ? "Memproses..." : "Masuk"}
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            © 2024 Perkumpulan Driver Online Kalimantan Selatan Bersatu
          </p>
        </div>
      </div>
    </div>
  );
}
