import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ReportGenerationResponseMessage } from "src/app/entity/reportGenerationResposneMessage";
import { ResponseMessage } from "src/app/entity/responseMessage";

@Injectable({
    providedIn: "root"
})
export class FileConverterService {
  


    private baseUrl: string = "http://localhost:5112/";
    constructor(private httpClient: HttpClient) {

    }

    mergePdf(selectedFiles: File[]): Observable<ResponseMessage> {

        const formData: FormData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i], selectedFiles[i].name);
        }
        return this.httpClient.post<ResponseMessage>(`${this.baseUrl}generate/merge-pdfs`, formData);
    }


    replaceTextInFiles(selectedFiles: File[],oldText : string, newText : string) : Observable<ResponseMessage>{
        const formData = new FormData();
        selectedFiles.forEach(file => {
          if (file) {
            formData.append('files', file, file.name);
          }
        });
        formData.append('oldText', oldText);
        formData.append('newText', newText);    
        return this.httpClient.post<ResponseMessage>(`${this.baseUrl}replaceText`, formData);
  
    }


    generateInvoiceReport(selectedFiles: File[]): Observable<ReportGenerationResponseMessage> {
        const formData: FormData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i], selectedFiles[i].name);
        } return this.httpClient.post<ReportGenerationResponseMessage>(`${this.baseUrl}invoices/generate-invoice`, formData);
    }


    generateStudentMarksheet(selectedFiles: File[]): Observable<ReportGenerationResponseMessage> {
        const formData: FormData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i], selectedFiles[i].name);
        }
        return this.httpClient.post<ReportGenerationResponseMessage>(`${this.baseUrl}students/generate-marksheet`, formData);
    }

    downloadGeneratedPdfs(pdfPaths: string[]): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.httpClient.get(`${this.baseUrl}download-pdf-zip`, {
            headers: headers,
            responseType: 'blob' as 'json',
            params: { pdfPaths: pdfPaths }
        });
    }

    previewPDF(blob: Blob) {
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, '_blank');
    }
    previewDOCX(blob: Blob) {
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, '_blank');
    }


    convertWordToPdf(selectedFiles: File[]): Observable<ResponseMessage> {
        const formData: FormData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i], selectedFiles[i].name);
        }
        return this.httpClient.post<ResponseMessage>(`${this.baseUrl}convert/word-pdf/document/upload`, formData);
    }

    convertPdfToWord(selectedFiles: File[]): Observable<ResponseMessage> {
        const formData: FormData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i], selectedFiles[i].name);
        }
        return this.httpClient.post<ResponseMessage>(`${this.baseUrl}convert/pdf-word/document/upload`, formData);
    }

    convertExcelToWordAndPdf(selectedFiles: File[]): Observable<ResponseMessage> {
        const formData: FormData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i], selectedFiles[i].name);
        }
        return this.httpClient.post<ResponseMessage>(`${this.baseUrl}convert/excel-word-pdf/document/upload`, formData);
    }


    downloadSingleFile(pdfPath: string): Observable<Blob> {

        const params = new HttpParams().set('filePath', pdfPath);

        return this.httpClient.get(`${this.baseUrl}download/file`, {
            params: params,
            responseType: 'blob'
        });
    }

  
}