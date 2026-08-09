export const formatCurrency = (amount: number): string => {
    return `L${amount.toLocaleString('es-HN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    })}`;
};