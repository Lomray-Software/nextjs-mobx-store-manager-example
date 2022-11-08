import type Endpoints from '../services/endpoints';

export * from '@lomray/react-mobx-manager';

declare module '@lomray/react-mobx-manager' {
  interface IConstructorParams {
    endpoints: Endpoints;
  }
}
