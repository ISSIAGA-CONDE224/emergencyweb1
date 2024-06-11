export function formatDate(date: Date) {
    const formattedDate = `${date.toLocaleString('fr-FR', { month: 'long', day: 'numeric'})} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    return formattedDate
}