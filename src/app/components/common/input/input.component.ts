import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ControlContainer, FormControl, FormGroupDirective} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    class: 'app-input'
  },
  viewProviders: [{
    provide: ControlContainer,
    useExisting: FormGroupDirective
  }]
})
export class InputComponent implements OnInit {
  @Input() data;
  allErrors: {name: string, text: string}[];
  error: string;
  name: string;
  formControl: FormControl;
  type: string;
  label: string;
  constructor() { }

  ngOnInit(): void {
    const {formControl, name, type = 'text', label, errors = []}  = this.data;
    this.name = name;
    this.type = type;
    this.label = label;
    this.formControl = formControl;
    this.allErrors = errors;
  }

  isErrorState(control: FormControl): boolean {
    if (this.allErrors.length === 0) { return false; }

    this.setErrors();
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  setErrors() {
    for (const error of this.allErrors) {
      if (this.formControl.hasError(error.name)) {
        this.error = error.text;
        break;
      }
    }
  }
}
