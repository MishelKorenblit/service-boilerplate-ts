import { CurrentWeather, Location, OpenWeatherAPI, DailyWeather } from 'openweather-api-node'

export class OpenWeatherDriver {
  constructor(private apiKey: string) {
    this.openWeatherAPI = new OpenWeatherAPI({ key: this.apiKey, units: 'metric' })
  }
  private openWeatherAPI

  public async getCurrentWeather(lat: number, lon: number): Promise<CurrentWeather> {
    return await this.openWeatherAPI.getCurrent({ coordinates: { lat, lon } })
  }

  public async getDateWeatherByCityName(limit: number, cityName: string): Promise<DailyWeather[]> {
    return await this.openWeatherAPI.getDailyForecast(limit, true, { locationName: cityName })
  }
  public async getCityForLocation(lat: number, lon: number): Promise<Location | null> {
    return this.openWeatherAPI.getLocation({ coordinates: { lat, lon } })
  }
}
