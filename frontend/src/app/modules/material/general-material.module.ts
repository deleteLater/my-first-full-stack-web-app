import { NgModule } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';

const materials = [
  MatTabsModule
];

@NgModule({
  imports: [materials],
  exports: [materials]
})
export class GeneralMaterialModule { }
