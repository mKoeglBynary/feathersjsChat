import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthFacade} from '../../../states/facade/authFacade';
import {Language} from '../../../configs/language-settings.config';
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
  selectedLanguage: Language;
  dropdownClicked = false;
  languages: Language[] = Object.keys(Language).map(language => Language[language]);


  constructor(
    private readonly translateService: TranslateService,
    private readonly _authFacade: AuthFacade
  ) {
  }

  changeLanguage(): void {
    this._authFacade.changeLanguage(this.selectedLanguage);
  }

  ngOnInit(): void {
    this._authFacade.getLanguage()
      .pipe(takeUntil(this._onDestroy))
      .subscribe((language: Language) => {
        this.selectedLanguage = language;
        this.translateService.use(this.selectedLanguage.value);
    });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

}
