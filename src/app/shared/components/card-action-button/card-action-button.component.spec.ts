import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardActionButtonComponent } from './card-action-button.component';

describe('CardActionButtonComponent', () => {
  let component: CardActionButtonComponent;
  let fixture: ComponentFixture<CardActionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardActionButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
