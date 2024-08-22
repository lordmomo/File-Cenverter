import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA,MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-file-operation',
  templateUrl: './snack-bar-file-operation.component.html',
  styleUrls: ['./snack-bar-file-operation.component.scss']
})
export class SnackBarFileOperationComponent implements OnInit {

  // constructor(@Inject(MatSnackBarRef) public snackBarRef: MatSnackBarRef<SnackBarFileOperationComponent>) { }

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { message: string, action: string },
    @Inject(MatSnackBarRef) public snackBarRef: MatSnackBarRef<SnackBarFileOperationComponent>
  ) { }

  ngOnInit(): void {
  }

  dismissSnackBar() {
    this.snackBarRef.dismiss();
  }

}
