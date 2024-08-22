import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplaceWordInFileComponent } from './replace-word-in-file.component';

describe('ReplaceWordInFileComponent', () => {
  let component: ReplaceWordInFileComponent;
  let fixture: ComponentFixture<ReplaceWordInFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplaceWordInFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplaceWordInFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
