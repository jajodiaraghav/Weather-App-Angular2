import {Component} from 'angular2/core';
import {ControlGroup} from 'angular2/common';
import {WeatherService} from './weather.service';
import {WeatherItem} from './weather-item';
import {Subject} from 'rxjs/Subject';

@Component({
    selector: 'weather-search',
    template: `
    	<section class="weather-search">
    		<form (ngSubmit)="onSubmit()">
    			<label for="city">City</label>
    			<input ngControl="location" type="text" (input)="onSearchLocation(input.value)" id="city" #input required />
    			<button type="submit">Add City</button>
    		</form>
    		<div>
    			<span class="info">City Found</span> {{data.name}}
    		</div>
    	</section>
    `
})
export class WeatherSearchComponent {

    private searchStream = new Subject<string>();
    data: any = {};
	constructor (private _weatherService: WeatherService) {}

	onSubmit(form: ControlGroup) {
		const weatherItem = new WeatherItem(this.data.name,this.data.weather[0].description,this.data.main.temp);
		this._weatherService.addWeatherItem(weatherItem);
	}

    onSearchLocation(city: string){
        this.searchStream.next(city);
    }

    ngOnInit(){
        this.searchStream
        .debounceTime(300)
        .distinctUntilChanged()
        .switchMap((input:string)=> this._weatherService.searchWeatherData(input))
        .subscribe(
            data=> this.data = data
        )
    }

}