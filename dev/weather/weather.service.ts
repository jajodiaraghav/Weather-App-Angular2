import {Injectable} from 'angular2/core';
import {WEATHER_ITEMS} from './weather.data';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {WeatherItem} from './weather-item';
import 'rxjs/Rx';


@Injectable()

export class WeatherService{
	constructor(private _http: Http) {}

	getWeatherItems(){
		return WEATHER_ITEMS;
	}

	addWeatherItem(weatherItem: WeatherItem){
		WEATHER_ITEMS.push(weatherItem);
	}

	clearWeatherItems(){
		WEATHER_ITEMS.splice(0);
	}

	searchWeatherData(city: string): Observable<any> {
		return this._http.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=9a2bf9280057409b7f730e8e6d0cc54a&units=metric')
			.map(response => response.json())
			.catch(error=>{
				return Observable.throw(error.json())
			});
	}
}