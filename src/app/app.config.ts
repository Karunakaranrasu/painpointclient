import { ApplicationConfig,importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { MyState } from './shared/store/mystate'
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), provideHttpClient(),
    importProvidersFrom(
      NgxsModule.forRoot([MyState]),
      isDevMode() ? NgxsLoggerPluginModule.forRoot() : []
    )
  ]
};
