import { Component, OnInit, ViewContainerRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { ModalService } from './shared/services/modal/modal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  // Injections
  modalService = inject(ModalService);
  viewContainerRef = inject(ViewContainerRef);

  // Lifecycle
  ngOnInit(): void {
    this.modalService.setRootViewContainerRef(this.viewContainerRef);
  }
}
