import { MitigaWeatherRecommendationController } from './controllers/MitigaWeatherRecommendationController'
import { MitigaClothingRecommendationController } from './controllers/MitigaClothesRecommendationController'
import { MitigaWeatherRecommendationService } from './services/MitigaWeatherRecommendationService'
import { MitigaClothingRecommendationService } from './services/MitigaClothingRecomendationService'
import { OpenWeatherDriver } from './drivers/OpenWeatherDriver'
import { config } from './config'
import { HttpServer } from './HttpServer'

const openWeatherDriver = new OpenWeatherDriver(config.get('openWeatherMapApiKey'))
const mitigaTravelService = new MitigaWeatherRecommendationService(openWeatherDriver)
const mitigaClothingService = new MitigaClothingRecommendationService(openWeatherDriver)
const mitigaTravelController = new MitigaWeatherRecommendationController(mitigaTravelService)
const mitigaClothingController = new MitigaClothingRecommendationController(mitigaClothingService)

const port = config.get('port')
const httpServer = new HttpServer(port, mitigaTravelController, mitigaClothingController)
httpServer.start().catch((error) => {
  console.error(error)
  process.exit(1)
})
