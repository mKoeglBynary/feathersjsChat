import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthFacade} from '../../../states/facade/authFacade';

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
  selectedValue = 'en';
  languages = [
    {
      value: 'en',
    }, {
      value: 'de',
    }, ];

  constructor(
    public translateService: TranslateService,
    private authFacade: AuthFacade
  ) {
    translateService.addLangs(['de', 'en']);
    translateService.setDefaultLang('en');
  }

  changeLanguage() {
    this.authFacade.changeLanguage(this.selectedValue);
  }

  ngOnInit() {
    this.authFacade.getLanguage().subscribe(lang => {
      this.selectedValue = lang;
      this.translateService.use(lang);
    });
  }

}
