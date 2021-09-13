import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeamWizardComponent } from './beam-wizard.component';

describe('BeamWizardComponent', () => {
  let component: BeamWizardComponent;
  let fixture: ComponentFixture<BeamWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeamWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeamWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
