export interface UserSettings {
    pushNotifications: boolean;
    emailNotifications: boolean;
    whatsappNotifications: boolean;
}

export const settingsService = {
    async getSettings(): Promise<UserSettings> {
        // Simulación de delay de API
        await new Promise((resolve) => setTimeout(resolve, 600));
        return {
            pushNotifications: true,
            emailNotifications: true,
            whatsappNotifications: false,
        };
  },

    async updateSettings(settings: UserSettings): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, 500));
        console.log("Configuración guardada en Festiva:", settings);
    }
};