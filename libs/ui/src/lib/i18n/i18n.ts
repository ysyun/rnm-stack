import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import XHR from 'i18next-xhr-backend';

export function initI18N(config: any) {
  const backendOptions = {
    loadPath: (config.I18N_JSON_PATH || '/assets/i18n/') + 'locale-{{lng}}.json',
    crossDomain: true,
  };
  
  i18next
    .use(XHR)
    .use(initReactI18next)
    .init({
      backend: backendOptions,
      debug: true,
      lng: config.I18N_LANG || 'en',
      fallbackLng: false,
      react: {
        wait: true
      }
    });
}