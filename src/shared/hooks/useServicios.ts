"use client";

import { useEffect, useState } from "react";
import { Servicio } from "@/shared/types/servicio.types";
import { obtenerServicios } from "../services/servicios.service";

const PAGE_SIZE = 8;

export function useServicios() {
  const [items, setItems] = useState<Servicio[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function cargarPagina(pageActual: number, esInicial: boolean) {
    if (esInicial) {
      setIsLoading(true);
    } else {
      setIsLoadingMore(true);
    }

    setError(null);

    try {
      const data = await obtenerServicios(pageActual, PAGE_SIZE);
      setItems((prev) => (esInicial ? data.items : [...prev, ...data.items]));
      setTotalPages(data.totalPages);
      setPage(data.page);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudieron cargar los servicios");
    } finally {
      if (esInicial) {
        setIsLoading(false);
      } else {
        setIsLoadingMore(false);
      }
    }
  }

  useEffect(() => {
    cargarPagina(1, true);
  }, []);

  function cargarMas() {
    if (page < totalPages && !isLoadingMore) {
      cargarPagina(page + 1, false);
    }
  }

  return {
    servicios: items,
    isLoading,
    isLoadingMore,
    error,
    hayMasPaginas: page < totalPages,
    cargarMas,
  };
}