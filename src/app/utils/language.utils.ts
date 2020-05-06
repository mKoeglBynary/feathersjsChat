import { Language } from '../models/language-options.model';

export namespace LanguageUtils {

    export const COUNTRY_FLAGS: Record<Language, string> = {
        [Language.EN]: 'united-kingdom',
        [Language.DE]: 'germany',
        [Language.FR]: 'france'
    };

    export function getCountryFlag(language: Language): string {
        const country = COUNTRY_FLAGS[language];
        return `https://api.iconify.design/twemoji:flag-for-flag-${country}.svg`;
    }
}


