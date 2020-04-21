import {Language} from './language-options.model';

export const COUNTRY_FLAGS: Record<Language, string> = {
  [Language.EN]: 'united-kingdom',
  [Language.DE]: 'germany'
};

export function getFlag(language: Language): string {
  const country = COUNTRY_FLAGS[language];
  return `https://api.iconify.design/twemoji:flag-for-flag-${country}.svg`;
}


