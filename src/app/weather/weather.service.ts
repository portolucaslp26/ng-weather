import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient
  ) { }

  apiKey = '641a8e90f38be43c0e2cc7f3bf64dd10';

  //automatic get wheather by actual location
  getWeatherByLocation(lat: number, lon: number) {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`)
    .pipe((data) => data);
  }

  getWeather(city: string) {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`)
    .pipe((data) => data);
  }
}
