import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FridgeComponent } from './fridge/fridge.component';
import { ScannerComponent } from './scanner/scanner.component';
import { SettingsComponent } from './settings/settings.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { LogupComponent } from './logup/logup.component';
import { AuthGuard } from './services/auth-guard.service';
import { AlreadyAuthGuard } from './services/alreadyAuth-guard.service';

const routes: Routes = [
  {path: '', canActivate: [AlreadyAuthGuard], component: LoginComponent},
  {path: 'fridge', canActivate: [AuthGuard] ,component: FridgeComponent},
  {path: 'scanner', canActivate: [AuthGuard] ,component: ScannerComponent},
  {path: 'settings', canActivate: [AuthGuard] ,component: SettingsComponent},
  {path: 'shop-list', canActivate: [AuthGuard] ,component: ShopListComponent},
  {path: 'logup', canActivate: [AlreadyAuthGuard], component: LogupComponent}

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
