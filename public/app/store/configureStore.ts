import { configureStore as reduxConfigureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { ThunkMiddleware } from 'redux-thunk';
import { setStore } from './store';
import { StoreState } from 'app/types/store';
import { addReducer, createRootReducer } from '../core/reducers/root';
import { buildInitialState } from '../core/reducers/navModel';

export function addRootReducer(reducers: any) {
  // this is ok now because we add reducers before configureStore is called
  // in the future if we want to add reducers during runtime
  // we'll have to solve this in a more dynamic way
  addReducer(reducers);
}

export function configureStore(initialState?: Partial<StoreState>) {
  const reduxDefaultMiddleware = getDefaultMiddleware<StoreState>({
    thunk: true,
    serializableCheck: false,
    immutableCheck: false,
  } as any);

  const store = reduxConfigureStore<StoreState>({
    reducer: createRootReducer(),
    middleware: (reduxDefaultMiddleware as unknown) as [ThunkMiddleware<StoreState>],
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: {
      navIndex: buildInitialState(),
      ...initialState,
    },
  });

  setStore(store);
  return store;
}

/*
function getActionsToIgnoreSerializableCheckOn() {
  return [
    'dashboard/setPanelAngularComponent',
    'dashboard/panelModelAndPluginReady',
    'dashboard/dashboardInitCompleted',
    'plugins/panelPluginLoaded',
    'explore/initializeExplore',
    'explore/changeRange',
    'explore/updateDatasourceInstance',
    'explore/queryStoreSubscription',
    'explore/queryStreamUpdated',
  ];
}

function getPathsToIgnoreMutationAndSerializableCheckOn() {
  return [
    'plugins.panels',
    'dashboard.panels',
    'dashboard.getModel',
    'payload.plugin',
    'panelEditorNew.getPanel',
    'panelEditorNew.getSourcePanel',
    'panelEditorNew.getData',
    'explore.left.queryResponse',
    'explore.right.queryResponse',
    'explore.left.datasourceInstance',
    'explore.right.datasourceInstance',
    'explore.left.range',
    'explore.left.eventBridge',
    'explore.right.eventBridge',
    'explore.right.range',
    'explore.left.querySubscription',
    'explore.right.querySubscription',
  ];
}
*/
