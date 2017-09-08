import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

import 'web-animations-js/web-animations.min';
// Uncomment it for production
import { enableProdMode } from '@angular/core';


enableProdMode();


platformBrowserDynamic().bootstrapModule(AppModule);
