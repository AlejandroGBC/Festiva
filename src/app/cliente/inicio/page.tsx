import usuarioCliente from "@/shared/mocks/usuarioCliente";
import SearchBar from "@/shared/components/SearchBar";
import HeroBanner from "@/shared/components/HeroBanner";
import { Plus } from "lucide-react"
import { servicios } from "@/shared/mocks/servicios";
import { IconTile } from "@/shared/components/IconTile";
import SectionHeader from "@/shared/components/SectionHeader";
import { proveedoresDestacados } from "@/shared/mocks/proveedoresDestacados";
import { ProviderCard } from "@/shared/components/ProviderCard";


export default function InicioPage() {
    return (
        <section className="">
            <div className="pb-7">
                <p className="text-festiva-midnight-blue/45 text-sm pb-2">Buenos dias</p>
                <h1 className="text-festiva-midnight-blue font-bold text-3xl">{usuarioCliente.soloNombre}</h1>
            </div>
            <SearchBar showButton placeholder="Buscar proveedores o servicios" />
            <HeroBanner title="Publica tu evento y recibe propuestas" description="Los mejores proveedores compiten por tu evento">
                <button className="flex items-center gap-2 font-semibold text-white bg-festiva-euphoric-pink px-[1.125rem] py-[0.625rem] rounded-[999px] ">
                    <Plus size={16} />
                    Nuevo evento
                </button>
            </HeroBanner>

            <article className="my-6">
                <SectionHeader title="Categorias" accion="Ver todos" />
                <div className="flex justify-between text-center items-center">
                    {servicios.slice(0, 5).map((servicio) => (
                        <IconTile
                            key={servicio.id}
                            nombre={servicio.nombre}
                            Icon={servicio.icon}
                            iconColor={servicio.color.text}
                            bgColor={servicio.color.bg}
                        />))}
                </div>
            </article>
            <article className="my-6">
                <SectionHeader title="Proveedores destacados" accion="Ver todos" />
                <div className="flex justify-between">
                    {proveedoresDestacados.slice(0, 2).map((proveedor) =>
                        <ProviderCard key={proveedor.id} nombre={proveedor.nombre} categoria={proveedor.categoria} calificacion={proveedor.calificacion} 
                            cantidadCalificaciones={proveedor.cantidadCalificaciones} precio={proveedor.precioContratacion}
                            img={proveedor.link}/>
                    )}
                </div>
            </article>
        </section>
    );
}
