import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FridgeComponent } from './fridge/fridge.component';
import { ScannerComponent } from './scanner/scanner.component';
import { SettingsComponent } from './settings/settings.component';
import { ShopListComponent } from './shop-list/shop-list.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'fridge', component: FridgeComponent},
  {path: 'scanner', component: ScannerComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'shop-list', component: ShopListComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
