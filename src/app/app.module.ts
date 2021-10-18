import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { SortService, ResizeService, PageService, EditService, ExcelExportService, PdfExportService, ContextMenuService } from '@syncfusion/ej2-angular-treegrid';
import { ColumnChooserService, ToolbarService } from '@syncfusion/ej2-angular-treegrid';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TreeGridModule,
    AppRoutingModule
  ],
  providers: [SortService, ResizeService, PageService, EditService, ExcelExportService, PdfExportService, ContextMenuService
    , ColumnChooserService, ToolbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
