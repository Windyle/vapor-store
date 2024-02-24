import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-card',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './add-card.component.html',
  styleUrl: './add-card.component.scss',
})
export class AddCardComponent {
  // Constants
  public faPlusCircle = faPlusCircle;
}
