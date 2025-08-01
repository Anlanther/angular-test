import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community'; // Column Definition Type Interface
import {
  AllCommunityModule,
  ClientSideRowModelModule,
  ModuleRegistry,
} from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { AppStateService } from './state/app-state.service';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule]);

@Component({
  selector: 'app-root',
  imports: [AgGridAngular],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy, OnInit {
  gridApi!: GridApi;

  private subs = new Subscription();

  stateService = inject(AppStateService); // Inject the AppStateService

  ngOnInit(): void {
    this.stateService.initialiseEffect();
  }

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

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    console.log('Grid API:', this.gridApi);

    this.subs.add(
      // this.stateService.singleLevelLoad$.subscribe((load) => {
      this.stateService.nestedLoadGrid$.subscribe((load) => {
        console.log('Grid Load State:', load);
        this.gridApi.setGridOption('loading', load);
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
