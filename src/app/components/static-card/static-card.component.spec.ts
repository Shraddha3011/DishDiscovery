import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticCardComponent } from './static-card.component';

describe('StaticCardComponent', () => {
  let component: StaticCardComponent;
  let fixture: ComponentFixture<StaticCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaticCardComponent]
    });
    fixture = TestBed.createComponent(StaticCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
