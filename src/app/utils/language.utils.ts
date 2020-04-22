import {Language} from '../models/configs/language-options.model';

export namespace LanguageUtils {

  export const COUNTRY_FLAGS: Record<Language, string> = {
    [Language.EN]: 'united-kingdom',
    [Language.DE]: 'germany'
  };

  export function getCountryFlag(language: Language): string {
    const country = COUNTRY_FLAGS[language];
    return `https://api.iconify.design/twemoji:flag-for-flag-${country}.svg`;
  }
}


