import { Component, OnInit, inject } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowUpShortWide,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { SelectComponent } from '../select/select.component';
import { SelectOption } from '../../../core/types/select-option';
import { SortService } from '../../services/sort.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [InputComponent, SelectComponent, FontAwesomeModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  // Constants
  public faSearch = faSearch;
  public faArrowUpShortWide = faArrowUpShortWide;

  // Injections
  public sortService = inject(SortService);
}
