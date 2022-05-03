import { lazy } from 'react';

export interface IRoute {
  path: string;
  Element?: React.ReactElement;
  routes?: IRoute[];
}

const Home = lazy(() => import('./../pages/Home'));

const ROUTES: Array<IRoute | undefined> = [
  {
    path: 'home',
    Element: <Home />,
  },
];

export default ROUTES;
