import { MitigaClothingRecommendationService } from "../services/MitigaClothingRecomendationService"
import { CurrentClothesDTO } from '../travel-service-dto-s'

export class MitigaClothingRecommendationController {
    constructor(private readonly mitigaTravelService: MitigaClothingRecommendationService) { }

    public async currentClothesToWear(city: string, datetime: Date): Promise<CurrentClothesDTO> {
        const relevantClothes = this.mitigaTravelService.getClothesToWear(city, datetime)
        return relevantClothes;
    }
}
