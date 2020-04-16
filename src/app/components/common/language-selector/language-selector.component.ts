import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthFacade} from '../../../states/facade/authFacade';
import {LanguageSetting} from '../../../configs/language-settings.config';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

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
export class LanguageSelectorComponent implements OnInit, OnDestroy {
  private readonly _onDestroy = new Subject();
  selectedLanguage: { value: LanguageSetting; img: LanguageSetting; };
  dropdownClicked = false;
  languages = [
    {value: LanguageSetting.EN, img: LanguageSetting.ENIMG},
    {value: LanguageSetting.DE, img: LanguageSetting.DEIMG}, ];

  constructor(
    public readonly _translateService: TranslateService,
    private readonly _authFacade: AuthFacade
  ) {
  }

  changeLanguage(): void {
    this._authFacade.changeLanguage(this.selectedLanguage.value);
  }

  ngOnInit(): void {
    this._authFacade.getLanguage()
      .pipe(takeUntil(this._onDestroy))
      .subscribe((lang: LanguageSetting) => {
      this.selectedLanguage = this.languages.find(languages => languages.value === lang);
      this._translateService.use(lang);
    });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

}
