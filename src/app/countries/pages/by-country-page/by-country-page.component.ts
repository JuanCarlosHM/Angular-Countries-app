import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/countries.service';
import { Country } from '../../interfaces/Country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {

  public countries : Country[] = []; 
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(private countryservice: CountryService) {
  }

  ngOnInit(): void {
    this.countries = this.countryservice.cacheStore.byCountries.countries;
    this.initialValue = this.countryservice.cacheStore.byCountries.term; 
  }

  searchByCountry(value:string): void {
    this.isLoading = true; 
    this.countryservice.searchByCoutry(value).subscribe(
      countries => {
        this.countries = countries;
        this.isLoading = false;
      });

  }

}
