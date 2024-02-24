import {
  ComponentRef,
  Injectable,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { ModalComponent } from './modal.component';
import { ModalButton } from '../../../core/types/modal-button';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { AlertTypes } from '../../../core/enums/alert-types';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  // Private Properties
  private rootViewContainer?: ViewContainerRef;
  private modalEvent$ = new BehaviorSubject<boolean>(false);

  // Injections
  private alertService = inject(AlertService);

  // Subscriptions
  private closeModal$?: Subscription;

  // Public Methods
  public setRootViewContainerRef(viewContainerRef: ViewContainerRef): void {
    this.rootViewContainer = viewContainerRef;
  }

  public showModal(
    title: string,
    message: string,
    confirmButton?: ModalButton,
    cancelButton?: ModalButton,
  ): BehaviorSubject<boolean> {
    // Reset the modal event subject
    this.modalEvent$ = new BehaviorSubject<boolean>(false);

    if (this.rootViewContainer) {
      // Create the modal component
      const component = this.rootViewContainer.createComponent(ModalComponent);

      // Set the modal component properties
      component.instance.title = title;
      component.instance.message = message;

      if (confirmButton) {
        component.instance.confirmButton = confirmButton;
      }

      if (cancelButton) {
        component.instance.cancelButton = cancelButton;
      }

      // Subscribe to the modal component's close event and complete the modal event subject
      this.closeModal$ = component.instance.closeModal.subscribe({
        next: (confirmed: boolean) => {
          this.closeModal(component);

          this.modalEvent$.next(confirmed);
          this.modalEvent$.complete();

          this.closeModal$?.unsubscribe();
        },
        error: () => {
          // Alert
          this.alertService.showAlert(
            'Error occured for the modal close event',
            AlertTypes.Danger,
          );

          this.modalEvent$.next(false);
          this.modalEvent$.complete();

          this.closeModal$?.unsubscribe();
        },
      });

      // Insert the modal component into the root view container
      this.rootViewContainer.insert(component?.hostView);
    }

    return this.modalEvent$;
  }

  // Private Methods
  private closeModal(component: ComponentRef<ModalComponent>): void {
    component.destroy();
  }
}
