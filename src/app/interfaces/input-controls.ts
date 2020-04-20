import {FormControl} from '@angular/forms';
import {IError} from './error';

export interface IInputControls {
  formControl: FormControl;
  name: string;
  label?: string;
  type?: string;
  errors?: IError[];
}
