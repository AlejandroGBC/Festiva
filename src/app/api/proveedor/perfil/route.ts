import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

interface ProveedorServicioJoin {
    tbl_servicios: {
        nombre: string;
    } | null;
}

export async function GET() {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { data: usuario, error: uErr } = await supabase
        .from("tbl_usuarios")
        .select("telefono, foto_perfil_url, nombre_completo")
        .eq("id_usuario", user.id)
        .single();

    const { data: perfil, error: pErr } = await supabase
        .from("tbl_perfiles_proveedor")
        .select("nombre_comercial, descripcion, ubicacion_base")
        .eq("id_proveedor", user.id)
        .single();

    if (uErr || pErr) {
        return NextResponse.json({ error: "Perfil no encontrado" }, { status: 404 });
    }

    const { data: serviciosData } = await supabase
        .from("tbl_proveedor_servicios")
        .select("tbl_servicios(nombre)")
        .eq("id_proveedor", user.id);
    
    const typedServicios = serviciosData as unknown as ProveedorServicioJoin[] | null;

    const specialties = typedServicios
        ?.map((s) => s.tbl_servicios?.nombre)
        .filter((nombre): nombre is string => Boolean(nombre)) || [];

    const { count: portfolioCount } = await supabase
        .from("tbl_trabajos_portafolio")
        .select("*", { count: 'exact', head: true })
        .eq("id_proveedor", user.id);

    let completed = 0;
    if (perfil.nombre_comercial) completed += 20;
    if (perfil.descripcion) completed += 20;
    if (perfil.ubicacion_base) completed += 15;
    if (usuario.telefono) completed += 15;
    if (specialties.length > 0) completed += 15;
    if ((portfolioCount || 0) > 0) completed += 15;

    return NextResponse.json({
        id_proveedor: user.id,
        businessName: perfil.nombre_comercial || usuario.nombre_completo,
        description: perfil.descripcion || "",
        city: perfil.ubicacion_base || "",
        phone: usuario.telefono || "",
        foto_perfil_url: usuario.foto_perfil_url || "",
        specialist: specialties[0] || "Proveedor General",
        completionPercentage: completed,
        initialSpecialties: specialties,
        availability: [
            { dayRange: "Lunes – Viernes", hours: "9:00 – 19:00", available: true },
            { dayRange: "Sábado", hours: "8:00 – 22:00", available: true },
            { dayRange: "Domingo", hours: "No disponible", available: false },
        ],
    });
}

export async function PUT(request: Request) {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { businessName, description, city, phone, foto_perfil_url, initialSpecialties } = body;

    const { error: userErr } = await supabase
        .from("tbl_usuarios")
        .update({
            telefono: phone,
            ...(foto_perfil_url && { foto_perfil_url }),
        })
        .eq("id_usuario", user.id);

    const { error: perfErr } = await supabase
        .from("tbl_perfiles_proveedor")
        .update({
            nombre_comercial: businessName,
            descripcion: description,
            ubicacion_base: city,
        })
        .eq("id_proveedor", user.id);

    if (userErr || perfErr) {
        return NextResponse.json({ error: "Error al actualizar perfil" }, { status: 500 });
    }

    if (Array.isArray(initialSpecialties)) {
        const serviceIds: number[] = [];

        for (const specName of initialSpecialties) {
            const cleanName = specName.trim();
            if (!cleanName) continue;

            const { data: existingService } = await supabase
                .from("tbl_servicios")
                .select("id_servicio")
                .ilike("nombre", cleanName)
                .maybeSingle();

            if (!existingService) {
                const { data: newService, error: createErr } = await supabase
                    .from("tbl_servicios")
                    .insert({ nombre: cleanName })
                    .select("id_servicio")
                    .single();

                if (!createErr && newService) {
                    serviceIds.push(newService.id_servicio);
                }
            } else {
                serviceIds.push(existingService.id_servicio);
            }
        }

        await supabase
            .from("tbl_proveedor_servicios")
            .delete()
            .eq("id_proveedor", user.id);

        if (serviceIds.length > 0) {
            const inserts = serviceIds.map((id_servicio) => ({
                id_proveedor: user.id,
                id_servicio,
            }));
            await supabase.from("tbl_proveedor_servicios").insert(inserts);
        }
    }

    return NextResponse.json({ success: true });
}