import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './menu/menu.component';
import { FridgeComponent } from './fridge/fridge.component';
import { LoginComponent } from './login/login.component';
import { ScannerComponent } from './scanner/scanner.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SettingsComponent } from './settings/settings.component';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { ChangeCredentialsComponent } from './settings/change-credentials/change-credentials.component';
import { ChangeNotifyComponent } from './settings/change-notify/change-notify.component';
import { LogupComponent } from './logup/logup.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { AuthGuard } from './services/auth-guard.service';
import { AlreadyAuthGuard } from './services/alreadyAuth-guard.service';
import { FilterProductPipePipe } from './filter-product--pipe.pipe';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@NgModule({
  declarations: [AppComponent,
    MenuComponent,
    FridgeComponent, 
    LoginComponent,
    ScannerComponent,
    SettingsComponent,
    ChangePasswordComponent,
    ChangeCredentialsComponent,
    ChangeNotifyComponent,
    LogupComponent,
    FilterProductPipePipe,
    ShopListComponent,
    ],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule],
  providers: [
    AuthGuard,
    AlreadyAuthGuard,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
