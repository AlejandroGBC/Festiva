import usuarioCliente from "@/shared/mocks/usuarioCliente";
import SearchBar from "@/shared/components/SearchBar";

export default function InicioPage() {
    return (
        <section>
            <div className="pb-7">
                <p className="text-festiva-midnight-blue/45 text-sm pb-2">Buenos dias</p>
                <h1 className="text-festiva-midnight-blue font-bold text-3xl">{usuarioCliente.soloNombre}</h1>
            </div>
            <SearchBar showButton placeholder="Buscar proveedores o servicios"/>
            
        </section>
    );
}
