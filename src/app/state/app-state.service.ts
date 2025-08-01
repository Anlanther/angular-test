import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { delay, map, of, switchMap, tap } from 'rxjs';

const DELAY_TIME = 10_000; // Delay time in milliseconds

export interface AppState {
  isSingleLevelLoad: boolean;
  isNestedLoad: { grid: boolean; toolPanel: boolean };
}

export const initialAppState: AppState = {
  isSingleLevelLoad: false,
  isNestedLoad: { grid: false, toolPanel: false },
};

@Injectable({ providedIn: 'root' })
export class AppStateService extends ComponentStore<AppState> {
  singleLevelLoad$ = this.select((state) => state.isSingleLevelLoad);
  nestedLoadGrid$ = this.select((state) => state.isNestedLoad.grid);

  constructor() {
    super(initialAppState);
  }

  readonly setSingleLevelLoad = this.updater(
    (state, isSingleLevelLoad: boolean) => ({
      ...state,
      isSingleLevelLoad,
    })
  );

  readonly setNestedLoadGrid = this.updater((state, gridLoading: boolean) => ({
    ...state,
    isNestedLoad: { ...state.isNestedLoad, grid: gridLoading },
  }));

  readonly setNestedLoadToolPanel = this.updater(
    (state, toolPanelLoading: boolean) => ({
      ...state,
      isNestedLoad: { ...state.isNestedLoad, toolPanel: toolPanelLoading },
    })
  );

  readonly initialiseEffect = this.effect((trigger$) =>
    trigger$.pipe(
      map(() => {
        this.updateToolPanelEffect();
        this.updateGridEffect();
      })
    )
  );

  readonly updateToolPanelEffect = this.effect((trigger$) =>
    trigger$.pipe(
      tap(() => this.setNestedLoadToolPanel(true)),
      switchMap(() =>
        of('Testing').pipe(
          delay(DELAY_TIME),
          tapResponse({
            next: (response) => {
              console.log('Tool panel loaded:', response);
              this.setNestedLoadToolPanel(false);
            },
            error: (error) => console.error('Error loading tool panel:', error),
          })
        )
      )
    )
  );

  readonly updateGridEffect = this.effect((trigger$) =>
    trigger$.pipe(
      tap(() => this.setNestedLoadGrid(true)),
      // tap(() => this.setSingleLevelLoad(true)),
      switchMap(() =>
        of('Testing Grid').pipe(
          delay(DELAY_TIME * 1.5),
          tapResponse({
            next: (response) => {
              console.log('Grid loaded:', response);
              this.setNestedLoadGrid(false);
              // this.setSingleLevelLoad(false);
            },
            error: (error) => console.error('Error loading grid:', error),
          })
        )
      )
    )
  );
}
