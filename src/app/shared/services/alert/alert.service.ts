import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertComponent } from './alert.component';
import { AlertType } from '../../../core/types/alert-type';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  // Private Properties
  private rootViewContainer?: ViewContainerRef;
  private isAlertOpen = false;

  // Subscriptions
  private closeAlert$?: Subscription;

  // Public Methods
  setRootViewContainerRef(viewContainerRef: ViewContainerRef): void {
    this.rootViewContainer = viewContainerRef;
  }

  showAlert(message: string, type: AlertType): void {
    if (this.rootViewContainer && !this.isAlertOpen) {
      const component = this.rootViewContainer.createComponent(AlertComponent);
      component.instance.message = message;
      component.instance.type = type;

      console.log('component', component);

      this.closeAlert$ = component.instance.closeAlert.subscribe({
        next: () => {
          this.closeAlert(component);

          if (this.closeAlert$) {
            this.closeAlert$.unsubscribe();
          }
        },
        error: (err: unknown) => {
          console.error(err);
        },
      });

      this.rootViewContainer.insert(component?.hostView);

      this.isAlertOpen = true;
    }
  }

  closeAlert(component: ComponentRef<AlertComponent>): void {
    component.destroy();
    this.isAlertOpen = false;
  }
}
