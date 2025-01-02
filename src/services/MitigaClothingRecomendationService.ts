import createHttpError from 'http-errors'
import { OpenWeatherDriver } from '../drivers/OpenWeatherDriver'
import { CurrentClothesDTO } from '../travel-service-dto-s'
import { DailyWeather } from 'openweather-api-node'

export class MitigaClothingRecommendationService {
    constructor(private readonly openWeatherDriver: OpenWeatherDriver) { }

    public async getClothesToWear(city: string, datetime: Date): Promise<CurrentClothesDTO> {
        const partOfTheDay = getPartOfTheDay(datetime);

        const today = new Date();
        const diffTime = Math.floor((datetime.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        const limit = diffTime + 1;

        const promises: Promise<unknown>[] = []
        promises.push(this.openWeatherDriver.getDateWeatherByCityName(limit, city))
        try {
            const [weather] = (await Promise.all(promises)) as [DailyWeather[]];
            const relevantWethearDate = weather[weather.length - 1];
            const currentWeather = relevantWethearDate.weather.temp[partOfTheDay];
            const weatherCondition = relevantWethearDate.weather.description;
            const clotesToWear = recommendedClothing(currentWeather, partOfTheDay, weatherCondition);
            return {
                recommendedClothing: clotesToWear
            }
        } catch (error: unknown) {
            throw createHttpError(500, 'Could not get weather for location', { error })
        }
    }
}

const getPartOfTheDay = (dateTime: Date): PartOfTheDay => {
    const hour = dateTime.getHours()
    if (hour >= 6 && hour < 12) return 'morn'
    if (hour >= 12 && hour < 18) return 'day'
    if (hour >= 18 && hour < 24) return 'eve'
    return 'night'
}

type PartOfTheDay = 'morn' | 'day' | 'eve' | 'night';

const recommendedClothing = (
    temperature: number,
    timeOfDay: PartOfTheDay,
    weatherConditions: string
): string => {
    if (temperature < 10) return "Heavy coat, gloves";
    if (temperature >= 10 && temperature <= 18) return timeOfDay === "morn" || timeOfDay === "day"
        ? "Light jacket, long pants"
        : "Light sweater, long pants";
    if (temperature > 18) {
        if (weatherConditions === "Sunny") return "T-shirt, shorts";
    }
    if (weatherConditions === "Rainy") return "Raincoat, umbrella";

    return "No recommendation available";
};
