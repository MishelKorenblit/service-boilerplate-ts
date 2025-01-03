import createHttpError from 'http-errors'
import { OpenWeatherDriver } from '../drivers/OpenWeatherDriver'
import { CurrentClothesDTO } from '../travel-service-dto-s'
import { DailyWeather } from 'openweather-api-node'
import { getPartOfTheDay, recommendedClothing } from '../utills/clothingUtils'

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
            const relevantWeatherDate = weather[weather.length - 1];
            const currentWeather = relevantWeatherDate.weather.temp[partOfTheDay];
            const weatherCondition = relevantWeatherDate.weather.description;
            const clothesToWear = recommendedClothing(currentWeather, partOfTheDay, weatherCondition);
            return {
                recommendedClothing: clothesToWear.toString()
            }
        } catch (error: unknown) {
            throw createHttpError(500, 'Could not get clothing recommendation', { error })
        }
    }
}
