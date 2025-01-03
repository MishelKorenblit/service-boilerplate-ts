import createHttpError from 'http-errors'
import { OpenWeatherDriver } from '../drivers/OpenWeatherDriver'
import { CurrentClothesDTO } from '../travel-service-dto-s'
import { DailyWeather } from 'openweather-api-node'
import { getPartOfTheDay, partOfTheDay } from '../utills/clothingUtils'
import type { ClothesOptions, PartOfTheDay } from '../utills/clothingUtils'

export class MitigaClothingRecommendationService {
    constructor(private readonly openWeatherDriver: OpenWeatherDriver) { }

    public async getClothesToWear(city: string, datetime: Date): Promise<CurrentClothesDTO> {
        const partOfTheDay = getPartOfTheDay(datetime);

        const today = new Date();
        const diffTime = Math.floor((datetime.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        const limit = diffTime + 1;

        const promises: Promise<unknown>[] = []
        promises.push(this.openWeatherDriver.getForecastWeatherByCityName(limit, city))
        try {
            const [weather] = (await Promise.all(promises)) as [DailyWeather[]];
            const relevantWeatherDate = weather[weather.length - 1];
            const currentWeather = relevantWeatherDate.weather.temp[partOfTheDay];
            const weatherCondition = relevantWeatherDate.weather.description;
            const clothesToWear = getClothingRecommendation(currentWeather, partOfTheDay, weatherCondition);
            return {
                recommendedClothing: clothesToWear.toString()
            }
        } catch (error: unknown) {
            throw createHttpError(500, 'Could not get clothing recommendation', { error })
        }
    }
}

export const getClothingRecommendation = (
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