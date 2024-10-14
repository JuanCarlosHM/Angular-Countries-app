import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/Country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private CountryService: CountryService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.CountryService.searchCountryByAlphaCode(id))
      )
      .subscribe((response) => {
        if (!response) {
          this.router.navigateByUrl('');
          return;
        }
        
        this.country = response; 

      }
      );

  }
}
