import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/countries.service';
import { Country } from '../../interfaces/Country';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})


export class ByRegionPageComponent implements OnInit {
  

  public countries: Country[] = [];
  public regions: Region[] = ['africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion? : Region;
  public isLoading: boolean = false;

  constructor(private countryService : CountryService) {
  }

  ngOnInit(): void {
    this.selectedRegion = this.countryService.cacheStore.byRegion.region;
    this.countries = this.countryService.cacheStore.byRegion.countries;
  }

  searchByRegion(value: Region) : void {
    this.selectedRegion = value;
    this.isLoading = true; 
    this.countryService.searchByRegion(value).subscribe(
      countries => {
        this.countries = countries; 
        this.isLoading = false;
      }
    )
  }

}
