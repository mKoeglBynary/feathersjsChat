import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthFacade} from '../../../states/facade/authFacade';
import {LanguageSetting} from '../../../configs/language-settings.config';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    class: 'app-language-selector'
  }
})
export class LanguageSelectorComponent implements OnInit {
  selectedLanguage: { value: LanguageSetting; img: LanguageSetting; };
  dropdownClicked = false;
  languages = [
    {value: LanguageSetting.EN, img: LanguageSetting.ENIMG},
    {value: LanguageSetting.DE, img: LanguageSetting.DEIMG}, ];


  constructor(
    public translateService: TranslateService,
    private authFacade: AuthFacade
  ) {
  }

  changeLanguage(): void {
    this.authFacade.changeLanguage(this.selectedLanguage.value);
  }

  ngOnInit(): void {
    this.authFacade.getLanguage().subscribe((lang: string) => {
      this.selectedLanguage = this.languages.find(languages => languages.value === lang);
      this.translateService.use(lang);
    });
  }

}
