"use client";

/**
 * Ubicación sugerida:
 *   src/modules/cliente/anuncio/hooks/use-crear-evento.ts
 *
 * Regla del proyecto: los hooks son solo para estado UI (useState,
 * eventos, interacción). Toda la lógica de red vive en
 * services/eventos.service.ts; este hook solo la invoca y guarda el
 * resultado / loading / error en estado local.
 */

import { useState } from "react";
import {
  generarPropuestaIA,
  publicarEvento,
} from "@/modules/cliente/anuncio/services/eventos.service";
import type { PropuestaIA } from "@/modules/cliente/anuncio/types/anuncios.types";

interface UseCrearEventoParams {
  onPublicado?: () => void;
}

export function useCrearEvento({ onPublicado }: UseCrearEventoParams = {}) {
  // Paso 1 — IA
  const [descripcionIA, setDescripcionIA] = useState("");
  const [cargandoIA, setCargandoIA] = useState(false);
  const [propuestaIA, setPropuestaIA] = useState<PropuestaIA | null>(null);
  const [errorIA, setErrorIA] = useState("");
  const [iaExitosa, setIaExitosa] = useState(false);

  // Paso 2 — Datos básicos
  const [nombre, setNombre] = useState("");
  const [tipoEvento, setTipoEvento] = useState("Boda");
  const [fecha, setFecha] = useState("");
  const [invitados, setInvitados] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [lugar, setLugar] = useState("");

  // Paso 3 — Detalles
  const [presupuestoMin, setPresupuestoMin] = useState("");
  const [presupuestoMax, setPresupuestoMax] = useState("");
  const [servicios, setServicios] = useState<string[]>([
    "Decoración",
    "Fotografía",
    "Catering",
  ]);
  const [descripcion, setDescripcion] = useState("");
  const [cargandoDesc, setCargandoDesc] = useState(false);

  // Paso 4 — Publicar
  const [publicando, setPublicando] = useState(false);
  const [errorPublicar, setErrorPublicar] = useState("");

  function toggleServicio(servicio: string) {
    setServicios((prev) =>
      prev.includes(servicio)
        ? prev.filter((s) => s !== servicio)
        : [...prev, servicio]
    );
  }

  function aplicarPropuesta(d: PropuestaIA) {
    if (d.tipo_evento) setTipoEvento(d.tipo_evento);
    if (d.fecha) setFecha(d.fecha);
    if (d.num_invitados) setInvitados(String(d.num_invitados));
    if (d.presupuesto_min) setPresupuestoMin(String(d.presupuesto_min));
    if (d.presupuesto_max) setPresupuestoMax(String(d.presupuesto_max));
    if (d.ciudad) setCiudad(d.ciudad);
    if (d.lugar) setLugar(d.lugar);
    if (d.descripcion_optimizada) setDescripcion(d.descripcion_optimizada);
    if (d.servicios_sugeridos?.length) {
      setServicios((prev) =>
        Array.from(new Set([...prev, ...d.servicios_sugeridos!]))
      );
    }
  }

  async function handleGenerarIA() {
    if (!descripcionIA.trim()) return;
    setCargandoIA(true);
    setPropuestaIA(null);
    setErrorIA("");

    try {
      const d = await generarPropuestaIA(descripcionIA);
      setPropuestaIA(d);
      setIaExitosa(true);
      setTimeout(() => setIaExitosa(false), 3000);
      aplicarPropuesta(d);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Error desconocido";
      console.error("Error IA:", msg);
      setErrorIA(msg);
    } finally {
      setCargandoIA(false);
    }
  }

  async function handleGenerarDescripcion() {
    if (!descripcionIA.trim()) return;
    setCargandoDesc(true);
    try {
      const d = await generarPropuestaIA(descripcionIA);
      if (d.descripcion_optimizada) setDescripcion(d.descripcion_optimizada);
    } catch (e) {
      console.error(e);
    } finally {
      setCargandoDesc(false);
    }
  }

  async function handlePublicar() {
    setPublicando(true);
    setErrorPublicar("");
    try {
      await publicarEvento({
        nombre,
        tipoEvento,
        fecha,
        invitados,
        ciudad,
        lugar,
        presupuestoMin,
        presupuestoMax,
        servicios,
        descripcion,
        descripcionIA,
      });
      onPublicado?.();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "No se pudo publicar el evento";
      console.error("Error al publicar:", msg);
      setErrorPublicar(msg);
    } finally {
      setPublicando(false);
    }
  }

  return {
    descripcionIA,
    setDescripcionIA,
    cargandoIA,
    propuestaIA,
    errorIA,
    iaExitosa,
    handleGenerarIA,
    nombre,
    setNombre,
    tipoEvento,
    setTipoEvento,
    fecha,
    setFecha,
    invitados,
    setInvitados,
    ciudad,
    setCiudad,
    lugar,
    setLugar,
    presupuestoMin,
    setPresupuestoMin,
    presupuestoMax,
    setPresupuestoMax,
    servicios,
    toggleServicio,
    descripcion,
    setDescripcion,
    cargandoDesc,
    handleGenerarDescripcion,
    publicando,
    errorPublicar,
    handlePublicar,
  };
}