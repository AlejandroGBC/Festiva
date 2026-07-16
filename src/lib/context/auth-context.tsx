"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";
import { UsuarioSesion } from "@/shared/types/auth.types";

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
      .select("id_usuario, correo, nombre_completo, rol")
      .eq("id_usuario", authUser.id)
      .single();

    if (perfil) {
      setUser({
        id: perfil.id_usuario,
        correo: perfil.correo,
        nombre: perfil.nombre_completo,
        rol: perfil.rol,
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