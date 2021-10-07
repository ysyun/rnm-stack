import * as ReactDOM from 'react-dom';

import { initI18N } from '@rnm/ui';

import App from './app/app';
import { config } from './environments/environment';

initI18N(config);
ReactDOM.render(<App />, document.getElementById('root'));
