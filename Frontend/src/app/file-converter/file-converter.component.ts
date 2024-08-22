import { Component, OnInit } from '@angular/core';
import { FileConverterService } from 'src/services/fileConverter.services';
import { SnackBarFileOperationComponent } from '../snack-bar-file-operation/snack-bar-file-operation.component';
import { MatSnackBar } from '@angular/material/snack-bar';

enum FileConversionAction {
  Marksheet = 0,
  Invoice = 1,
  WordToPdf = 2,
  PdfToWord = 3,
  ExcelToWordAndPdf = 4
}
@Component({
  selector: 'app-file-converter',
  templateUrl: './file-converter.component.html',
  styleUrls: ['./file-converter.component.scss']
})
export class FileConverterComponent implements OnInit {



  fileInputVisible = false;
  responseMessage: string | undefined;

  responseCaught: boolean = false;
  selectedFile: File[] =[];
  generatedPdfPaths: string[] = [];
  progressVisible: boolean = false;
  selectedAction !: string;

  fileInputs : any[] = [{}];


  fileType: string = '/*'; 

  constructor(private fileConverterService: FileConverterService, private snackBar :MatSnackBar) { }

  ngOnInit(): void {
  }

  onButtonClick(action: number) {
    this.selectedAction = FileConversionAction[action];
    this.showFileInput();

    if(this.selectedAction === 'WordToPdf'){
      this.fileType = ".docx"
    }
    else if(this.selectedAction === 'PdfToWord'){
      this.fileType = '.pdf'
    }
    else if(this.selectedAction === 'ExcelToWordAndPdf'){
      this.fileType = '.xlsx'
    }
    this.setDeafultPageValues();

    console.log(action)
  }

  showFileInput() {
    this.fileInputVisible = true;
  }

  onFileSelected(file: File) {
    this.selectedFile.push(file);
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.openFromComponent(SnackBarFileOperationComponent, {
      data: { message: message, action: action },
      duration: 3000, 
    });
  }
 
  onAddFileInput(){
    this.fileInputs.push({});

  }
  setDeafultPageValues(){
    this.selectedFile= [];
    this.fileInputs = [{}]
    this.generatedPdfPaths = []
    this.responseCaught = false;
  }
  onSubmitConvert() {
    if (this.selectedFile) {
      this.progressVisible = true;
      // console.log(this.selectedFile.name);
      switch (this.selectedAction) {
        case 'WordToPdf':
          this.fileConverterService.convertWordToPdf(this.selectedFile).subscribe({

            next: (response) => {
              if (response.success) {
                // console.log(response.message)
                this.generatedPdfPaths = response.data;
                this.responseCaught = true;
                // this.openSnackBar();
                // this.selectedFile = null;
                // this.fileInputVisible = false;
                // this.router.navigateByUrl("home")
              }
              else {
                
                this.openSnackBar(response.message, 'Close');

                this.setDeafultPageValues();

              }
              this.progressVisible = false;
            },
            error: (error) => {
              console.error('Error:', error);
              this.openSnackBar("An error occurred while processing your request", 'Close');

              this.progressVisible = false;
            }
          });
          break;
        case 'PdfToWord':
          this.fileConverterService.convertPdfToWord(this.selectedFile).subscribe({

            next: (response) => {
              if (response.success) {
                // console.log(response.message)
                this.generatedPdfPaths = response.data;
                this.responseCaught = true;
                // this.openSnackBar();

                // this.selectedFile = null;
                // this.fileInputVisible = false;
                // this.router.navigateByUrl("home")
              }
              else {
                
                this.openSnackBar(response.message, 'Close');

                this.setDeafultPageValues();
              }
              this.progressVisible = false;
            },
            error: (error) => {
              console.error('Error:', error);
              this.openSnackBar("An error occurred while processing your request", 'Close');

              this.progressVisible = false;
            }
          });          break;
        case 'ExcelToWordAndPdf':
          this.fileConverterService.convertExcelToWordAndPdf(this.selectedFile).subscribe({

            next: (response) => {
              if (response.success) {
                // console.log(response.message)
                this.generatedPdfPaths = response.data;
                this.responseCaught = true;
                // this.openSnackBar();

                // this.selectedFile = null;
                // this.fileInputVisible = false;
                // this.router.navigateByUrl("home")
              }
              else {
                this.openSnackBar(response.message, 'Close');

                this.setDeafultPageValues();

              }
              this.progressVisible = false;
            },
            error: (error) => {
              console.error('Error:', error);
              this.openSnackBar("An error occurred while processing your request", 'Close');

              this.progressVisible = false;
            }
          });          
        break;
        default:
          break;
      }

    }
    else {
      
      this.openSnackBar("Files are not provided", 'Close');

    }
  }


  

