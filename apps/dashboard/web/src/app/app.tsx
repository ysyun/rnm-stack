import { Suspense, useEffect } from 'react';
import { Spin } from 'antd';
import { useCookieState } from 'ahooks';

import styles from './app.module.scss';
import { config } from '../environments/environment';

export function App() {
  // set language
  const [,setCookie] = useCookieState('I18N_LANG');
  useEffect(() => {
    setCookie(config.I18N_LANG);
  }, []);

  return (
    <Suspense fallback={<Spin size="large" className={styles.spinner}/>}>
      <div>dashboard</div>
    </Suspense>
  );
}
export default App;
