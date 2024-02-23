import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, input } from '@angular/core';

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
  @Input() set size(value: 'small' | 'medium' | 'large' | 'block') {
    this.sizeClass = value;
  }
  sizeClass: string = 'medium';

  @Input() color: 'primary' | 'accent' | 'danger' | 'neutral' = 'neutral';

  @Output() onClick = new EventEmitter<void>();

  onClickBtn(): void {
    this.onClick.emit();
  }
}
