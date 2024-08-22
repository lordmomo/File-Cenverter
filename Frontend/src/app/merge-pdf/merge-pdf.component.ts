import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileConverterService } from 'src/services/fileConverter.services';
import { SnackBarFileOperationComponent } from '../snack-bar-file-operation/snack-bar-file-operation.component';

@Component({
  selector: 'app-merge-pdf',
  templateUrl: './merge-pdf.component.html',
  styleUrls: ['./merge-pdf.component.scss']
})
export class MergePdfComponent implements OnInit {

  responseCaught : boolean = false;
  progressVisible :boolean = false;
  fileInputs : any[] = [{},{}];
  selectedFiles : File[] =[];
  generatedPdfPaths: string[] = [];

  fileType: string = '.pdf'; 

  constructor(private fileConverterService : FileConverterService,private snackBar : MatSnackBar) { }

  ngOnInit(): void {
  }

  onFileSelected(file : File){
    this.selectedFiles.push(file);
  }

  onAddFileInput() {
    if(this.fileInputs.length === 4){
      alert("Can only upload 4 Pdfs files on free version")
    }
    else{
      this.addFileInput();

    }
  }

  addFileInput() {
    this.fileInputs.push({});
  }
  
 openSnackBar(message: string, action: string) {
  this.snackBar.openFromComponent(SnackBarFileOperationComponent, {
    data: { message: message, action: action },
    duration: 3000, 
  });
}

  onSubmit() {
    this.progressVisible = true;
    console.log('Selected files:', this.selectedFiles);
    this.fileConverterService.mergePdf(this.selectedFiles).subscribe({
      next : (response) =>{
        if(response.success){ 
            this.responseCaught = true;
            this.generatedPdfPaths =response.data
            // this.openSnackBar()
            console.log(response.data)
        }
        else{
          
          this.openSnackBar(response.message, 'Close');

          this.mergeNewFiles();

        }
        this.progressVisible = false
      },
      error: (error) => {
        console.error('Error:', error);
        this.openSnackBar("An error occurred while processing your request.", 'Close');
        this.progressVisible = false;
      }
    })
  }

  downloadMergedPdf(){
    console.log(this.generatedPdfPaths)
    const filePath = this.generatedPdfPaths[0]; 

    this.fileConverterService.downloadSingleFile(filePath).subscribe(
      (data: Blob) => {
        if (filePath.endsWith('.pdf')) {
          this.fileConverterService.previewPDF(data);
        }
        else {
          // console.error('Unsupported file type for preview.');
          this.openSnackBar("Unsupported file type for preview.", 'Close');

        }
      },
      error => {
        console.error('Error downloading file:', error);
        this.openSnackBar("Error downloading file.", 'Close');

      }
    )
  }

  downloadGeneratedFiles(){
    if (this.generatedPdfPaths.length > 0) {
      this.fileConverterService.downloadSingleFile(this.generatedPdfPaths[0]).subscribe(blob => {
        this.downloadFile(blob, 'MergedFile.pdf');
      }, error => {
        console.error('Error downloading PDF:', error);
        this.openSnackBar("An error occured while downloading PDF.", 'Close');
      });
    }
  }
  downloadFile(blob: Blob, fileName: string) {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  }

  mergeNewFiles(){
    this.selectedFiles= [];
    this.fileInputs = [{},{}]
    this.generatedPdfPaths = []
    this.responseCaught = false;
  }

}
