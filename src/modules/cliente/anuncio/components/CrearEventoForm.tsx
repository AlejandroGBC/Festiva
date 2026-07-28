"use client";

/**
 * Ubicación sugerida:
 *   src/modules/cliente/anuncio/components/CrearEventoForm.tsx
 *
 * Página wrapper — ya existe en tu repo en:
 *   src/app/cliente/eventos/crear/page.tsx  (URL real: /cliente/eventos/crear,
 *   "cliente" es carpeta real, no route group, por eso el middleware
 *   puede interceptar /cliente/*)
 *
 *   import CrearEventoForm from "@/modules/cliente/anuncio/components/CrearEventoForm";
 *   export default function Page() { return <CrearEventoForm />; }
 *
 * Notas sobre el mapeo a componentes reales:
 * - Chip no es seleccionable (no tiene onClick/selected), solo etiqueta.
 *   Para tipo de evento / servicios uso botones propios (TipoEventoChip /
 *   ServicioChip) con ícono + color por categoría, reusando
 *   servicio-icono.ts (servicios) y tipo-evento-icono.ts (tipos de
 *   evento) — el mismo sistema de color que ya usa el resto de la app
 *   (categorías del inicio, tarjetas de proveedor), para que se sienta
 *   coherente y no una paleta inventada solo para este form.
 * - TopNavbar solo acepta { title } y su flecha siempre hace router.back(),
 *   así que la uso como "salir del flujo"; el retroceso entre pasos lo
 *   manejan los botones "Volver" de cada paso (llaman a prevStep()).
 * - ProgressBar usa "percentage" (0-100), no step/total directo.
 */

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Sparkles,
  Check,
  Loader2,
  Calendar,
  Users,
  MapPin,
  Wallet,
  AlertCircle,
} from "lucide-react";

import Card from "@/shared/components/Card";
import SectionTitle from "@/shared/components/SectionTitle";
import Chip, { type BrandVariant } from "@/shared/components/Chip";
import Input from "@/shared/components/Input";
import Textarea from "@/shared/components/Textarea";
import Button from "@/shared/components/Button";
import ProgressBar from "@/shared/components/ProgressBar";
import TopNavbar from "@/shared/components/TopNavbar";
import Navbar from "@/shared/components/Navbar";

import { obtenerIconoServicio } from "@/shared/lib/servicio-icono";
import { obtenerIconoTipoEvento } from "@/shared/lib/tipo-evento-icono";
import { useCrearEvento } from "@/modules/cliente/anuncio/hooks/use-crear-evento";

const TIPOS_EVENTO = [
  "Boda",
  "Cumpleaños",
  "Graduación",
  "XV Años",
  "Fiesta",
  "Corporativo",
  "Bautizo",
  "Aniversario",
];

const SERVICIOS_DISPONIBLES = [
  "Decoración",
  "Fotografía",
  "Catering",
  "Música",
  "Maquillaje",
  "Pastelería",
  "Iluminación",
  "Video",
];

const TOTAL_PASOS = 4;

/** Tarjeta seleccionable de tipo de evento — ícono + color por categoría
 *  (tipo-evento-icono.ts), borde y fondo se tiñen del color propio del
 *  tipo cuando está seleccionado. */
function TipoEventoChip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  const { Icon, color } = obtenerIconoTipoEvento(label);
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border-2 text-[13px] font-bold transition-all ${
        selected
          ? `${color.bg} ${color.border} ${color.text}`
          : "bg-white border-transparent text-festiva-midnight-blue/55 shadow-[0_1px_8px_rgba(38,30,78,0.05)]"
      }`}
    >
      <Icon size={16} className={selected ? color.text : "text-festiva-midnight-blue/30"} />
      {label}
    </button>
  );
}

/** Chip seleccionable de servicio — mismo sistema de ícono + color que
 *  ya usan las categorías del inicio y las tarjetas de proveedor
 *  (servicio-icono.ts), así el usuario asocia visualmente "Fotografía"
 *  acá con "Fotografía" en el resto de la app. */
function ServicioChip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  const { Icon, color } = obtenerIconoServicio(label);
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border text-[13px] font-bold transition-all ${
        selected
          ? `${color.bg} ${color.text} border-current`
          : "bg-white border-[#EDEAF8] text-festiva-midnight-blue/50"
      }`}
    >
      <Icon size={15} className={selected ? color.text : "text-festiva-midnight-blue/25"} />
      {label}
      {selected && <Check size={13} className={color.text} />}
    </button>
  );
}

/** Traduce las clases de color de servicio-icono.ts a la variante más
 *  cercana de Chip, para reusar el componente real en el resumen del
 *  paso 4 en vez de un <Chip variant="default"> genérico. */
