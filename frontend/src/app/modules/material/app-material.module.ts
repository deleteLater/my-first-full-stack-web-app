import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTreeModule} from '@angular/material/tree';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatRippleModule} from '@angular/material/core';
import {LayoutModule} from '@angular/cdk/layout';
import {MatMenuModule} from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
import {DomSanitizer} from '@angular/platform-browser';

const materials = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatTabsModule,
  MatSidenavModule,
  MatTreeModule,
  MatExpansionModule,
  MatListModule,
  MatRippleModule,
  LayoutModule,
  MatMenuModule,
  MatGridListModule
];

const customIcons = [
  'github',
  'signin'
];

@NgModule({
  imports: [materials],
  exports: [materials],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppMaterialModule {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    customIcons.forEach(iconName => {
      this.matIconRegistry.addSvgIcon(
        iconName,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icon/${iconName}.svg`)
      );
    });
  }
}
