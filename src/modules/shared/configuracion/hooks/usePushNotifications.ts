import { useState, useEffect } from "react";
import {
    pushEsSoportado,
    estaSuscrito,
    activarPush,
    desactivarPush,
} from "@/modules/cliente/notificaciones/services/push.service";

export function usePushNotifications() {
    const [soportaPush, setSoportaPush] = useState(false);
    const [pushActivo, setPushActivo] = useState(false);
    const [cargandoPush, setCargandoPush] = useState(false);
    const [errorPush, setErrorPush] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const soportado = pushEsSoportado();
            setSoportaPush(soportado);

            if (soportado) {
                estaSuscrito().then(setPushActivo).catch(console.error);
            }
        }
    }, []);

    const togglePush = async () => {
        setErrorPush("");
        setCargandoPush(true);
        
        try {
            if (pushActivo) {
                await desactivarPush();
                setPushActivo(false);
            } else {
                await activarPush();
                setPushActivo(true);
            }
        } catch (e) {
            setErrorPush(e instanceof Error ? e.message : "Error al actualizar notificaciones");
        } finally {
            setCargandoPush(false);
        }
    };

    return { soportaPush, pushActivo, cargandoPush, errorPush, togglePush };
}