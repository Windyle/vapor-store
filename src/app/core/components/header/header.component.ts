import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  UrlSegment,
} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Consts
  faArrowLeft = faArrowLeft;

  // Properties
  showBackButton = signal<boolean>(false);

  // Services
  private router = inject(Router);

  // Subscriptions
  private router$?: Subscription;

  // Lifecycle
  ngOnInit(): void {
    this.router$ = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        event = event as NavigationEnd;

        if (this.isProductDetailRoute(event.urlAfterRedirects)) {
          this.showBackButton.set(true);
        } else {
          this.showBackButton.set(false);
        }
      });
  }

  ngOnDestroy(): void {
    this.router$?.unsubscribe();
  }

  // Methods
  private isProductDetailRoute(url: string): boolean {
    const urlSegments = url.split('/');
    return urlSegments[1] === 'product';
  }
}
