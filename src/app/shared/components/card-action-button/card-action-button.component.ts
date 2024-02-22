import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-card-action-button',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './card-action-button.component.html',
  styleUrl: './card-action-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardActionButtonComponent {
  // Properties
  icon = input.required<IconProp>();

  // Methods
  onClick(e: MouseEvent) {
    e.stopPropagation();

    console.log('CardActionButtonComponent.onClick');
  }
}
