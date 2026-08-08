"use client";

/**
 * La búsqueda es interactiva: debounce de 350ms antes de consultar,
 * para no disparar una query por cada letra que tipea el usuario.
 */

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, SlidersHorizontal } from "lucide-react";

import Header from "@/shared/components/HeaderInicio";
import Sidebar from "@/shared/components/Sidebar";
import Card from "@/shared/components/Card";
import Button from "@/shared/components/Button";
import { useAuthContext } from "@/lib/context/auth-context";

import { buscarProveedores } from "@/modules/cliente/proveedores/services/proveedores-busqueda.service";
import ProveedorListItem from "@/modules/cliente/proveedores/components/ProveedorListItem";
import { CategoriaInicio } from "../../inicio/types/inicio.types";
import { ProveedorTarjeta } from "../types/proveedor.types";
import { clienteLinks, proveedorLinks } from "@/shared/constant/sidebarLinks";

interface BuscarProveedoresVistaProps {
  categorias: CategoriaInicio[];
  resultadosIniciales: ProveedorTarjeta[];
  tieneNotificacionesNuevas?: boolean;
}

export default function BuscarProveedoresVista({
  categorias,
  resultadosIniciales,
  tieneNotificacionesNuevas,
}: BuscarProveedoresVistaProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, signOut } = useAuthContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const categoriaDesdeUrl = searchParams.get("categoria");

  const [busqueda, setBusqueda] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState<string>(categoriaDesdeUrl ?? "Todas");
  const [resultados, setResultados] = useState<ProveedorTarjeta[]>(resultadosIniciales);
  const [cargando, setCargando] = useState(false);
  const primerRender = useRef(true);
  const mainLinks = user?.rol === "cliente" ? clienteLinks : proveedorLinks;


  const idCategoriaActiva =
    categoriaActiva === "Todas"
      ? null
      : Number(categorias.find((c) => c.nombre === categoriaActiva)?.id ?? null);

  useEffect(() => {
    // Si llegamos con ?categoria= desde la página de Categorías, los
    // resultadosIniciales (destacados sin filtrar) no sirven — hay que
    // buscar ya mismo. Si no, evitamos la búsqueda redundante al montar.
    if (primerRender.current && !categoriaDesdeUrl) {
      primerRender.current = false;
      return;
    }
    primerRender.current = false;

    setCargando(true);
    const timer = setTimeout(async () => {
      const data = await buscarProveedores(busqueda, idCategoriaActiva);
      setResultados(data);
      setCargando(false);
    }, 350);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busqueda, categoriaActiva]);

  return (
    <div className="relative min-h-dvh bg-[#F5F2FA] flex flex-col overflow-y-scroll no-scrollbar">
      <Header
        user={user!}
        onMenuClick={() => setSidebarOpen(true)}
        tieneNotificacionesNuevas={tieneNotificacionesNuevas}
      />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} user={user!} signOut={signOut} mainLinks={mainLinks} />

      <section className="px-5 flex-1 pb-6">
        <h1 className="text-festiva-midnight-blue font-bold text-xl pt-1 pb-4 m-0">
          Buscar proveedores
        </h1>

        {/* Barra de búsqueda */}
        <div className="flex items-center gap-2 bg-white border-2 border-festiva-electric-violet rounded-2xl px-3.5 py-2.5">
          <Search size={18} className="text-festiva-electric-violet shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Buscar por nombre, servicio o ciudad..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[15px] text-festiva-midnight-blue placeholder:text-festiva-midnight-blue/40"
          />
          {busqueda && (
            <button onClick={() => setBusqueda("")} className="text-festiva-midnight-blue/40">
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filtro de categorías */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 mt-3 mb-4 [scrollbar-width:none]">
          <Button
            variant={categoriaActiva === "Todas" ? "dark" : "light"}
            shape="pill"
            size="sm"
            onClick={() => setCategoriaActiva("Todas")}
            className="!h-8 !px-3 !text-[11px] whitespace-nowrap shrink-0"
          >
            Todas
          </Button>
          {categorias.map((cat) => (
            <Button
              key={cat.id}
              variant={categoriaActiva === cat.nombre ? "dark" : "light"}
              shape="pill"
              size="sm"
              onClick={() => setCategoriaActiva(cat.nombre)}
              className="!h-8 !px-3 !text-[11px] whitespace-nowrap shrink-0"
            >
              {cat.nombre}
            </Button>
          ))}
        </div>

        {/* Contador */}
        <p className="text-[13px] text-festiva-midnight-blue/50 mb-3">
          <span className="font-bold text-festiva-midnight-blue">{resultados.length}</span> resultado
          {resultados.length === 1 ? "" : "s"}
          {busqueda && (
            <>
              {" "}
              para &ldquo;<span className="text-festiva-midnight-blue">{busqueda}</span>&rdquo;
            </>
          )}
        </p>

        {/* Resultados */}
        {cargando ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[92px] rounded-2xl bg-white/60 animate-pulse" />
            ))}
          </div>
        ) : resultados.length === 0 ? (
          <Card className="text-center py-14">
            <div className="w-14 h-14 rounded-full bg-[#F5F2FA] flex items-center justify-center mx-auto mb-3 text-festiva-midnight-blue/20">
              <SlidersHorizontal size={24} />
            </div>
            <h3 className="font-bold text-base text-festiva-midnight-blue mb-1">
              No se encontraron proveedores
            </h3>
            <p className="text-[13px] text-festiva-midnight-blue/50">
              Probá con otros términos de búsqueda o cambiá el filtro
            </p>
          </Card>
        ) : (
          <div className="flex flex-col gap-3">
            {resultados.map((proveedor) => (
              <ProveedorListItem
                key={proveedor.id_proveedor}
                proveedor={proveedor}
                onClick={() => router.push(`/cliente/proveedores/${proveedor.id_proveedor}`)}
              />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}