  downloadGeneratedFiles() {
    if(this.generatedPdfPaths.length === 1){
      if (this.selectedAction === "WordToPdf") {

          this.fileConverterService.downloadSingleFile(this.generatedPdfPaths[0]).subscribe(blob => {
            this.downloadFile(blob, 'GeneratedFile.pdf');
          }, error => {
            console.error('Error downloading PDF:', error);
            this.openSnackBar("An error occurred while downloading PDF.", 'Close');

          });
        
      }else if ( this.selectedAction === "PdfToWord"    ) {

          this.fileConverterService.downloadSingleFile(this.generatedPdfPaths[0]).subscribe(blob => {
            this.downloadFile(blob, 'GeneratedFile.docx');
          }, error => {
            console.error('Error downloading PDF:', error);
            this.openSnackBar("An error occurred while downloading PDF.", 'Close');
          });
        
      }
    }
    else if (this.generatedPdfPaths.length > 0) {
      if (
        this.selectedAction === "ExcelToWordAndPdf") {

          this.fileConverterService.downloadGeneratedPdfs(this.generatedPdfPaths).subscribe(blob => {
          this.downloadFile(blob, 'GeneratedFiles.zip');
        }, error => {
          console.error('Error downloading ZIP:', error);
          this.openSnackBar("An error occurred while downloading ZIP.", 'Close');
        });
      } else if (this.selectedAction === "WordToPdf") {

        if (this.generatedPdfPaths.length > 0) {
          this.fileConverterService.downloadGeneratedPdfs(this.generatedPdfPaths).subscribe(blob => {
            this.downloadFile(blob, 'GeneratedFiles.zip');
          }, error => {
            console.error('Error downloading ZIP:', error);
            this.openSnackBar("An error occurred while downloading ZIP.", 'Close');
          });
        }
      }else if ( this.selectedAction === "PdfToWord"    ) {

        if (this.generatedPdfPaths.length > 0) {
          this.fileConverterService.downloadGeneratedPdfs(this.generatedPdfPaths).subscribe(blob => {
            this.downloadFile(blob, 'GeneratedFiles.zip');
          }, error => {
            console.error('Error downloading ZIP:', error);
            this.openSnackBar("An error occurred while downloading ZIP.", 'Close');
          });
        }
      }
    }
    
    else {
      this.openSnackBar("No file to download. Generate files first", 'Close');

    }
  }

  downloadFile(blob: Blob, fileName: string) {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  }

  // previewSinglePDF() {

  //   const pdfPath = this.generatedPdfPaths[0];
  //   this.fileConverterService.downloadSinglePDF(pdfPath).subscribe(
  //     (data: Blob) => {
  //       this.fileConverterService.previewPDF(data);
  //     },
  //     error => {
  //       console.error('Error downloading single PDF:', error);
  //     }
  //   );
  // }

  previewSingleFile() {
    const filePath = this.generatedPdfPaths[0]; 
    this.fileConverterService.downloadSingleFile(filePath).subscribe(
      (data: Blob) => {
        if (filePath.endsWith('.pdf')) {
          this.fileConverterService.previewPDF(data);
        } else if (filePath.endsWith('.docx')) {
          this.fileConverterService.previewDOCX(data);
        } else {
          console.error('Unsupported file type for preview.');
        }
      },
      error => {
        console.error('Error downloading file:', error);
      }
    );
  }

  shouldShowPreviewButton(): boolean {
    return this.selectedAction === 'WordToPdf' ;
  }
  generateNewReport(){
    this.setDeafultPageValues();
  }

}
