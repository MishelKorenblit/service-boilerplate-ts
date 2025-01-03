import { mock } from 'vitest-mock-extended'
import { MitigaClothingRecommendationService } from '../../src/services/MitigaClothingRecomendationService'
import { OpenWeatherDriver } from '../../src/drivers/OpenWeatherDriver'
import { DailyWeatherForecast } from '../resources/tlv-current'
import { CurrentClothesDTO } from '../../src/travel-service-dto-s'

describe('MitigaClothingRecommendationService', () => {
    test('Should return heavy coats and gloves when temp under 10', async () => {
        const driver = mock<OpenWeatherDriver>()
        driver.getDateWeatherByCityName.mockResolvedValue(DailyWeatherForecast({ morningTemp: 5 }))
        const service = new MitigaClothingRecommendationService(driver)
        const expected: CurrentClothesDTO = {
            recommendedClothing: 'Heavy coat,Gloves'
        }
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        expect(await service.getClothesToWear('London', new Date(currentDate.setHours(10, 0, 0, 0)))).toStrictEqual(expected)
    })

    test('Should return sunglasses when its sunny morning or afternoon ', async () => {
        const driver = mock<OpenWeatherDriver>()
        driver.getDateWeatherByCityName.mockResolvedValue(DailyWeatherForecast({ description: 'Sunny' }))
        const service = new MitigaClothingRecommendationService(driver)
        const expected: CurrentClothesDTO = {
            recommendedClothing: 'Sunglasses'
        }
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        expect(await service.getClothesToWear('London', new Date(currentDate.setHours(10, 0, 0, 0)))).toStrictEqual(expected)
    })

    test('Should return Raincoat, umbrella when its sunny morning or afternoon ', async () => {
        const driver = mock<OpenWeatherDriver>()
        driver.getDateWeatherByCityName.mockResolvedValue(DailyWeatherForecast({ description: 'Rainy' }))
        const service = new MitigaClothingRecommendationService(driver)
        const expected: CurrentClothesDTO = {
            recommendedClothing: 'Raincoat,Umbrella'
        }
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        expect(await service.getClothesToWear('London', new Date(currentDate.setHours(10, 0, 0, 0)))).toStrictEqual(expected)
    })

    test('Should return T-shirt, shorts when its sunny morning, afternoon or evening', async () => {
        const driver = mock<OpenWeatherDriver>()
        driver.getDateWeatherByCityName.mockResolvedValue(DailyWeatherForecast({ eveningTemp: 20, description: 'Sunny' }))
        const service = new MitigaClothingRecommendationService(driver)
        const expected: CurrentClothesDTO = {
            recommendedClothing: 'T-shirt,Shorts'
        }
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        expect(await service.getClothesToWear('London', new Date(currentDate.setHours(20, 0, 0, 0)))).toStrictEqual(expected)
    })

    test('Should return Light sweater, long pants when its evening with a temp of 10-18', async () => {
        const driver = mock<OpenWeatherDriver>()
        driver.getDateWeatherByCityName.mockResolvedValue(DailyWeatherForecast({ morningTemp: 15 }))
        const service = new MitigaClothingRecommendationService(driver)
        const expected: CurrentClothesDTO = {
            recommendedClothing: 'Light sweater,Long pants'
        }
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        expect(await service.getClothesToWear('London', new Date(currentDate.setHours(20, 0, 0, 0)))).toStrictEqual(expected)
    })

    test('Should return Light jacket, long pants when its morning or afternoon with a temp of 10-18', async () => {
        const driver = mock<OpenWeatherDriver>()
        driver.getDateWeatherByCityName.mockResolvedValue(DailyWeatherForecast({ morningTemp: 15 }))
        const service = new MitigaClothingRecommendationService(driver)
        const expected: CurrentClothesDTO = {
            recommendedClothing: 'Light jacket,Long pants'
        }
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        expect(await service.getClothesToWear('London', new Date(currentDate.setHours(10, 0, 0, 0)))).toStrictEqual(expected)
    })

    test('Should return that there is nothing to wear when it the middle of the night ', async () => {
        const driver = mock<OpenWeatherDriver>()
        driver.getDateWeatherByCityName.mockResolvedValue(DailyWeatherForecast())
        const service = new MitigaClothingRecommendationService(driver)
        const expected: CurrentClothesDTO = {
            recommendedClothing: `No recommendation available why aren't you sleeping?`
        }
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        expect(await service.getClothesToWear('London', new Date(currentDate.setHours(2, 0, 0, 0)))).toStrictEqual(expected)
    })

    test('Verify 500 is thrown on location error', async () => {
        const driver = mock<OpenWeatherDriver>()
        driver.getDateWeatherByCityName.mockRejectedValue(new Error('Some driver error'))
        const service = new MitigaClothingRecommendationService(driver)
        await expect(() => service.getClothesToWear('London', new Date())).rejects.toThrowError('Could not get clothing recommendation')
    })
})
