import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { FileConverterComponent } from "./file-converter/file-converter.component";
import { GenerateReportComponent } from "./generate-report/generate-report.component";
import { MergePdfComponent } from "./merge-pdf/merge-pdf.component";
import { ReplaceWordInFileComponent } from "./replace-word-in-file/replace-word-in-file.component";

export const routes : Routes = [
    {path:'',redirectTo:'/home',pathMatch:'full'},
    { path: 'home', component:HomeComponent } ,
    { path: 'fileConverter', component:FileConverterComponent } ,
    { path: 'generateReport', component:GenerateReportComponent } ,
    { path: 'merge-pdfs', component:MergePdfComponent } ,
    { path: 'replace-text', component:ReplaceWordInFileComponent } ,

    { path: '**', redirectTo: '/' } ,

]