import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Language } from '../../../models/configs/language-options.model';
import { AuthFacade } from '../../../states/facade/auth.facade';
import { EnumUtils } from '../../../utils/enum.utils';
import { LanguageUtils } from '../../../utils/language.utils';

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
    selectedLanguage: Language;
    showDropdown: boolean = false;
    getCountryFlag = LanguageUtils.getCountryFlag;
    languages: Language[] = EnumUtils.getValues(Language);
    private readonly _onDestroy = new Subject();


    constructor(
        private readonly _translateService: TranslateService,
        private readonly _authFacade: AuthFacade
    ) {

    }

    languageSelected(language: Language): void {
        this.changeLanguage(language);
        this.setDropdownVisibility(false);
    }

    changeLanguage(language: Language): void {
        this.selectedLanguage = language;
        this._authFacade.changeLanguage(this.selectedLanguage);
    }

    setDropdownVisibility(showDropdown: boolean): void {
        this.showDropdown = showDropdown;
    }

    ngOnInit(): void {
        this._authFacade.getLanguage()
            .pipe(takeUntil(this._onDestroy))
            .subscribe((language: Language) => {
                this.selectedLanguage = language;
                this._translateService.use(this.selectedLanguage);
            });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
