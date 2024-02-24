import { Component, OnInit, ViewContainerRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { ModalService } from './shared/services/modal/modal.service';
import { AlertService } from './shared/services/alert/alert.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  // Injections
  private modalService = inject(ModalService);
  private alertService = inject(AlertService);
  private viewContainerRef = inject(ViewContainerRef);

  // Lifecycle
  public ngOnInit(): void {
    this.modalService.setRootViewContainerRef(this.viewContainerRef);
    this.alertService.setRootViewContainerRef(this.viewContainerRef);
  }
}
