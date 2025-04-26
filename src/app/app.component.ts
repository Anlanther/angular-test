import { Component, computed, input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef } from 'ag-grid-community';
import {
  AllCommunityModule,
  ModuleRegistry,
  themeAlpine,
  themeBalham,
  themeMaterial,
  themeQuartz,
} from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  stringTheme = input('themeQuartz');
  parameters = input('themeQuartz');

  theme = computed(
    () => this.themes.find((t) => t.label === this.stringTheme())?.theme
  );

  themes = [
    { label: 'themeQuartz', theme: themeQuartz },
    { label: 'themeBalham', theme: themeBalham },
    { label: 'themeMaterial', theme: themeMaterial },
    { label: 'themeAlpine', theme: themeAlpine },
  ];

  rowData = [
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  ];

  colDefs: ColDef[] = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
    { field: 'electric' },
  ];
}
