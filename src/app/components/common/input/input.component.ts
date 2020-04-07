import {Component, Input, OnInit} from '@angular/core';
import {ControlContainer, FormGroupDirective} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  viewProviders: [{
    provide: ControlContainer,
    useExisting: FormGroupDirective
  }]
})
export class InputComponent implements OnInit {
  @Input() data;
  @Input() errors: {};
  formControlName: string;
  type;
  label: string;
  constructor() { }

  ngOnInit(): void {
    const {formControlName, type, label}  = this.data;
    this.formControlName = formControlName;
    this.type = type;
    this.label = label;
  }
}
