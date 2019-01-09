import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule,
         MatCheckboxModule,
         MatSelectModule,
         MatGridListModule,
         MatCardModule,
         MatDividerModule
         } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatSelectModule,
    MatGridListModule,
    MatDividerModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatSelectModule,
    MatGridListModule,
    MatDividerModule

  ],
  declarations: []
})
export class MaterialModule { }
