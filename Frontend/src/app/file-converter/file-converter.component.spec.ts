import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileConverterComponent } from './file-converter.component';

describe('FileConverterComponent', () => {
  let component: FileConverterComponent;
  let fixture: ComponentFixture<FileConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileConverterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
