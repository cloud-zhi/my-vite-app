import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider, Layout, Result } from 'antd';

import zhCN from 'antd/es/locale/zh_CN';

import ROUTES, { IRoute } from './routes';

import ErrorBoundary from './components/ErrorBoundary';

import './App.css';

const makeRoute: (route: any | undefined, baseUrl?: string) => any = (
  route,
  baseUrl = '',
) => {
  if (typeof route === undefined) {
    return;
  }

  const { path, Element, routes } = route;
  const url = `${baseUrl}/${path}`;

  if (Array.isArray(routes)) {
    return routes.map((subRoute) => makeRoute(subRoute, url));
  }

  return <Route key={url} path={url} element={Element} />;
};

function FullBack() {
  return <div>加载中...</div>;
}

function App() {
  return (
    <div className="App">
      <ConfigProvider locale={zhCN}>
        <BrowserRouter>
          <Layout>
            <ErrorBoundary>
              {/* 使用懒加载会导致加载延迟，使用suspense优化体验 */}
              <Suspense fallback={<FullBack />}>
                <Routes>
                  {ROUTES.map((route) => makeRoute(route))
                    .flat(Infinity)
                    .filter(Boolean)}

                  <Route
                    path="*"
                    element={
                      <div style={{ marginTop: 80 }}>
                        <Result
                          status="404"
                          title="404"
                          subTitle="抱歉，您访问的资源不存在"
                        />
                      </div>
                    }
                  />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </Layout>
        </BrowserRouter>
      </ConfigProvider>
    </div>
  );
}

export default App;
