import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  form: FormGroup;
  data?: any;

  constructor(
    private formBuilder: FormBuilder,
    private weatherService: WeatherService
  ) {
    this.form = this.formBuilder.group({
      city: [''],
    });
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.weatherService.getWeatherByLocation(position.coords.latitude, position.coords.longitude).subscribe((data) => {
        console.log(data);
        this.data = data;
      });
    });
  }

  getWewather() {
    const city = this.form?.get('city')?.value;
    this.weatherService.getWeather(city).subscribe((data) => {
      this.data = data;
    });
  }

  getImage(): any {
    switch (this.data?.weather[0].main) {
      case 'Clear':
        return 'assets/img/sun.png';
      case 'Clouds':
        return 'assets/img/cloud.png';
      case 'Rain':
        return 'assets/img/raindrop.png';
      case 'Drizzle':
        return 'assets/img/raindrops.png';
      case 'Mist':
        return 'assets/img/snowflake.png';
      case 'Snow':
        return 'assets/img/snowflakes.png';
      case 'Thunderstorm':
        return 'assets/img/lighting.png';
      default:
        return '';
    }
  }


}
