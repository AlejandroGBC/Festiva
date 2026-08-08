"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";
import { UsuarioSesion, RolUsuario } from "@/shared/types/auth.types";

interface AuthContextValue {
  user: UsuarioSesion | null;
  isLoading: boolean;
  refetch: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UsuarioSesion | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  async function cargarUsuario() {
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    const { data: perfil } = await supabase
      .from("tbl_usuarios")
      .select("id_usuario, correo, nombre_completo, rol, foto_perfil_url")
      .eq("id_usuario", authUser.id)
      .single();

    if (perfil) {
      setUser({
        id: perfil.id_usuario,
        correo: perfil.correo,
        nombre: perfil.nombre_completo,
        // El enum real de la DB incluye 'admin', pero RolUsuario lo excluye
        // a propósito (esta app no maneja sesiones de admin). Si algún día
        // se necesita, hay que agregar 'admin' a RolUsuario en vez de
        // sacar este cast.
        rol: perfil.rol as RolUsuario,
        foto_perfil_url: perfil.foto_perfil_url,
      });
    } else {
      setUser(null);
    }

    setIsLoading(false);
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  useEffect(() => {
    cargarUsuario();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      cargarUsuario();
    });

    return () => {
      listener.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, refetch: cargarUsuario, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de <AuthProvider>");
  }
  return context;
}