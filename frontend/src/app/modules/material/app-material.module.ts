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
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import {DomSanitizer} from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';

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
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatGridListModule,
  MatTableModule,
  MatDialogModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatSortModule,
  MatSelectModule,
  MatSnackBarModule,
  MatStepperModule,
  FormsModule,
  MatRadioModule
];

const customIcons = [
  'github',
  'signin',
  'bear',
  'bird',
  'carrot',
  'dinosaur',
  'girl',
  'panda',
  'peach',
  'sloth',
  'sun',
  'gender',
  'role',
  'user',
  'host',
  'tenant1',
  'tenant2',
  'default',
  'superman',
  'role',
  'hacker',
  'priority-1',
  'priority-2',
  'priority-3',
  'priority',
  'edit',
  'comment'
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
