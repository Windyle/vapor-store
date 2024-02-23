import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { ModalComponent } from './modal.component';
import { ModalButton } from '../../../core/types/modal-button';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  // Properties
  private rootViewContainer?: ViewContainerRef;

  modalEvent$ = new BehaviorSubject<boolean>(false);

  // Subscriptions
  private closeModal$?: Subscription;

  setRootViewContainerRef(viewContainerRef: ViewContainerRef): void {
    this.rootViewContainer = viewContainerRef;
  }

  showModal(
    title: string,
    message: string,
    confirmButton?: ModalButton,
    cancelButton?: ModalButton
  ): void {
    if (this.rootViewContainer) {
      const component = this.rootViewContainer.createComponent(ModalComponent);
      component.instance.title = title;
      component.instance.message = message;

      if (confirmButton) {
        component.instance.confirmButton = confirmButton;
      }

      if (cancelButton) {
        component.instance.cancelButton = cancelButton;
      }

      this.closeModal$ = component.instance.closeModal.subscribe(
        (confirmed) => {
          this.closeModal(component);

          this.modalEvent$.next(confirmed);

          if (this.closeModal$) {
            this.closeModal$.unsubscribe();
          }
        }
      );

      this.rootViewContainer.insert(component?.hostView);
    }
  }

  closeModal(component: ComponentRef<ModalComponent>): void {
    component.destroy();
  }
}
