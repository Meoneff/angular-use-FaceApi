import { provideAnimations } from "@angular/platform-browser/animations";
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState,provideStore } from '@ngrx/store';
import { provideHttpClient } from "@angular/common/http";
import { attendanceReducer } from './ngrx/reducer/attendance.reducer';
import { provideEffects } from '@ngrx/effects';
import { AttendanceEffects } from './ngrx/effects/attendance.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(), provideRouter(routes), provideAnimationsAsync('noop'),
  provideStore(),
  provideState({name:'attendance', reducer: attendanceReducer}),
  provideEffects(
    [
      AttendanceEffects
    ]
  ),

  provideHttpClient(), provideAnimationsAsync()
]
};
