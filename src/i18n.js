import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en/translation.json';
import taTranslations from './locales/ta/translation.json';
import hiTranslations from './locales/hi/translation.json';
import bnTranslations from './locales/bn/translation.json';
import teTranslations from './locales/te/translation.json';
import mrTranslations from './locales/mr/translation.json';
import guTranslations from './locales/gu/translation.json';
import urTranslations from './locales/ur/translation.json';
import knTranslations from './locales/kn/translation.json';
import mlTranslations from './locales/ml/translation.json';
import orTranslations from './locales/or/translation.json';
import paTranslations from './locales/pa/translation.json';
import asTranslations from './locales/as/translation.json';
import 'intl-pluralrules'; // Polyfill for pluralization

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      ta: {
        translation: taTranslations,
      },
      hi: {
        translation: hiTranslations,
      },
      bn: {
        translation: bnTranslations,
      },
      te: {
        translation: teTranslations,
      },
      mr: {
        translation: mrTranslations,
      },
      gu: {
        translation: guTranslations,
      },
      ur: {
        translation: urTranslations,
      },
      kn: {
        translation: knTranslations,
      },
      ml: {
        translation: mlTranslations,
      },
      or: {
        translation: orTranslations,
      },
      pa: {
        translation: paTranslations,
      },
      as: {
        translation: asTranslations,
      },
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
