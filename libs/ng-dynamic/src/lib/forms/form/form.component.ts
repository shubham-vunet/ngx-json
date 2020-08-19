import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Fields, Field } from '../../models';

@Component({
  selector: 'ng-dynamic-form',
  templateUrl: './form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit, OnChanges {
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSubmit = new EventEmitter();
  @Input() formfields: Fields = [];
  @Input() submitText = 'Save';
  initialised: boolean;
  form: FormGroup;
  constructor() {}

  ngOnInit() {
    this.__updateForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.__updateForm();
  }
  __updateForm() {
    const formControls = {};
    this.formfields.forEach((__field) => {
      formControls[__field.name] = new FormControl(
        __field.value || '',
        this.getValidators(__field)
      );
    });
    this.form = new FormGroup(formControls);
    this.initialised = true;
  }
  getValidators(field: Field) {
    const validators = [];

    if (field.required) {
      validators.push(Validators.required);
    }
    if (field.type === 'email') {
      validators.push(Validators.email);
    }

    if (field.regularExpression) {
      validators.push(Validators.pattern(field.regularExpression));
    }

    return validators;
  }
}
