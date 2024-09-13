import { isDevMode, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { CarouselModule } from 'ngx-owl-carousel-o'
import { environment } from 'src/environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ProductCarousalModule } from './components/product-carousal/product-carousal.module'
import { FooterComponent } from './layouts/footer/footer.component'
import { HeaderComponent } from './layouts/header/header.component'
import { HomeComponent } from './pages/home/home.component'
import { AppDirectiveModule } from './reusable/directives/directive.module'
import { UtilsModule } from './services/utils.module'
import { rootEffects } from './store/effect'
import { metaReducers, reducers } from './store/reducer'

const storeDevtoolsModule = !environment.production
    ? [
          StoreDevtoolsModule.instrument({
              maxAge: 25,
              logOnly: !isDevMode()
          })
      ]
    : []

@NgModule({
    declarations: [AppComponent, HomeComponent, HeaderComponent, FooterComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CommonModule,
        HttpClientModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot(rootEffects),
        storeDevtoolsModule,
        BrowserAnimationsModule,
        CarouselModule,
        ProductCarousalModule,
        UtilsModule,
        AppDirectiveModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
