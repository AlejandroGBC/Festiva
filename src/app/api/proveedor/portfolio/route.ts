import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

interface DBTrabajoPortafolio {
    id_portafolio: string;
    titulo: string;
    descripcion: string | null;
    id_contratacion: string | null;
    tbl_portafolio_imagenes: { imagen_url: string }[];
}

export async function GET() {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { data, error } = await supabase
        .from("tbl_trabajos_portafolio")
        .select(`
            id_portafolio,
            titulo,
            descripcion,
            id_contratacion,
            tbl_portafolio_imagenes ( imagen_url )
        `)
        .eq("id_proveedor", user.id)
        .order("creado_en", { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const items = ((data as unknown) as DBTrabajoPortafolio[])?.map((t) => ({
        id: t.id_portafolio,
        title: t.titulo,
        description: t.descripcion || "",
        location: "", 
        imageUrl: t.tbl_portafolio_imagenes?.[0]?.imagen_url || "",
        isVerified: Boolean(t.id_contratacion),
    })) || [];

    return NextResponse.json({ items });
}

export async function POST(request: Request) {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { id, title, description, imageUrl } = body;

    if (id) {
        const { error: updateErr } = await supabase
            .from("tbl_trabajos_portafolio")
            .update({
                titulo: title,
                descripcion: description,
            })
        .eq("id_portafolio", id)
        .eq("id_proveedor", user.id);

        if (updateErr) {
            return NextResponse.json({ error: updateErr.message }, { status: 500 });
        }

        if (imageUrl) {
            await supabase
                .from("tbl_portafolio_imagenes")
                .delete()
                .eq("id_portafolio", id);

            await supabase
                .from("tbl_portafolio_imagenes")
                .insert({ id_portafolio: id, imagen_url: imageUrl });
            }
    } else {
        const { data: newWork, error: insertErr } = await supabase
            .from("tbl_trabajos_portafolio")
            .insert({
                id_proveedor: user.id,
                titulo: title,
                descripcion: description,
            })
        .select("id_portafolio")
        .single();

        if (insertErr || !newWork) {
            return NextResponse.json({ error: insertErr?.message || "Error al crear caso" }, { status: 500 });
        }

        if (imageUrl) {
            await supabase.from("tbl_portafolio_imagenes").insert({
                id_portafolio: newWork.id_portafolio,
                imagen_url: imageUrl,
            });
        }
    }

    return GET();
}

export async function DELETE(request: Request) {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });
    }

    await supabase
        .from("tbl_portafolio_imagenes")
        .delete()
        .eq("id_portafolio", id);

    const { error } = await supabase
        .from("tbl_trabajos_portafolio")
        .delete()
        .eq("id_portafolio", id)
        .eq("id_proveedor", user.id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return GET();
}