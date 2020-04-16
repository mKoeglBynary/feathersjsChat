import {FormControl} from '@angular/forms';

export interface InputControls {
  formControl: FormControl;
  name: string;
  label?: string;
  type?: string;
  errors?: {name: string, text: string}[];
}
