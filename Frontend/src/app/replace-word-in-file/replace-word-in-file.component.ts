import { Component, OnInit } from '@angular/core';
import { FileConverterService } from 'src/services/fileConverter.services';
import { SnackBarFileOperationComponent } from '../snack-bar-file-operation/snack-bar-file-operation.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-replace-word-in-file',
  templateUrl: './replace-word-in-file.component.html',
  styleUrls: ['./replace-word-in-file.component.scss']
})
export class ReplaceWordInFileComponent implements OnInit {

  responseCaught : boolean = false;
  progressVisible :boolean = false;
  fileInputs : any[] = [{}];
  selectedFiles : File[] =[];
  generatedPdfPaths: string[] = [];


  oldText: string = '';
  newText: string = '';


  
  constructor(    
    private fileConverterService : FileConverterService, private snackBar : MatSnackBar) { 


  }

  ngOnInit(): void {
  }

 openSnackBar(message: string, action: string) {
    this.snackBar.openFromComponent(SnackBarFileOperationComponent, {
      data: { message: message, action: action },
      duration: 3000, 
      // horizontalPosition: 'center',
      // verticalPosition: 'top',
    });
  }

  onFileSelected(file : File){
    this.selectedFiles.push(file);
  }

  onAddFileInput() {
    if(this.fileInputs.length === 4){
      this.openSnackBar("Can only upload 4 PDF files in the free version", 'Close');

    }
    else{
      this.addFileInput();
    }
  }

  addFileInput() {
    this.fileInputs.push({});
  }
  
  onSubmit() {

    if(this.selectedFiles.length ===0){
      this.openSnackBar("Files not provided", 'Close');

      return;
    }

    if (!this.oldText || !this.newText) {
      this.openSnackBar('Please provide both old and new text.', 'Close');

      return;
    }


    this.progressVisible = true;
    console.log('Selected files:', this.selectedFiles);

    this.fileConverterService.replaceTextInFiles(this.selectedFiles,this.oldText,this.newText).subscribe({
      next : (response) =>{
        if(response.success){ 
          console.log(response)
            this.responseCaught = true;
            this.generatedPdfPaths =response.data
            console.log(response.data)
        }
        else{
          this.openSnackBar(response.message, 'Close');

          this.setDefaultPage();

        }
        this.progressVisible = false
      },
      error: (error) => {
        console.error('Error:', error);
        this.openSnackBar('An error occurred while processing your request.', 'Close');
        this.progressVisible = false;
      }
    })
    

  }


  

  downloadGeneratedFiles(){
    if (this.generatedPdfPaths.length > 0) {
      this.fileConverterService.downloadGeneratedPdfs(this.generatedPdfPaths).subscribe(blob => {
        this.downloadFile(blob, 'ReplacedFiles.zip');
      }, error => {
        console.error('Error downloading zip:', error);
        this.openSnackBar('An error occurred while downloading ZIP.', 'Close');

      });
    }
  }
  downloadFile(blob: Blob, fileName: string) {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  }

  setDefaultPage(){
    this.selectedFiles= [];
    this.fileInputs = [{}]
    this.generatedPdfPaths = []
    this.responseCaught = false;
    this.oldText=''
    this.newText=''
  }

}
