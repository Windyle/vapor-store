import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  computed,
  input,
} from '@angular/core';
import { DefaultImageUrl } from '../../../core/constants/default-image-url';

@Component({
  selector: 'app-image-preview',
  standalone: true,
  imports: [],
  templateUrl: './image-preview.component.html',
  styleUrl: './image-preview.component.scss',
})
export class ImagePreviewComponent implements AfterViewInit {
  @ViewChild('image', { static: true }) image?: ElementRef<HTMLImageElement>;

  // Public Properties
  public src = input<string>();

  // Computed Properties
  public calculatedSrc = computed(() => {
    return this.src() || DefaultImageUrl;
  });

  // Lifecycle
  public ngAfterViewInit() {
    this.image!.nativeElement.onerror = () => {
      this.image!.nativeElement.src = DefaultImageUrl;
    };
  }
}
