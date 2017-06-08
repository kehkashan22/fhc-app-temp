import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

// Uncomment it for production
/*import { enableProdMode } from '@angular/core';


enableProdMode();*/

platformBrowserDynamic().bootstrapModule(AppModule);
