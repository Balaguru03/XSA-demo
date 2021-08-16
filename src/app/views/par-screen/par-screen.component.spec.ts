import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParScreenComponent } from './par-screen.component';

describe('ParScreenComponent', () => {
  let component: ParScreenComponent;
  let fixture: ComponentFixture<ParScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
