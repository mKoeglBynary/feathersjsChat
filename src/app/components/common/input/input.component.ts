import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ControlContainer, FormGroupDirective} from '@angular/forms';
import {IInputControl} from '../../../models/interfaces/input-control.model.i';

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
  @Input() data: IInputControl;

  inputControl: IInputControl;
  error: string;

  constructor() {
  }

  ngOnInit(): void {
    this.inputControl = this.data;
  }

  isErrorState(): boolean {
    const control = this.inputControl.formControl;
    const errors = this.inputControl.errors;
    if (0 === errors.length) {
      return false;
    }

    this.setErrors();
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  setErrors() {
    for (const error of this.inputControl.errors) {
      if (this.inputControl.formControl.hasError(error.name)) {
        this.error = error.text;
        break;
      }
    }
  }
}
