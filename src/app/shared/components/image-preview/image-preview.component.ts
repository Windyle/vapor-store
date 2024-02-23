import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  computed,
  input,
} from '@angular/core';
import { DefaultImageUrl } from '../../../core/constants/DefaultImageUrl';

@Component({
  selector: 'app-image-preview',
  standalone: true,
  imports: [],
  templateUrl: './image-preview.component.html',
  styleUrl: './image-preview.component.scss',
})
export class ImagePreviewComponent implements AfterViewInit {
  @ViewChild('image', { static: true }) image?: ElementRef<HTMLImageElement>;

  // Properties
  src = input<string>();
  calculatedSrc = computed(() => {
    return this.src() || DefaultImageUrl;
  });

  ngAfterViewInit() {
    this.image!.nativeElement.onerror = () => {
      this.image!.nativeElement.src = DefaultImageUrl;
    };
  }
}
