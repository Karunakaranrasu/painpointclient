import { Component, Input, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '../../../core/Model/object-model';
@Component({
  selector: 'pps-input',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './InputFormControl.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFormControlComponent),
      multi: true
    }
  ],
  styleUrl: './InputFormControl.component.css'
})
export class InputFormControlComponent {
  @Input() Settings!: FormControl;
  @Input() DefaultLabel!: string;
  value!: string;
  length = 2;
  private onChange!: (value: string | number) => void;
  private onTouched!: () => void;

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string | number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implement if necessary
  }

  onInputChange(event: any) {
    const value = event.target.value;
    this.value = value;
    console.log("On Change:",this.onChange)
    if (this.onChange) {
      this.onChange(value);
    }
    if (this.onTouched) {
      this.onTouched();
    }
  }
}
