import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateSpaceComponent } from './candidate-space.component';

describe('CandidateSpaceComponent', () => {
  let component: CandidateSpaceComponent;
  let fixture: ComponentFixture<CandidateSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateSpaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
