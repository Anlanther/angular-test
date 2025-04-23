import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AGGridT2Component } from './ag-grid-t2/ag-grid-t2.component';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AgGridAngular, AGGridT2Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.html',
})
export class AppComponent {
  // Row Data: The data to be displayed.
  rowData = [
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  ];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
    { field: 'electric' },
  ];
}
