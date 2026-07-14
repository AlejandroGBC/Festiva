export function obtenerIniciales(nombreCompleto: string | undefined): string {
    if(!nombreCompleto) return ''
    
    const palabras = nombreCompleto.trim().split(/\s+/);

    const primera = palabras[0]?.[0] ?? "";
    const segunda = palabras[1]?.[0] ?? "";

    return (primera + segunda).toUpperCase();
}