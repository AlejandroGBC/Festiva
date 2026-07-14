import { NextRequest } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import { UsuarioSesion } from "@/shared/types/auth.types";
import { apiError, apiSuccess } from "@/lib/api/api-response";

interface RegistroBody {
  nombreCompleto: string;
  correo: string;
  contrasena: string;
  rol: "cliente" | "proveedor";
  ciudad?: string;
  descripcion?: string;
  serviciosAdicionales?: number[];
}

export async function POST(request: NextRequest) {
  const body: RegistroBody = await request.json();
  const { nombreCompleto, correo, contrasena, rol } = body;

  if (!nombreCompleto || !correo || !contrasena || !rol) {
    return apiError("Faltan campos obligatorios", 400);
  }

  const supabase = await createServerSupabaseClient();

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: correo,
    password: contrasena,
    options: { data: { rol, nombre_completo: nombreCompleto } },
  });

  if (authError || !authData.user) {
    return apiError(authError?.message ?? "No se pudo crear el usuario", 400);
  }

  const userId = authData.user.id;
  const serviceClient = createServiceRoleClient();

  const { error: usuarioError } = await serviceClient.from("tbl_usuarios").insert({
    id_usuario: userId,
    nombre_completo: nombreCompleto,
    correo,
    rol,
  });

  if (usuarioError) {
    await serviceClient.auth.admin.deleteUser(userId);
    return apiError(usuarioError.message, 500);
  }

  const perfilInsert =
    rol === "cliente"
      ? serviceClient.from("tbl_perfiles_cliente").insert({ id_cliente: userId })
      : serviceClient.from("tbl_perfiles_proveedor").insert({
          id_proveedor: userId,
          nombre_comercial: nombreCompleto,
          descripcion: body.descripcion ?? null,
          ubicacion_base: body.ciudad ?? "",
        });

  const { error: perfilError } = await perfilInsert;

  if (perfilError) {
    await serviceClient.auth.admin.deleteUser(userId);
    return apiError(perfilError.message, 500);
  }

  if (rol === "proveedor" && body.serviciosAdicionales && body.serviciosAdicionales.length > 0) {
    const filasServicios = body.serviciosAdicionales.map((idServicio) => ({
      id_proveedor: userId,
      id_servicio: idServicio,
    }));

    const { error: serviciosError } = await serviceClient
      .from("tbl_proveedor_servicios")
      .insert(filasServicios);

    if (serviciosError) {
      console.error("Error insertando servicios del proveedor:", serviciosError.message);
    }
  }

  const data: UsuarioSesion & { requiereConfirmacionCorreo: boolean } = {
    id: userId,
    correo,
    rol,
    nombre: nombreCompleto,
    requiereConfirmacionCorreo: authData.session === null,
  };

  return apiSuccess(data, 201);
}