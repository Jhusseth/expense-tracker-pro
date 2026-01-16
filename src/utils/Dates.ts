export const parseDate = (dateString: string): Date => {
    if (dateString.includes('/')) {
        const [day, month, year] = dateString.split('/').map(Number)
        const date = new Date(year, month - 1, day)
        date.setHours(0, 0, 0, 0) 
        return date
    }
    return new Date(dateString)
}