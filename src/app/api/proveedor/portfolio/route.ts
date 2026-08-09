import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import { NextResponse } from "next/server";

interface DBTrabajoPortafolio {
    id_portafolio: string;
    titulo: string;
    descripcion: string | null;
    id_contratacion: string | null;
    tbl_portafolio_imagenes: { imagen_url: string }[];
}

function extractStoragePath(fullUrl: string, bucketName: string = "portafolio"): string | null {
    if (!fullUrl) return null;
    
    const token = `/${bucketName}/`;
    if (fullUrl.includes(token)) {
        const relative = fullUrl.split(token)[1];
        return relative ? decodeURIComponent(relative.split("?")[0]) : null;
    }
    
    return decodeURIComponent(fullUrl.split("?")[0]);
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
        imageUrls: t.tbl_portafolio_imagenes?.map((img) => img.imagen_url) || [],
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
    const { id, title, description, imageUrls = [], removedImageUrls = [] } = body;
    
    let portfolioId = id;

    if (portfolioId) {
        const { error: updateErr } = await supabase
            .from("tbl_trabajos_portafolio")
            .update({
                titulo: title,
                descripcion: description,
            })
            .eq("id_portafolio", portfolioId)
            .eq("id_proveedor", user.id);

        if (updateErr) {
            return NextResponse.json({ error: updateErr.message }, { status: 500 });
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
            return NextResponse.json({ error: insertErr?.message || "Error al crear trabajo" }, { status: 500 });
        }
        portfolioId = newWork.id_portafolio;
    }

    if (removedImageUrls.length > 0) {
        const pathsToDelete = removedImageUrls
            .map((url: string) => extractStoragePath(url, "portafolio"))
            .filter((p: string | null): p is string => Boolean(p));

        if (pathsToDelete.length > 0) {
            const adminSupabase = createServiceRoleClient();
            await adminSupabase.storage.from("portafolio").remove(pathsToDelete);
        }

        await supabase
            .from("tbl_portafolio_imagenes")
            .delete()
            .eq("id_portafolio", portfolioId)
            .in("imagen_url", removedImageUrls);
    }

    
    if (imageUrls.length > 0) {
        const { data: existingImgData } = await supabase
            .from("tbl_portafolio_imagenes")
            .select("imagen_url")
            .eq("id_portafolio", portfolioId);

        const existingUrls = new Set(existingImgData?.map((img) => img.imagen_url) || []);
        const newUrlsToInsert = imageUrls.filter((url: string) => !existingUrls.has(url));

        if (newUrlsToInsert.length > 0) {
            const recordsToInsert = newUrlsToInsert.map((url: string) => ({
                id_portafolio: portfolioId,
                imagen_url: url,
            }));
            await supabase.from("tbl_portafolio_imagenes").insert(recordsToInsert);
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

    const { data: images } = await supabase
        .from("tbl_portafolio_imagenes")
        .select("imagen_url")
        .eq("id_portafolio", id);

    if (images && images.length > 0) {
        const pathsToDelete = images
            .map((img) => extractStoragePath(img.imagen_url, "portafolio"))
            .filter((p): p is string => Boolean(p));

        if (pathsToDelete.length > 0) {
            const adminSupabase = createServiceRoleClient();
            await adminSupabase.storage.from("portafolio").remove(pathsToDelete);
        }
    }

    await supabase.from("tbl_portafolio_imagenes").delete().eq("id_portafolio", id);

    const { error: dbErr } = await supabase
        .from("tbl_trabajos_portafolio")
        .delete()
        .eq("id_portafolio", id)
        .eq("id_proveedor", user.id);

    if (dbErr) {
        return NextResponse.json({ error: dbErr.message }, { status: 500 });
    }

    return GET();
}