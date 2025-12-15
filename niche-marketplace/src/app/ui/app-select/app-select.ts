import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SelectOption {
  value: any;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-select',
  imports: [CommonModule, FormsModule],
  templateUrl: './app-select.html',
  styleUrl: './app-select.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppSelect),
      multi: true
    }
  ]
})
export class AppSelect implements ControlValueAccessor {
  @Input() id = '';
  @Input() label = '';
  @Input() placeholder = '';
  @Input() error = '';
  @Input() hint = '';
  @Input() disabled = false;
  @Input() multiple = false;
  @Input() options: SelectOption[] = [];
  
  selectedValue: any = '';
  selectedValues: any[] = [];
  
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    if (this.multiple) {
      this.selectedValues = Array.isArray(value) ? value : [];
    } else {
      this.selectedValue = value || '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onSingleChange(value: any): void {
    this.selectedValue = value;
    this.onChange(value);
    this.onTouched();
  }

  onMultipleChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const selected = Array.from(select.selectedOptions).map(option => option.value);
    this.selectedValues = selected;
    this.onChange(selected);
    this.onTouched();
  }

  removeTag(value: any): void {
    this.selectedValues = this.selectedValues.filter(v => v !== value);
    this.onChange(this.selectedValues);
  }

  getSelectedOptions(): SelectOption[] {
    return this.options.filter(option => 
      this.selectedValues.includes(option.value)
    );
  }

  isOptionSelected(value: any): boolean {
    return this.selectedValues.includes(value);
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
