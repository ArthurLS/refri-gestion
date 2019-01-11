import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ScannerComponent } from './scanner/scanner.component';
import { FridgeComponent } from './fridge/fridge.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { SettingsComponent } from './settings/settings.component';
import { MenuComponent } from './menu/menu.component';
import { LogupComponent } from './logup/logup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ScannerComponent,
    FridgeComponent,
    ShopListComponent,
    SettingsComponent,
    MenuComponent,
    LogupComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
