import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalBackground } from './educational-background';

describe('EducationalBackground', () => {
  let component: EducationalBackground;
  let fixture: ComponentFixture<EducationalBackground>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationalBackground]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationalBackground);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
