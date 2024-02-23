import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
} from '@angular/core';
import { ModalButton } from '../../../core/types/modal-button';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  // Properties
  title = '';
  message = '';
  confirmButton: ModalButton = {
    text: 'Confirm',
    color: 'primary',
  };
  cancelButton: ModalButton = {
    text: 'Cancel',
    color: 'neutral',
  };
  closeModal = new EventEmitter<boolean>();

  // Methods
  close(confirm: boolean): void {
    this.closeModal.emit(confirm);
  }

  onConfirm(): void {
    this.close(true);
  }

  onCancel(): void {
    this.close(false);
  }

  messageSpan(): string {
    return `<span>${this.message}</span>`;
  }
}
