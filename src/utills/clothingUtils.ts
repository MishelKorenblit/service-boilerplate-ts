import type { ClothesOptions, PartOfTheDay } from '../travel-service-dto-s';

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

export const recommendedClothing = (
    temperature: number,
    timeOfDay: PartOfTheDay,
    weatherConditions: string
): ClothesOptions[] => {
    if (weatherConditions === 'Rainy') return ['Raincoat', 'Umbrella'];
    if (temperature > 18 && timeOfDay !== partOfTheDay.night && weatherConditions === 'Sunny') return ['T-shirt', 'Shorts'];
    if (timeOfDay == partOfTheDay.morning || timeOfDay == partOfTheDay.afternoon) {
        if (weatherConditions === 'Sunny') return ['Sunglasses'];
    }
    if (temperature >= 10 && temperature <= 18) {
        if (timeOfDay === partOfTheDay.morning || timeOfDay === partOfTheDay.afternoon) return ['Light jacket', 'Long pants'];
        if (timeOfDay === partOfTheDay.evening) return ['Light sweater', 'Long pants'];
    }
    if (temperature < 10) return ['Heavy coat', 'Gloves'];

    return [`No recommendation available why aren't you sleeping?`];
};
