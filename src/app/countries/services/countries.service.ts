import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/Country';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { cacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountryService {
    
    private apiURL: string = 'https://restcountries.com/v3.1'; 
    public cacheStore : cacheStore = {
        byCapital: {term: '', countries: []},
        byCountries: {term: '', countries: []},
        byRegion: {region: undefined, countries: []},
    };
    
    constructor(private httpClient: HttpClient) { 
       this.loadFromLocalstorage();
    }

    private saveToLocalStorage(){
        localStorage.setItem('cacheStorage', JSON.stringify(this.cacheStore));
    }

    private loadFromLocalstorage(){
       if(!localStorage.getItem('cacheStorage')) return;
       this.cacheStore = JSON.parse( localStorage.getItem('cacheStorage')!);
    }

    private getCountresRequest(url: string): Observable<Country[]> {
        return this.httpClient.get<Country[]>(url)
        .pipe(
            catchError(() => of([]))
        )
    }

    searchByCapital(query: string): Observable<Country[]> {
        const url = `${this.apiURL}/capital/${query}`
        return this.getCountresRequest(url)
        .pipe(
            tap(countries => this.cacheStore.byCapital = {term: query, countries}),
            tap(() => this.saveToLocalStorage()),
        );
    }

    searchByCoutry(query: string): Observable<Country[]> {
         const url = `${this.apiURL}/name/${query}`;
        return this.getCountresRequest(url).pipe(
            tap(countries => this.cacheStore.byCountries = {term: query, countries}),
            tap(() => this.saveToLocalStorage()),
        ); 
    }
    
    searchByRegion(query: Region): Observable<Country[]> {
        const url =`${this.apiURL}/region/${query}`;
        return this.getCountresRequest(url).pipe(
            tap(countries => this.cacheStore.byRegion = { region: query, countries}),
            tap(() => this.saveToLocalStorage()),
        ) 
    }

    searchCountryByAlphaCode(code: string): Observable<Country | null> {

        const url = `${this.apiURL}/alpha/${code}`
        return this.httpClient.get<Country[]>(url)
        .pipe(
            map(countries => countries.length > 0 ? countries[0] : null),
            catchError(error => of(null)),
        );
    }
}