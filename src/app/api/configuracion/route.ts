import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET() {
    const supabase = await createServerSupabaseClient();

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { data: usuario, error: userError } = await supabase
        .from("tbl_usuarios")
        .select("id_usuario, nombre_completo, correo, telefono, rol")
        .eq("id_usuario", user.id)
        .single();

    if (userError || !usuario) {
        return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    let datosEspecificos = {};

    if (usuario.rol === "proveedor") {
        const { data: prov } = await supabase
        .from("tbl_perfiles_proveedor")
        .select("nombre_comercial, cuenta_bancaria_mascara")
        .eq("id_proveedor", user.id)
        .maybeSingle();

        datosEspecificos = {
        nombreComercial: prov?.nombre_comercial || usuario.nombre_completo,
        cuentaBancaria: prov?.cuenta_bancaria_mascara || "Sin registrar",
        };
    } else if (usuario.rol === "cliente") {
        const { data: cli } = await supabase
        .from("tbl_perfiles_cliente")
        .select("direccion_defecto")
        .eq("id_cliente", user.id)
        .maybeSingle();

        datosEspecificos = {
        direccionDefecto: cli?.direccion_defecto || null,
        };
    }

    const { data: pushSub } = await supabase
        .from("tbl_push_subscriptions")
        .select("id_suscripcion")
        .eq("id_usuario", user.id);

    return NextResponse.json({
        usuario: {
        id: usuario.id_usuario,
        nombre: usuario.nombre_completo,
        correo: usuario.correo,
        telefono: usuario.telefono,
        rol: usuario.rol,
        },
        pushNotificationsEnabled: Boolean(pushSub && pushSub.length > 0),
        ...datosEspecificos,
    });
}