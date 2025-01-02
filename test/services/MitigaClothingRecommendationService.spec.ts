import { mock } from 'vitest-mock-extended'
import { MitigaClothingRecommendationService } from '../../src/services/MitigaClothingRecomendationService'
import { OpenWeatherDriver } from '../../src/drivers/OpenWeatherDriver'
import { DailyWeatherForecast } from '../resources/tlv-current'
import { CurrentClothesDTO } from '../../src/travel-service-dto-s'

describe('MitigaClothingRecommendationService', () => {
    test('Should return the weather from driver as DTO', async () => {
        const driver = mock<OpenWeatherDriver>()
        driver.getDateWeatherByCityName.mockResolvedValue(DailyWeatherForecast)
        const service = new MitigaClothingRecommendationService(driver)
        const expected: CurrentClothesDTO = {
            recommendedClothing: 'Wear a jacket',
        }
        expect(await service.getClothesToWear('London', new Date())).toStrictEqual(expected)
    })
    test('Verify 500 is thrown on location error', async () => {
        const driver = mock<OpenWeatherDriver>()
        driver.getDateWeatherByCityName.mockRejectedValue(new Error('Some driver error'))
        const service = new MitigaClothingRecommendationService(driver)
        await expect(() => service.getClothesToWear('London', new Date())).rejects.toThrowError('Could not get weather for location')
    })
})
