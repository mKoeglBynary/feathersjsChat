import {FormControl} from '@angular/forms';
import {IInputError} from './input-error.model.i';

export interface IInputControl {
  formControl: FormControl;
  name: string;
  label?: string;
  type?: string;
  errors?: IInputError[];
}
