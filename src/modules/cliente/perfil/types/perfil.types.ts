/**
 * Ubicación sugerida:
 *   src/modules/cliente/perfil/types/perfil.types.ts
 */

export interface PerfilClienteData {
  nombreCompleto: string;
  correo: string;
  telefono: string | null;
  fotoPerfilUrl: string | null;
  clienteDesde: string; // ISO date (tbl_perfiles_cliente.creado_en)
  cuentaActiva: boolean;
  totalEventos: number;
  totalProveedores: number;
  totalResenas: number;
}