export type ClothesOptions = "No recommendation available why aren't you sleeping?" | 'Raincoat' | 'Umbrella' | 'Sunglasses' | 'T-shirt' | 'Shorts' | 'Light jacket' | 'Long pants' | 'Light sweater' | 'Heavy coat' | 'Gloves';
export type PartOfTheDay = 'morn' | 'day' | 'eve' | 'night';

export const partOfTheDay: { [key: string]: PartOfTheDay } = {
    morning: 'morn',
    afternoon: 'day',
    evening: 'eve',
    night: 'night'
};

export const getPartOfTheDay = (dateTime: Date): PartOfTheDay => {
    const hour = dateTime.getHours()
    if (hour >= 6 && hour < 12) return partOfTheDay.morning
    if (hour >= 12 && hour < 18) return partOfTheDay.afternoon
    if (hour >= 18 && hour < 24) return partOfTheDay.evening
    return partOfTheDay.night
}
