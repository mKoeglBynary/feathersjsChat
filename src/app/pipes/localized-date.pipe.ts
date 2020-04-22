import { Pipe, PipeTransform } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import * as moment from 'moment';

@Pipe({
  name: 'localizedDate',
  pure: false
})
export class LocalizedDatePipe implements PipeTransform {
  constructor(
    private _translateService: TranslateService
  ) {}

  transform(value: number, format: string = 'LLL'): string {
    moment.locale(this._translateService.currentLang);

    return moment(value).format(format);
  }

}
