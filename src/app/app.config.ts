import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {  provideHttpClient, withInterceptors } from '@angular/common/http';
import { JwtInterceptor } from './core/interceptor';
import { provideToastr } from 'ngx-toastr';
import {provideAnimations, BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
// export const appConfig: ApplicationConfig = {
//   providers: [provideRouter(routes),provideHttpClient(withInterceptors([JwtInterceptor])),]
// };

export const appConfig: ApplicationConfig = {
  providers: [MatTableModule, MatCheckboxModule,provideRouter(routes), provideHttpClient(withInterceptors(
      [JwtInterceptor],  
  )),  provideToastr(), provideAnimations(), BrowserAnimationsModule, BrowserModule, CommonModule, provideAnimationsAsync()] // Toastr providers],
};
