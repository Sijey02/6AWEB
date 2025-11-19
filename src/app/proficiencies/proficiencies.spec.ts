import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Proficiencies } from './proficiencies';

describe('Proficiencies', () => {
  let component: Proficiencies;
  let fixture: ComponentFixture<Proficiencies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Proficiencies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Proficiencies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
