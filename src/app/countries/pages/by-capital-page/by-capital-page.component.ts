import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/countries.service';
import { Country } from '../../interfaces/Country';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit{

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(private countriesService: CountryService) {

  }
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }


  searchByCapital(value:string): void {

    this.isLoading = true; 
    this.countriesService.searchByCapital(value).subscribe( countries => {
      this.countries = countries;
      this.isLoading = false;
    })
    
  }

}
