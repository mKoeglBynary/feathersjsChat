import { Pipe, PipeTransform } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import * as moment from 'moment';

@Pipe({
  name: 'localizedDate',
  pure: false
})
export class LocalizedDatePipe implements PipeTransform {
  constructor(
    private translateService: TranslateService
  ) {}

  transform(value: any, pattern: string = 'mediumDate'): unknown {
    moment.locale(this.translateService.currentLang);
    return moment(value).format('LLLL');
  }

}
