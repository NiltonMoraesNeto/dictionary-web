import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

import translationEn from './../locales/en/translation.json'
import translationBr from './../locales/br/translation.json'
import translationEs from './../locales/es/translation.json'

const resources = {
  en: { translation: translationEn },
  br: { translation: translationBr },
  es: { translation: translationEs },
}

const supportedLanguages = ['br', 'en', 'es']
const fallbackLanguage = 'br'

const detectedLanguage = () => {
  const languageSelected = localStorage?.getItem('i18nextLng')
  const userLanguage = !languageSelected ? navigator.language : languageSelected
  return supportedLanguages.includes(userLanguage)
    ? userLanguage
    : fallbackLanguage
}

export const initI18n = () => {
  return i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      supportedLngs: supportedLanguages,
      lng: detectedLanguage(),
      fallbackLng: 'br',
      interpolation: {
        escapeValue: false,
      },
    })
}

export default i18n