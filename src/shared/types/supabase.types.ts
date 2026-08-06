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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      tbl_calificaciones: {
        Row: {
          comentario: string | null
          creada_en: string | null
          id_calificacion: string
          id_contratacion: string
          puntuacion: number
        }
        Insert: {
          comentario?: string | null
          creada_en?: string | null
          id_calificacion?: string
          id_contratacion: string
          puntuacion: number
        }
        Update: {
          comentario?: string | null
          creada_en?: string | null
          id_calificacion?: string
          id_contratacion?: string
          puntuacion?: number
        }
        Relationships: [
          {
            foreignKeyName: "tbl_calificaciones_id_contratacion_fkey"
            columns: ["id_contratacion"]
            isOneToOne: true
            referencedRelation: "tbl_contrataciones"
            referencedColumns: ["id_contratacion"]
          },
        ]
      }
      tbl_contrataciones: {
        Row: {
          creado_en: string | null
          estado_servicio:
            | Database["public"]["Enums"]["estado_evento_enum"]
            | null
          id_contratacion: string
          id_evento: string
          id_proveedor: string
        }
        Insert: {
          creado_en?: string | null
          estado_servicio?:
            | Database["public"]["Enums"]["estado_evento_enum"]
            | null
          id_contratacion?: string
          id_evento: string
          id_proveedor: string
        }
        Update: {
          creado_en?: string | null
          estado_servicio?:
            | Database["public"]["Enums"]["estado_evento_enum"]
            | null
          id_contratacion?: string
          id_evento?: string
          id_proveedor?: string
        }
        Relationships: [
          {
            foreignKeyName: "tbl_contrataciones_id_evento_id_proveedor_fkey"
            columns: ["id_evento", "id_proveedor"]
            isOneToOne: false
            referencedRelation: "tbl_ofertas"
            referencedColumns: ["id_evento", "id_proveedor"]
          },
        ]
      }
      tbl_conversaciones: {
        Row: {
          creado_en: string | null
          id_conversacion: string
          id_evento: string
          id_proveedor: string
        }
        Insert: {
          creado_en?: string | null
          id_conversacion?: string
          id_evento: string
          id_proveedor: string
        }
        Update: {
          creado_en?: string | null
          id_conversacion?: string
          id_evento?: string
          id_proveedor?: string
        }
        Relationships: [
          {
            foreignKeyName: "tbl_conversaciones_id_evento_fkey"
            columns: ["id_evento"]
            isOneToOne: false
            referencedRelation: "tbl_eventos"
            referencedColumns: ["id_evento"]
          },
          {
            foreignKeyName: "tbl_conversaciones_id_proveedor_fkey"
            columns: ["id_proveedor"]
            isOneToOne: false
            referencedRelation: "tbl_perfiles_proveedor"
            referencedColumns: ["id_proveedor"]
          },
        ]
      }
      tbl_evento_servicios: {
        Row: {
          id_evento: string
          id_servicio: number
        }
        Insert: {
          id_evento: string
          id_servicio: number
        }
        Update: {
          id_evento?: string
          id_servicio?: number
        }
        Relationships: [
          {
            foreignKeyName: "tbl_evento_servicios_id_evento_fkey"
            columns: ["id_evento"]
            isOneToOne: false
            referencedRelation: "tbl_eventos"
            referencedColumns: ["id_evento"]
          },
          {
            foreignKeyName: "tbl_evento_servicios_id_servicio_fkey"
            columns: ["id_servicio"]
            isOneToOne: false
            referencedRelation: "tbl_servicios"
            referencedColumns: ["id_servicio"]
          },
        ]
      }
      tbl_eventos: {
        Row: {
          cantidad_invitados: number
          creado_en: string | null
          descripcion: string
          estado: Database["public"]["Enums"]["estado_evento_enum"] | null
          fecha_evento: string
          id_cliente: string
          id_evento: string
          id_tipo_evento: number
          presupuesto_max: number | null
          presupuesto_min: number | null
          prompt_origen_ia: string | null
          titulo: string
          ubicacion: string
        }
        Insert: {
          cantidad_invitados: number
          creado_en?: string | null
          descripcion: string
          estado?: Database["public"]["Enums"]["estado_evento_enum"] | null
          fecha_evento: string
          id_cliente: string
          id_evento?: string
          id_tipo_evento: number
          presupuesto_max?: number | null
          presupuesto_min?: number | null
          prompt_origen_ia?: string | null
          titulo: string
          ubicacion: string
        }
        Update: {
          cantidad_invitados?: number
          creado_en?: string | null
          descripcion?: string
          estado?: Database["public"]["Enums"]["estado_evento_enum"] | null
          fecha_evento?: string
          id_cliente?: string
          id_evento?: string
          id_tipo_evento?: number
          presupuesto_max?: number | null
          presupuesto_min?: number | null
          prompt_origen_ia?: string | null
          titulo?: string
          ubicacion?: string
        }
        Relationships: [
          {
            foreignKeyName: "tbl_eventos_id_cliente_fkey"
            columns: ["id_cliente"]
            isOneToOne: false
            referencedRelation: "tbl_perfiles_cliente"
            referencedColumns: ["id_cliente"]
          },
          {
            foreignKeyName: "tbl_eventos_id_tipo_evento_fkey"
            columns: ["id_tipo_evento"]
            isOneToOne: false
            referencedRelation: "tbl_tipo_evento"
            referencedColumns: ["id_tipo_evento"]
          },
        ]
      }
      tbl_mensajes: {
        Row: {
          contenido: string
          creado_en: string | null
          id_conversacion: string
          id_mensaje: string
          id_remitente: string
          leido_en: string | null
        }
        Insert: {
          contenido: string
          creado_en?: string | null
          id_conversacion: string
          id_mensaje?: string
          id_remitente: string
          leido_en?: string | null
        }
        Update: {
          contenido?: string
          creado_en?: string | null
          id_conversacion?: string
          id_mensaje?: string
          id_remitente?: string
          leido_en?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tbl_mensajes_id_conversacion_fkey"
            columns: ["id_conversacion"]
            isOneToOne: false
            referencedRelation: "tbl_conversaciones"
            referencedColumns: ["id_conversacion"]
          },
          {
            foreignKeyName: "tbl_mensajes_id_remitente_fkey"
            columns: ["id_remitente"]
            isOneToOne: false
            referencedRelation: "tbl_usuarios"
            referencedColumns: ["id_usuario"]
          },
        ]
      }
      tbl_oferta_items_incluidos: {
        Row: {
          descripcion_item: string
          id_evento: string
          id_item: string
          id_proveedor: string
        }
        Insert: {
          descripcion_item: string
          id_evento: string
          id_item?: string
          id_proveedor: string
        }
        Update: {
          descripcion_item?: string
          id_evento?: string
          id_item?: string
          id_proveedor?: string
        }
        Relationships: [
          {
            foreignKeyName: "tbl_oferta_items_incluidos_id_evento_id_proveedor_fkey"
            columns: ["id_evento", "id_proveedor"]
            isOneToOne: false
            referencedRelation: "tbl_ofertas"
            referencedColumns: ["id_evento", "id_proveedor"]
          },
        ]
      }
      tbl_ofertas: {
        Row: {
          creada_en: string | null
          descripcion_servicio: string | null
          estado: Database["public"]["Enums"]["estado_oferta_enum"] | null
          id_evento: string
          id_proveedor: string
          precio_total: number
        }
        Insert: {
          creada_en?: string | null
          descripcion_servicio?: string | null
          estado?: Database["public"]["Enums"]["estado_oferta_enum"] | null
          id_evento: string
          id_proveedor: string
          precio_total: number
        }
        Update: {
          creada_en?: string | null
          descripcion_servicio?: string | null
          estado?: Database["public"]["Enums"]["estado_oferta_enum"] | null
          id_evento?: string
          id_proveedor?: string
          precio_total?: number
        }
        Relationships: [
          {
            foreignKeyName: "tbl_ofertas_id_evento_fkey"
            columns: ["id_evento"]
            isOneToOne: false
            referencedRelation: "tbl_eventos"
            referencedColumns: ["id_evento"]
          },
          {
            foreignKeyName: "tbl_ofertas_id_proveedor_fkey"
            columns: ["id_proveedor"]
            isOneToOne: false
            referencedRelation: "tbl_perfiles_proveedor"
            referencedColumns: ["id_proveedor"]
          },
        ]
      }
      tbl_pagos: {
        Row: {
          comision_festiva: number
          creado_en: string | null
          estado_pago: Database["public"]["Enums"]["estado_pago_enum"] | null
          id_pago: string
          metodo_pago: string | null
          monto_proveedor: number
          monto_total: number
          tarjeta_mascara: string | null
        }
        Insert: {
          comision_festiva: number
          creado_en?: string | null
          estado_pago?: Database["public"]["Enums"]["estado_pago_enum"] | null
          id_pago: string
          metodo_pago?: string | null
          monto_proveedor: number
          monto_total: number
          tarjeta_mascara?: string | null
        }
        Update: {
          comision_festiva?: number
          creado_en?: string | null
          estado_pago?: Database["public"]["Enums"]["estado_pago_enum"] | null
          id_pago?: string
          metodo_pago?: string | null
          monto_proveedor?: number
          monto_total?: number
          tarjeta_mascara?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tbl_pagos_id_pago_fkey"
            columns: ["id_pago"]
            isOneToOne: true
            referencedRelation: "tbl_contrataciones"
            referencedColumns: ["id_contratacion"]
          },
        ]
      }
      tbl_perfiles_cliente: {
        Row: {
          activo: boolean | null
          creado_en: string | null
          direccion_defecto: string | null
          id_cliente: string
          notificaciones_vistas_en: string | null
        }
        Insert: {
          activo?: boolean | null
          creado_en?: string | null
          direccion_defecto?: string | null
          id_cliente: string
          notificaciones_vistas_en?: string | null
        }
        Update: {
          activo?: boolean | null
          creado_en?: string | null
          direccion_defecto?: string | null
          id_cliente?: string
          notificaciones_vistas_en?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tbl_perfiles_cliente_id_cliente_fkey"
            columns: ["id_cliente"]
            isOneToOne: true
            referencedRelation: "tbl_usuarios"
            referencedColumns: ["id_usuario"]
          },
        ]
      }
      tbl_perfiles_proveedor: {
        Row: {
          creado_en: string | null
          cuenta_bancaria_mascara: string | null
          descripcion: string | null
          id_proveedor: string
          nombre_comercial: string
          ubicacion_base: string
        }
        Insert: {
          creado_en?: string | null
          cuenta_bancaria_mascara?: string | null
          descripcion?: string | null
          id_proveedor: string
          nombre_comercial: string
          ubicacion_base: string
        }
        Update: {
          creado_en?: string | null
          cuenta_bancaria_mascara?: string | null
          descripcion?: string | null
          id_proveedor?: string
          nombre_comercial?: string
          ubicacion_base?: string
        }
        Relationships: [
          {
            foreignKeyName: "tbl_perfiles_proveedor_id_proveedor_fkey"
            columns: ["id_proveedor"]
            isOneToOne: true
            referencedRelation: "tbl_usuarios"
            referencedColumns: ["id_usuario"]
          },
        ]
      }
      tbl_portafolio_imagenes: {
        Row: {
          id_imagen: string
          id_portafolio: string
          imagen_url: string
          subido_en: string | null
        }
        Insert: {
          id_imagen?: string
          id_portafolio: string
          imagen_url: string
          subido_en?: string | null
        }
        Update: {
          id_imagen?: string
          id_portafolio?: string
          imagen_url?: string
          subido_en?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tbl_portafolio_imagenes_id_portafolio_fkey"
            columns: ["id_portafolio"]
            isOneToOne: false
            referencedRelation: "tbl_trabajos_portafolio"
            referencedColumns: ["id_portafolio"]
          },
        ]
      }
      tbl_proveedor_servicios: {
        Row: {
          id_proveedor: string
          id_servicio: number
        }
        Insert: {
          id_proveedor: string
          id_servicio: number
        }
        Update: {
          id_proveedor?: string
          id_servicio?: number
        }
        Relationships: [
          {
            foreignKeyName: "tbl_proveedor_servicios_id_proveedor_fkey"
            columns: ["id_proveedor"]
            isOneToOne: false
            referencedRelation: "tbl_perfiles_proveedor"
            referencedColumns: ["id_proveedor"]
          },
          {
            foreignKeyName: "tbl_proveedor_servicios_id_servicio_fkey"
            columns: ["id_servicio"]
            isOneToOne: false
            referencedRelation: "tbl_servicios"
            referencedColumns: ["id_servicio"]
          },
        ]
      }
      tbl_push_subscriptions: {
        Row: {
          auth: string
          creado_en: string | null
          endpoint: string
          id_suscripcion: string
          id_usuario: string
          p256dh: string
        }
        Insert: {
          auth: string
          creado_en?: string | null
          endpoint: string
          id_suscripcion?: string
          id_usuario: string
          p256dh: string
        }
        Update: {
          auth?: string
          creado_en?: string | null
          endpoint?: string
          id_suscripcion?: string
          id_usuario?: string
          p256dh?: string
        }
        Relationships: [
          {
            foreignKeyName: "tbl_push_subscriptions_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "tbl_usuarios"
            referencedColumns: ["id_usuario"]
          },
        ]
      }
      tbl_servicios: {
        Row: {
          id_servicio: number
          nombre: string
        }
        Insert: {
          id_servicio?: number
          nombre: string
        }
        Update: {
          id_servicio?: number
          nombre?: string
        }
        Relationships: []
      }
      tbl_tipo_evento: {
        Row: {
          descripcion: string | null
          id_tipo_evento: number
          nombre: string
        }
        Insert: {
          descripcion?: string | null
          id_tipo_evento?: number
          nombre: string
        }
        Update: {
          descripcion?: string | null
          id_tipo_evento?: number
          nombre?: string
        }
        Relationships: []
      }
      tbl_trabajos_portafolio: {
        Row: {
          creado_en: string | null
          descripcion: string | null
          id_contratacion: string | null
          id_portafolio: string
          id_proveedor: string
          titulo: string
        }
        Insert: {
          creado_en?: string | null
          descripcion?: string | null
          id_contratacion?: string | null
          id_portafolio?: string
          id_proveedor: string
          titulo: string
        }
        Update: {
          creado_en?: string | null
          descripcion?: string | null
          id_contratacion?: string | null
          id_portafolio?: string
          id_proveedor?: string
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "tbl_trabajos_portafolio_id_contratacion_fkey"
            columns: ["id_contratacion"]
            isOneToOne: false
            referencedRelation: "tbl_contrataciones"
            referencedColumns: ["id_contratacion"]
          },
          {
            foreignKeyName: "tbl_trabajos_portafolio_id_proveedor_fkey"
            columns: ["id_proveedor"]
            isOneToOne: false
            referencedRelation: "tbl_perfiles_proveedor"
            referencedColumns: ["id_proveedor"]
          },
        ]
      }
      tbl_usuarios: {
        Row: {
          correo: string
          creado_en: string | null
          foto_perfil_url: string | null
          id_usuario: string
          nombre_completo: string
          rol: Database["public"]["Enums"]["tipo_usuario_enum"]
          telefono: string | null
        }
        Insert: {
          correo: string
          creado_en?: string | null
          foto_perfil_url?: string | null
          id_usuario?: string
          nombre_completo: string
          rol: Database["public"]["Enums"]["tipo_usuario_enum"]
          telefono?: string | null
        }
        Update: {
          correo?: string
          creado_en?: string | null
          foto_perfil_url?: string | null
          id_usuario?: string
          nombre_completo?: string
          rol?: Database["public"]["Enums"]["tipo_usuario_enum"]
          telefono?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      fn_conversacion_cerrada: {
        Args: { p_id_evento: string }
        Returns: boolean
      }
    }
    Enums: {
      estado_evento_enum:
        | "recibiendo_ofertas"
        | "en_proceso"
        | "finalizado"
        | "cancelado"
      estado_oferta_enum: "enviada" | "aceptada" | "rechazada" | "cancelada"
      estado_pago_enum: "pendiente" | "pagado" | "fallido" | "reembolsado"
      tipo_usuario_enum: "cliente" | "proveedor" | "admin"
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
      estado_evento_enum: [
        "recibiendo_ofertas",
        "en_proceso",
        "finalizado",
        "cancelado",
      ],
      estado_oferta_enum: ["enviada", "aceptada", "rechazada", "cancelada"],
      estado_pago_enum: ["pendiente", "pagado", "fallido", "reembolsado"],
      tipo_usuario_enum: ["cliente", "proveedor", "admin"],
    },
  },
} as const
