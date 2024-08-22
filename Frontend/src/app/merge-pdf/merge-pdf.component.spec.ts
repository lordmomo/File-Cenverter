import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergePdfComponent } from './merge-pdf.component';

describe('MergePdfComponent', () => {
  let component: MergePdfComponent;
  let fixture: ComponentFixture<MergePdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MergePdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MergePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
