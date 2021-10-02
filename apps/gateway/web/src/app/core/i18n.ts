import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import XHR from 'i18next-xhr-backend';

const backendOptions = {
  loadPath: '/assets/i18n/web/locale-{{lng}}.json',
  crossDomain: true,
};

i18next
  .use(XHR)
  .use(initReactI18next)
  .init({
    backend: backendOptions,
    debug: true,
    lng: 'en',
    fallbackLng: false,
    react: {
      wait: true
    }
  });

export default i18next;
