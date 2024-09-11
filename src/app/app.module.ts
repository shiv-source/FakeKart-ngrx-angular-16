import { isDevMode, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ProductCardModule } from './components/product-card/product-card.module'
import { FooterComponent } from './layouts/footer/footer.component'
import { HeaderComponent } from './layouts/header/header.component'
import { HomeComponent } from './pages/home/home.component'
import { ProductEffects } from './store/product/product.effect'
import { metaReducers, reducers } from './store/reducer'

@NgModule({
    declarations: [AppComponent, HomeComponent, HeaderComponent, FooterComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CommonModule,
        HttpClientModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([ProductEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: isDevMode()
        }),
        ProductCardModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
