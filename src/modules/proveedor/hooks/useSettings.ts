import { useState, useEffect } from 'react';
import { settingsService, UserSettings } from '../services/setting.services';

export function useSettings() {
    const [settings, setSettings] = useState<UserSettings | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      settingsService.getSettings()
        .then((data) => {
          setSettings(data);
          setLoading(false);
        })
        .catch((err) => console.error("Error cargando configuración:", err));
    }, []);

    const toggleSetting = async (key: keyof UserSettings) => {
      if (!settings) return;
      
      const updated = { ...settings, [key]: !settings[key] };
      
      setSettings(updated);

      try {
        await settingsService.updateSettings(updated);
      } catch (error) {
        
        setSettings(settings);
        console.error("No se pudo guardar la configuración:", error);
      }
    };

    return { settings, loading, toggleSetting };
}