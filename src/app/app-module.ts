import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { WhackAMole } from './whack-a-mole/whack-a-mole';
import { FormsModule } from '@angular/forms';
import { Home } from './home/home';
import { RouterModule } from '@angular/router';
import { Prcatice } from './prcatice/prcatice';
import { HttpClientModule } from '@angular/common/http';
import { Usrdetails } from './usrdetails/usrdetails';

@NgModule({
  declarations: [
    App,
    WhackAMole,
    Home,
    Prcatice,
    Usrdetails
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule       
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
