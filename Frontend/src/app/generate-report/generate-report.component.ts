import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FileConverterService } from 'src/services/fileConverter.services';
import { SnackBarFileOperationComponent } from '../snack-bar-file-operation/snack-bar-file-operation.component';
// import { FileConversionAction } from '../home/home.component';

enum FileConversionAction {
  Marksheet = 0,
  Invoice = 1,
  WordToPdf = 2,
  PdfToWord = 3,
  ExcelToWordAndPdf = 4
}
@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.scss']
})
export class GenerateReportComponent implements OnInit {

  fileInputVisible = false;
  responseMessage: string | undefined;

  responseCaught: boolean = false;
  selectedFile: File[] = [];
  generatedPdfPaths: string[] = [];
  progressVisible: boolean = false;
  selectedAction !: string;
  fileInputs : any[] = [{}];

  previewFilePath : string[] =[];

  fileType: string = '.xlsx'; 

  constructor(private fileConverterService: FileConverterService, private router: Router, private snackBar :MatSnackBar) {

   }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.openFromComponent(SnackBarFileOperationComponent, {
      data: { message: message, action: action },
      duration: 3000, 
    });
  }

  showFileInput() {
    this.fileInputVisible = true;
  }

  onFileSelected(file: File) {
    // console.log(file.name)
    this.selectedFile.push(file)
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
        case 'Marksheet':

          // this.fileType = '.pdf';
          this.fileConverterService.generateStudentMarksheet(this.selectedFile).subscribe({

            next: (response) => {
              if (response.success) {
                console.log(response)
                this.generatedPdfPaths = response.data;
                this.responseCaught = true;
                this.previewFilePath = response.previewData;
                // this.selectedFile = null;
                // this.fileInputVisible = false;
                // this.router.navigateByUrl("home")
              }
              else {
                // alert(response.message);
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
        case 'Invoice':
          // this.fileType = '.pdf';

          this.fileConverterService.generateInvoiceReport(this.selectedFile).subscribe({

            next: (response) => {
              if (response.success) {
                console.log(response)
                this.generatedPdfPaths = response.data;
                this.responseCaught = true;
                this.previewFilePath = response.previewData

              }
              else {
                
                this.openSnackBar(response.message, 'Close');

                this.setDeafultPageValues();
              }
              this.progressVisible = false;
            },
            error: (error) => {
              console.error('Error:', error);
              this.openSnackBar("An error occurred while processing your request.", 'Close');

              this.progressVisible = false;
            }
          });

          break;

        default:
          break;
      }

    }
    else {
      // alert("Files are not provided");
      this.openSnackBar("Files are not provided", 'Close');

    }
  }


  onButtonClick(action: number) {
    this.showFileInput();
    this.setDeafultPageValues()

    this.selectedAction = FileConversionAction[action]
  }


  generateNewReport(){
    this.setDeafultPageValues();
  }

  downloadGeneratedFiles() {
    if (this.generatedPdfPaths.length > 0) {
      if (this.selectedAction == "Invoice" ||
        this.selectedAction == "Marksheet") {
        this.fileConverterService.downloadGeneratedPdfs(this.generatedPdfPaths).subscribe(blob => {
          this.downloadFile(blob, 'GeneratedFiles.zip');
        }, error => {
          console.error('Error downloading ZIP:', error);
          this.openSnackBar("An error occurred while downloading ZIP.", 'Close');

        });
      }
    } else {
      this.openSnackBar("No files to download. Generate files first.", 'Close');

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
  //   this.fileConverterService.downloadSingleFile(pdfPath).subscribe(
  //     (data: Blob) => {
  //       this.fileConverterService.previewPDF(data);
  //     },
  //     error => {
  //       console.error('Error downloading single PDF:', error);
  //     }
  //   );
  // }


  previewSinglePDF() {
   
          this.previewFilePath.forEach(pdfPath => {
            this.fileConverterService.downloadSingleFile(pdfPath).subscribe(
              (data: Blob) => {
                this.fileConverterService.previewPDF(data);
              },
              error => {
                console.error(`Error downloading single PDF (${pdfPath}):`, error);
              }
            );
          });
        }

}
