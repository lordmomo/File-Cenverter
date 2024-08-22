import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileInputComponent } from './file-input/file-input.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FileConverterComponent } from './file-converter/file-converter.component';
import { FileConverterService } from 'src/services/fileConverter.services';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormsModule } from '@angular/forms'; 

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {MatButtonModule} from '@angular/material/button';
import { GenerateReportComponent } from './generate-report/generate-report.component';
import { MatSnackBarModule } from '@angular/material/snack-bar'; 

import { SnackBarFileOperationComponent } from './snack-bar-file-operation/snack-bar-file-operation.component';
import { MergePdfComponent } from './merge-pdf/merge-pdf.component';
import { ReplaceWordInFileComponent } from './replace-word-in-file/replace-word-in-file.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FileInputComponent,
    FileConverterComponent,
    GenerateReportComponent,
    SnackBarFileOperationComponent,
    MergePdfComponent,
    ReplaceWordInFileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [FileConverterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
