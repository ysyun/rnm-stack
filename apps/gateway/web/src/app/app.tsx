import { Suspense } from 'react';

import styles from './app.module.scss';
import Login from './login/login';

import './core/i18n';

const Loader = () => (
  <div className={styles.loading}>
    {/* <img src={logo} className="App-logo" alt="logo" /> */}
    <div>loading...</div>
  </div>
);

export function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Login />;
    </Suspense>
  );
}
export default App;
