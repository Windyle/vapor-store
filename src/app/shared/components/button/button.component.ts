import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { ButtonColor } from '../../../core/types/button-color';
import { ButtonColors } from '../../../core/enums/button-colors';
import { ButtonSize } from '../../../core/types/button-size';
import { ButtonSizes } from '../../../core/enums/button-sizes';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  host: {
    '[class]': 'sizeClass',
  },
})
export class ButtonComponent {
  // Inputs
  @Input() set size(value: ButtonSize) {
    this.sizeClass = value || ButtonSizes.Medium;
  }

  @Input() color: ButtonColor = ButtonColors.Neutral;

  // Outputs
  @Output() clickEvent = new EventEmitter<Event>();

  // Public Properties
  public sizeClass: string = ButtonSizes.Medium;

  // Public Methods
  public onClickBtn(e: Event): void {
    this.clickEvent.emit(e);
  }
}
