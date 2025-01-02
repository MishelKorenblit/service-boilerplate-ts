import { CurrentWeather, Location, DailyWeather } from 'openweather-api-node'

export const TlvCurrent: CurrentWeather = {
  lat: 32.0892,
  lon: 34.7808,
  dt: new Date('2023-09-13T13:09:18.000Z'),
  dtRaw: 1694610558,
  timezone: undefined,
  timezoneOffset: 10800,
  astronomical: {
    sunrise: new Date('2023-09-13T03:23:17.000Z'),
    sunriseRaw: 1694575397,
    sunset: new Date('2023-09-13T15:51:00.000Z'),
    sunsetRaw: 1694620260,
  },
  weather: {
    temp: { cur: 28.81 },
    feelsLike: { cur: 32.67 },
    pressure: 1010,
    humidity: 72,
    dewPoint: undefined,
    clouds: 40,
    uvi: undefined,
    visibility: 10000,
    wind: { deg: 300, gust: undefined, speed: 5.66 },
    rain: 0,
    snow: 0,
    conditionId: 802,
    main: 'Clouds',
    description: 'scattered clouds',
    icon: { url: 'http://openweathermap.org/img/wn/03d@2x.png', raw: '03d' },
  },
}
export const TlvLocation: Location = {
  name: 'Tel Aviv-Yafo',
  local_names: {},
  lat: 32.0852997,
  lon: 34.7818064,
  country: 'IL',
  state: 'Tel Aviv District',
}

export const DailyWeatherForecast: DailyWeather[] = [
  {
    lat: 34.0522,
    lon: -118.2437,
    dt: new Date(),
    dtRaw: Date.now(),
    timezone: 'America/Los_Angeles',
    timezoneOffset: -28800,
    astronomical: {
      sunrise: new Date(),
      sunriseRaw: Date.now(),
      sunset: new Date(),
      sunsetRaw: Date.now(),
      moonrise: new Date(),
      moonriseRaw: Date.now(),
      moonset: new Date(),
      moonsetRaw: Date.now(),
      moonPhase: 0.5
    },
    weather: {
      temp: {
        morn: 15,
        day: 22,
        eve: 18,
        night: 12,
        min: 10,
        max: 24
      },
      feelsLike: {
        morn: 14,
        day: 21,
        eve: 17,
        night: 11
      },
      pressure: 1015,
      humidity: 60,
      dewPoint: 10,
      clouds: 50,
      uvi: 5,
      wind: {
        speed: 10,
        gust: 15,
        deg: 270
      },
      pop: 0.2,
      rain: 0,
      snow: 0,
      conditionId: 800,
      main: 'Clear',
      description: 'Clear sky',
      summary: 'Clear and sunny day',
      icon: {
        url: 'https://example.com/icon.png',
        raw: '01d'
      }
    }
  },
  {
    lat: 51.5074,
    lon: -0.1278,
    dt: new Date(),
    dtRaw: Date.now(),
    timezone: 'Europe/London',
    timezoneOffset: 0,
    astronomical: {
      sunrise: new Date(),
      sunriseRaw: Date.now(),
      sunset: new Date(),
      sunsetRaw: Date.now(),
      moonrise: new Date(),
      moonriseRaw: Date.now(),
      moonset: new Date(),
      moonsetRaw: Date.now(),
      moonPhase: 0.75
    },
    weather: {
      temp: {
        morn: 8,
        day: 12,
        eve: 10,
        night: 6,
        min: 4,
        max: 14
      },
      feelsLike: {
        morn: 7,
        day: 11,
        eve: 9,
        night: 5
      },
      pressure: 1012,
      humidity: 80,
      dewPoint: 7,
      clouds: 75,
      uvi: 3,
      wind: {
        speed: 5,
        gust: 10,
        deg: 180
      },
      pop: 0.3,
      rain: 1.2,
      snow: 0,
      conditionId: 801,
      main: 'Clouds',
      description: 'Few clouds',
      summary: 'Partly cloudy with a chance of light rain',
      icon: {
        url: 'https://example.com/icon-clouds.png',
        raw: '02d'
      }
    }
  }
];
