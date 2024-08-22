import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileConverterService } from 'src/services/fileConverter.services';
import { ResponseMessage } from '../entity/responseMessage';
import { Observable } from 'rxjs';
// import { FileConversionAction } from 'src/enums/fileConversionAction';

export enum FileConversionAction {
  Marksheet = 'marksheet',
  Invoice = 'invoice',
  WordToPdf = 'wordToPdf',
  PdfToWord = 'pdfToWord',
  ExcelToWordAndPdf = 'excelToWordAndPdf'
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  


}
