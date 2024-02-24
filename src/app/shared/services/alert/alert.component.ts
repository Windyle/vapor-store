import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { AlertType } from '../../../core/types/alert-type';
import { AlertTypes } from '../../../core/enums/alert-types';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgClass],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent implements OnInit, OnDestroy {
  // Public Properties
  public message = '';
  public type: AlertType = AlertTypes.Info;
  public fadingOut = signal(false);
  public closeAlert = new EventEmitter<void>();

  // Private Properties
  private fadeOutTimeout?: ReturnType<typeof setTimeout>;
  private timeout?: ReturnType<typeof setTimeout>;

  // Lifecycle
  public ngOnInit(): void {
    // Set timeout to close the alert with a fade out animation
    this.timeout = setTimeout(() => {
      this.fadingOut.set(true);
      this.fadeOutTimeout = setTimeout(() => {
        this.close();
      }, 450);
    }, 3000);
  }

  public ngOnDestroy(): void {
    clearTimeout(this.timeout);
    clearTimeout(this.fadeOutTimeout);
  }

  // Public Methods
  public messageSpan(): string {
    return `<span>${this.message}</span>`;
  }

  // Private Methods
  private close(): void {
    this.closeAlert.emit();
  }
}
