import { FilterProductPipePipe } from './filter-product--pipe.pipe';
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
import { AuthGuard } from './services/auth-guard.service';
import { AlreadyAuthGuard } from './services/alreadyAuth-guard.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ScannerComponent,
    FridgeComponent,
    ShopListComponent,
    SettingsComponent,
    MenuComponent,
    LogupComponent,
    FilterProductPipePipe
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers:[
    AuthGuard,
    AlreadyAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
