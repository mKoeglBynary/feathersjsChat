export class Language {
  static readonly ENGLISH = new Language('en', 'united-kingdom');
  static readonly GERMAN = new Language('de', 'germany');

  constructor(public readonly value: string, public readonly img: string) {
    this.img = `https://api.iconify.design/twemoji:flag-for-flag-${img}.svg`;
  }
}