function varianteDesdeColorTexto(colorText: string): BrandVariant {
  if (colorText.includes("euphoric-pink")) return "euphoric-pink";
  if (colorText.includes("electric-violet")) return "electric-violet";
  if (colorText.includes("mint-neon")) return "mint-neon";
  if (colorText.includes("confetti-orange")) return "confetti-orange";
  return "default";
}

function PasoLabel({ step, total, titulo }: { step: number; total: number; titulo: string }) {
  return (
    <div className="mb-5">
      <ProgressBar percentage={(step / total) * 100} color="electric-violet" />
      <p className="text-[11px] font-bold text-festiva-electric-violet tracking-wider uppercase mt-2 mb-0">
        Paso {step} de {total} — {titulo}
      </p>
    </div>
  );
}

export default function CrearEventoForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const {
    // paso 1 - IA
    descripcionIA,
    setDescripcionIA,
    cargandoIA,
    propuestaIA,
    errorIA,
    iaExitosa,
    handleGenerarIA,
    // paso 2 - datos básicos
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
    // paso 3 - detalles
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
    // paso 4 - publicar
    publicando,
    errorPublicar,
    handlePublicar,
  } = useCrearEvento({
    onPublicado: () => router.push("/cliente/eventos"),
  });

  function nextStep() {
    if (step < TOTAL_PASOS) setStep(step + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function prevStep() {
    if (step > 1) setStep(step - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-dvh bg-[#F5F2FA] flex flex-col">
      <TopNavbar title="Crear evento" />

      <main className="flex-1 px-5 pb-28 lg:max-w-2xl lg:mx-auto lg:w-full">
        <PasoLabel
          step={step}
          total={TOTAL_PASOS}
          titulo={
            step === 1
              ? "Asistente IA"
              : step === 2
              ? "Datos básicos"
              : step === 3
              ? "Detalles"
              : "Resumen"
          }
        />

        {/* PASO 1 — Asistente IA */}
        {step === 1 && (
          <Card>
            <div className="rounded-2xl bg-gradient-to-br from-festiva-electric-violet/5 to-festiva-euphoric-pink/5 border border-festiva-electric-violet/10 p-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={18} className="text-festiva-electric-violet" />
                <span className="font-extrabold text-festiva-electric-violet">
                  Festiva IA — ¿Cómo funciona?
                </span>
              </div>

              {[
                "Describe tu evento en tus propias palabras, sin llenar ningún formulario.",
                "La IA extrae automáticamente la fecha, invitados, presupuesto y más.",
                "Revisa y ajusta los campos que quieras antes de publicar.",
              ].map((texto, i) => (
                <div key={texto} className="flex gap-2.5 items-start mb-2">
                  <span className="w-5 h-5 rounded-full bg-festiva-electric-violet text-white text-[11px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-[13px] text-festiva-midnight-blue/70 leading-relaxed m-0">
                    {texto}
                  </p>
                </div>
              ))}

              <div className="mt-2 px-3 py-2 rounded-lg bg-festiva-mint-neon/10 border border-festiva-mint-neon/20">
                <p className="text-xs font-semibold text-festiva-midnight-blue m-0">
                  Ejemplo: &ldquo;Quiero una boda para 100 personas el 20 de
                  diciembre en Tegucigalpa, presupuesto entre L. 60,000 y L.
                  80,000, estilo clásico.&rdquo;
                </p>
              </div>
            </div>

            <Textarea
              label="Describe tu evento libremente"
              placeholder="Quiero una boda íntima para 80 personas en un jardín. Estilo bohemio, paleta terracota con verde. Presupuesto L. 70,000 en diciembre en Tegucigalpa."
              rows={4}
              value={descripcionIA}
              onChange={(e) => setDescripcionIA(e.target.value)}
            />

            {errorIA && (
              <div className="flex items-center gap-2 mt-3 px-3.5 py-2.5 rounded-xl bg-red-500/5 border border-red-500/15">
                <AlertCircle size={14} className="text-red-500 shrink-0" />
                <p className="text-xs text-red-500 m-0">{errorIA}</p>
              </div>
            )}

            {iaExitosa && (
              <div className="flex items-center gap-2 mt-3 px-3.5 py-2.5 rounded-xl bg-festiva-mint-neon/10 border border-festiva-mint-neon/20">
                <Check size={16} className="text-festiva-midnight-blue" />
                <p className="text-xs font-bold text-festiva-midnight-blue m-0">
                  ¡Formulario completado! Revisa los campos en los pasos
                  siguientes.
                </p>
              </div>
            )}

            <Button
              variant="secondary"
              className="w-full mt-4"
              disabled={cargandoIA || !descripcionIA.trim()}
              onClick={handleGenerarIA}
            >
              {cargandoIA ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Analizando tu evento...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Completar con IA
                </>
              )}
            </Button>

            {propuestaIA && (
              <div className="mt-4 p-3.5 rounded-2xl bg-festiva-electric-violet/[0.03] border border-festiva-electric-violet/10">
                <div className="flex items-center gap-2 mb-2.5">
                  <Check size={14} className="text-festiva-electric-violet" />
                  <span className="font-bold text-sm text-festiva-midnight-blue">
                    Formulario completado
                  </span>
                  <span className="ml-auto">
                    <Chip variant="mint-neon">IA</Chip>
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  {[
                    ["Tipo", propuestaIA.tipo_evento],
                    ["Fecha", propuestaIA.fecha],
                    [
                      "Invitados",
                      propuestaIA.num_invitados
                        ? `${propuestaIA.num_invitados} personas`
                        : null,
                    ],
                    [
                      "Presupuesto",
                      propuestaIA.presupuesto_min
                        ? `L. ${propuestaIA.presupuesto_min} – ${propuestaIA.presupuesto_max}`
                        : null,
                    ],
                    ["Ciudad", propuestaIA.ciudad],
                    ["Temática", propuestaIA.tematica],
                  ]
                    .filter(([, v]) => v)
                    .map(([label, value]) => (
                      <div
                        key={label as string}
                        className="flex justify-between py-1 border-b border-festiva-electric-violet/5"
                      >
                        <span className="text-xs text-festiva-midnight-blue/50">
                          {label}
                        </span>
                        <span className="text-xs font-semibold text-festiva-midnight-blue">
                          {value}
                        </span>
                      </div>
                    ))}
                </div>

                <p className="text-[11px] font-semibold text-festiva-midnight-blue mt-2.5 mb-0">
                  Puedes ajustar cualquier campo en los pasos siguientes
                </p>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <Button variant="ghost" className="flex-1" onClick={nextStep}>
                Saltar
              </Button>
              <Button
                variant="primary"
                className="flex-[2]"
                disabled={!propuestaIA && !descripcionIA.trim()}
                onClick={nextStep}
              >
                Continuar
              </Button>
            </div>
          </Card>
        )}

        {/* PASO 2 — Datos básicos */}
        {step === 2 && (
          <Card>
            <SectionTitle title="Datos del evento" />

            <div className="flex flex-col gap-4">
              <Input
                label="Nombre del evento"
                placeholder="Ej. Boda de María y Carlos"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />

              <div>
                <label className="text-[11px] font-bold text-festiva-midnight-blue/60 uppercase tracking-wide mb-1.5 block">
                  Tipo de evento
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {TIPOS_EVENTO.map((t) => (
                    <TipoEventoChip
                      key={t}
                      label={t}
                      selected={tipoEvento === t}
                      onClick={() => setTipoEvento(t)}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Input
                  label="Fecha del evento"
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
                <Input
                  label="Número de invitados"
                  type="number"
                  placeholder="Ej. 150"
                  value={invitados}
                  onChange={(e) => setInvitados(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Input
                  label="Ciudad"
                  placeholder="Ej. Tegucigalpa"
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                />
                <Input
                  label="Lugar / Salón"
                  placeholder="Ej. Jardín El Encanto"
                  value={lugar}
                  onChange={(e) => setLugar(e.target.value)}
                />
              </div>
            </div>

            <Button variant="primary" className="w-full mt-6" onClick={nextStep}>
              Siguiente
            </Button>
          </Card>
        )}

        {/* PASO 3 — Detalles */}
        {step === 3 && (
          <Card>
            <SectionTitle title="Presupuesto y servicios" />

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Input
                  label="Presupuesto mínimo"
                  placeholder="L. 50,000"
                  value={presupuestoMin}
                  onChange={(e) => setPresupuestoMin(e.target.value)}
                />
                <Input
                  label="Presupuesto máximo"
                  placeholder="L. 90,000"
                  value={presupuestoMax}
                  onChange={(e) => setPresupuestoMax(e.target.value)}
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-festiva-midnight-blue/60 uppercase tracking-wide mb-1.5 block">
                  Servicios requeridos
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {SERVICIOS_DISPONIBLES.map((s) => (
                    <ServicioChip
                      key={s}
                      label={s}
                      selected={servicios.includes(s)}
                      onClick={() => toggleServicio(s)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[11px] font-bold text-festiva-midnight-blue/60 uppercase tracking-wide">
                    Descripción adicional
                  </label>
                  {descripcionIA && (
                    <Button
                      type="button"
                      variant="light"
                      size="sm"
                      shape="pill"
                      onClick={handleGenerarDescripcion}
                      className="!h-8 !px-3 !text-[11px] text-festiva-electric-violet"
                    >
                      {cargandoDesc ? (
                        <>
                          <Loader2 size={12} className="animate-spin" />
                          Generando...
                        </>
                      ) : (
                        <>
                          <Sparkles size={12} />
                          Generar con IA
                        </>
                      )}
                    </Button>
                  )}
                </div>
                <Textarea
                  label=""
                  placeholder="Boda elegante en jardín al aire libre. Estilo clásico con toques modernos. Paleta: blanco, dorado y verde."
                  rows={4}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
                {descripcion && propuestaIA && (
                  <p className="text-[11px] text-festiva-midnight-blue/40 italic mt-1 mb-0">
                    Generado por IA · Puedes editarlo libremente
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="ghost" className="flex-1" onClick={prevStep}>
                Volver
              </Button>
              <Button variant="primary" className="flex-[2]" onClick={nextStep}>
                Siguiente
              </Button>
            </div>
          </Card>
        )}

        {/* PASO 4 — Resumen */}
        {step === 4 && (
          <Card>
            <SectionTitle title="Revisa antes de publicar" />

            <div className="flex flex-col gap-4">
              <div className="rounded-2xl bg-festiva-electric-violet/[0.03] border border-festiva-electric-violet/10 p-4">
                <div className="flex gap-3 items-center mb-3">
                  <div className="w-11 h-11 rounded-xl bg-festiva-electric-violet/10 flex items-center justify-center">
                    <Calendar size={20} className="text-festiva-electric-violet" />
                  </div>
                  <div>
                    <div className="font-bold text-base text-festiva-midnight-blue">
                      {nombre || "Evento sin nombre"}
                    </div>
                    <Chip variant="electric-violet">{tipoEvento}</Chip>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { Icon: Calendar, label: "Fecha", value: fecha || "No especificada" },
                    {
                      Icon: Users,
                      label: "Invitados",
                      value: invitados ? `${invitados} personas` : "No especificado",
                    },
                    { Icon: MapPin, label: "Ciudad", value: ciudad || "No especificada" },
                    {
                      Icon: Wallet,
                      label: "Presupuesto",
                      value:
                        presupuestoMin && presupuestoMax
                          ? `L. ${presupuestoMin} - ${presupuestoMax}`
                          : "Por definir",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="bg-white rounded-lg px-3 py-2.5 border border-festiva-electric-violet/10"
                    >
                      <div className="flex items-center gap-1 mb-0.5 text-festiva-midnight-blue/50">
                        <item.Icon size={13} />
                        <span className="text-[10px]">{item.label}</span>
                      </div>
                      <span className="text-[13px] font-semibold text-festiva-midnight-blue">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                {lugar && (
                  <div className="mt-2.5 text-sm">
                    <span className="text-festiva-midnight-blue/50">Lugar: </span>
                    <span className="font-medium text-festiva-midnight-blue">{lugar}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="text-[11px] font-bold text-festiva-midnight-blue/60 uppercase tracking-wide mb-1.5 block">
                  Servicios solicitados
                </label>
                <div className="flex flex-wrap gap-2">
                  {servicios.length > 0 ? (
                    servicios.map((s) => {
                      const { Icon, color } = obtenerIconoServicio(s);
                      return (
                        <Chip key={s} variant={varianteDesdeColorTexto(color.text)} icon={Icon}>
                          {s}
                        </Chip>
                      );
                    })
                  ) : (
                    <span className="text-sm text-festiva-midnight-blue/40">
                      No se seleccionaron servicios
                    </span>
                  )}
                </div>
              </div>

              {descripcion && (
                <div className="rounded-xl bg-[#F9F8FF] border border-festiva-electric-violet/10 px-3.5 py-3">
                  <p className="text-[13px] text-festiva-midnight-blue/70 italic leading-relaxed m-0">
                    &ldquo;{descripcion}&rdquo;
                  </p>
                </div>
              )}

              <div className="rounded-xl bg-festiva-confetti-orange/5 border border-festiva-confetti-orange/15 px-3.5 py-3 flex gap-2 items-start">
                <AlertCircle size={16} className="text-festiva-confetti-orange shrink-0 mt-0.5" />
                <p className="text-xs text-festiva-midnight-blue/50 leading-relaxed m-0">
                  Al publicar, tu evento será visible para proveedores de tu
                  ciudad. Recibirás notificaciones cuando lleguen ofertas.
                </p>
              </div>

              {errorPublicar && (
                <div className="rounded-xl bg-red-500/5 border border-red-500/15 px-3.5 py-3 flex gap-2 items-start">
                  <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-500 leading-relaxed m-0">{errorPublicar}</p>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="ghost" className="flex-1" onClick={prevStep}>
                Volver
              </Button>
              <Button
                variant="primary"
                className="flex-[2]"
                disabled={publicando}
                onClick={handlePublicar}
              >
                {publicando ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Publicando...
                  </>
                ) : (
                  "Publicar evento"
                )}
              </Button>
            </div>
          </Card>
        )}
      </main>

      <Navbar />
    </div>
  );
}