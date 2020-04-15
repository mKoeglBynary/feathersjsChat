import { Pipe, PipeTransform } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import * as moment from 'moment';
import {LanguageSetting} from '../configs/language-settings.config';

@Pipe({
  name: 'localizedDate',
  pure: false
})
export class LocalizedDatePipe implements PipeTransform {
  constructor(
    private translateService: TranslateService
  ) {}

  transform(value: number): string {
    moment.locale(this.translateService.currentLang);

    return moment(value).format(LanguageSetting.MomentDateFormat);
  }

}
