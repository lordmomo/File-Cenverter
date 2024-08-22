import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {

  constructor() { }
  

  @Input() fileTypes: string = '*/*';
  @Output() fileSelected = new EventEmitter<File>();

  ngOnInit(): void {
  }


  onFileSelected(event: any) {
    const files: File = event.target.files[0];
    if (files ) {
      this.fileSelected.emit(files);
    }
  }
}
