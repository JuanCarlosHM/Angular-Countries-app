import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingmodule } from './app-routing.module';
import { provideHttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingmodule,
    BrowserModule, 
    SharedModule
  ],providers: [
    provideHttpClient(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
