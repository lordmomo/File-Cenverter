import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarFileOperationComponent } from './snack-bar-file-operation.component';

describe('SnackBarFileOperationComponent', () => {
  let component: SnackBarFileOperationComponent;
  let fixture: ComponentFixture<SnackBarFileOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackBarFileOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarFileOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
