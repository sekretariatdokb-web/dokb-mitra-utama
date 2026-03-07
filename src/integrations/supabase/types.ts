export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          aktif: boolean
          created_at: string
          created_by: string | null
          id: string
          isi: string
          judul: string
          tanggal: string
          updated_at: string
        }
        Insert: {
          aktif?: boolean
          created_at?: string
          created_by?: string | null
          id?: string
          isi: string
          judul: string
          tanggal?: string
          updated_at?: string
        }
        Update: {
          aktif?: boolean
          created_at?: string
          created_by?: string | null
          id?: string
          isi?: string
          judul?: string
          tanggal?: string
          updated_at?: string
        }
        Relationships: []
      }
      members: {
        Row: {
          aplikasi: string | null
          created_at: string
          email: string | null
          id: string
          jenis_kendaraan: string | null
          kota: string | null
          nama_lengkap: string
          nomor_anggota: string
          nomor_hp: string | null
          plat_kendaraan: string | null
          status: string
          tahun_kendaraan: number | null
          tanggal_bergabung: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          aplikasi?: string | null
          created_at?: string
          email?: string | null
          id?: string
          jenis_kendaraan?: string | null
          kota?: string | null
          nama_lengkap: string
          nomor_anggota: string
          nomor_hp?: string | null
          plat_kendaraan?: string | null
          status?: string
          tahun_kendaraan?: number | null
          tanggal_bergabung?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          aplikasi?: string | null
          created_at?: string
          email?: string | null
          id?: string
          jenis_kendaraan?: string | null
          kota?: string | null
          nama_lengkap?: string
          nomor_anggota?: string
          nomor_hp?: string | null
          plat_kendaraan?: string | null
          status?: string
          tahun_kendaraan?: number | null
          tanggal_bergabung?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      registrations: {
        Row: {
          aplikasi: string
          created_at: string
          id: string
          jenis_kendaraan: string
          kota: string
          nama_lengkap: string
          nomor_hp: string
          plat_kendaraan: string
          reviewed_by: string | null
          status: string
        }
        Insert: {
          aplikasi: string
          created_at?: string
          id?: string
          jenis_kendaraan: string
          kota: string
          nama_lengkap: string
          nomor_hp: string
          plat_kendaraan: string
          reviewed_by?: string | null
          status?: string
        }
        Update: {
          aplikasi?: string
          created_at?: string
          id?: string
          jenis_kendaraan?: string
          kota?: string
          nama_lengkap?: string
          nomor_hp?: string
          plat_kendaraan?: string
          reviewed_by?: string | null
          status?: string
        }
        Relationships: []
      }
      reports: {
        Row: {
          bukti_url: string | null
          created_at: string
          deskripsi: string | null
          id: string
          judul: string
          kategori: string
          status: string
          submitted_by: string | null
        }
        Insert: {
          bukti_url?: string | null
          created_at?: string
          deskripsi?: string | null
          id?: string
          judul: string
          kategori: string
          status?: string
          submitted_by?: string | null
        }
        Update: {
          bukti_url?: string | null
          created_at?: string
          deskripsi?: string | null
          id?: string
          judul?: string
          kategori?: string
          status?: string
          submitted_by?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "super_admin" | "admin_pengurus" | "anggota_driver"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["super_admin", "admin_pengurus", "anggota_driver"],
    },
  },
} as const
