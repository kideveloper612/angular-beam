import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { marcoSidebarComponent } from './marco-sidebar.component';

describe('marcoSidebarComponent', () => {
  let component: marcoSidebarComponent;
  let fixture: ComponentFixture<marcoSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ marcoSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(marcoSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
