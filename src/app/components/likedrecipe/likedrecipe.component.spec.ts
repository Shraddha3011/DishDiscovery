import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedrecipeComponent } from './likedrecipe.component';

describe('LikedrecipeComponent', () => {
  let component: LikedrecipeComponent;
  let fixture: ComponentFixture<LikedrecipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LikedrecipeComponent]
    });
    fixture = TestBed.createComponent(LikedrecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
