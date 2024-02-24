import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
} from '@angular/core';
import { ModalButton } from '../../../core/types/modal-button';
import { ButtonComponent } from '../../components/button/button.component';
import { ButtonColors } from '../../../core/enums/button-colors';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  // Public Properties
  public title = '';
  public message = '';
  public confirmButton: ModalButton = {
    text: 'Confirm',
    color: ButtonColors.Primary,
  };
  public cancelButton: ModalButton = {
    text: 'Cancel',
    color: ButtonColors.Neutral,
  };

  public closeModal = new EventEmitter<boolean>();

  // Public Methods
  public close(confirm: boolean): void {
    this.closeModal.emit(confirm);
  }

  public onConfirm(): void {
    this.close(true);
  }

  public onCancel(): void {
    this.close(false);
  }

  public messageSpan(): string {
    return `<span>${this.message}</span>`;
  }
}
