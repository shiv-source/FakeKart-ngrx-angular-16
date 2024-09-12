import { isDevMode, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from 'src/environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ProductCardModule } from './components/product-card/product-card.module'
import { FooterComponent } from './layouts/footer/footer.component'
import { HeaderComponent } from './layouts/header/header.component'
import { HomeComponent } from './pages/home/home.component'
import { ProductEffects } from './store/product/product.effect'
import { metaReducers, reducers } from './store/reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

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
        EffectsModule.forRoot([ProductEffects]),
        storeDevtoolsModule,
        ProductCardModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
