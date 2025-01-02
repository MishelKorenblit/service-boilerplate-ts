import { mock } from 'vitest-mock-extended'
import { MitigaWeatherRecommendationController } from '../src/controllers/MitigaWeatherRecommendationController'
import { MitigaClothingRecommendationController } from '../src/controllers/MitigaClothesRecommendationController'
import { HttpServer } from '../src/HttpServer'
import findFreePorts from 'find-free-ports'
import axios from 'axios'
describe('HttpServer', () => {
  async function givenStartedHttpServer(): Promise<{ httpServer: HttpServer; mitigaTravelController: MitigaWeatherRecommendationController; mitigaClothingController: MitigaClothingRecommendationController; port: number }> {
    const mitigaTravelController = mock<MitigaWeatherRecommendationController>()
    const mitigaClothingController = mock<MitigaClothingRecommendationController>()
    const [port] = await findFreePorts(1)
    const httpServer = new HttpServer(port, mitigaTravelController, mitigaClothingController)
    await httpServer.start()
    return { httpServer, mitigaTravelController, mitigaClothingController, port }
  }
  test('Verify lat and lon are passed to controller', async () => {
    const { mitigaTravelController, port } = await givenStartedHttpServer()
    await axios.get(`http://localhost:${port}/travel/location/100/200/weather`)
    expect(mitigaTravelController.currentWeatherAtLocation).toBeCalledWith('100', '200')
  })

  test('Verify city name and date time passed to controller', async () => {
    const { mitigaClothingController, port } = await givenStartedHttpServer()
    await axios.get(`http://localhost:${port}/travel/location/London/datetime/2021-01-10T10:00:00`)
    expect(mitigaClothingController.currentClothesToWear).toBeCalledWith('London', new Date('2021-01-10T10:00:00'))
  })
})
