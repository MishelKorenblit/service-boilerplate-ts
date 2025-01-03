export type ClothesOptions = "No recommendation available why aren't you sleeping?" | 'Raincoat' | 'Umbrella' | 'Sunglasses' | 'T-shirt' | 'Shorts' | 'Light jacket' | 'Long pants' | 'Light sweater' | 'Heavy coat' | 'Gloves';
export type PartOfTheDay = 'morn' | 'day' | 'eve' | 'night';

export interface CurrentWeatherDTO {
  cityName: string
  weather: string
  temperature: number
  feelsLike: number
}
export interface CurrentClothesDTO {
  recommendedClothing: string
}
