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
  selectedValue: string;
  languages = [
    {value: LanguageSetting.EN},
    {value: LanguageSetting.DE}, ];


  constructor(
    public translateService: TranslateService,
    private authFacade: AuthFacade
  ) {
  }

  changeLanguage(): void {
    this.authFacade.changeLanguage(this.selectedValue);
  }

  ngOnInit(): void {
    this.authFacade.getLanguage().subscribe((lang: string) => {
      this.selectedValue = lang;
      this.translateService.use(lang);
    });
  }

}
