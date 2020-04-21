import { Pipe, PipeTransform } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DateFormat} from '../../environments/environment';
import * as moment from 'moment';

@Pipe({
  name: 'localizedDate',
  pure: false
})
export class LocalizedDatePipe implements PipeTransform {
  constructor(
    private _translateService: TranslateService
  ) {}

  transform(value: number, format?: string): string {
    moment.locale(this._translateService.currentLang);

    return moment(value).format(format || DateFormat);
  }

}
