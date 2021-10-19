import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FilterService, FreezeService, ReorderService, RowDDService, SelectionService, TreeGridModule, } from '@syncfusion/ej2-angular-treegrid';
import { SortService, ResizeService, PageService, EditService, ExcelExportService, PdfExportService, ContextMenuService } from '@syncfusion/ej2-angular-treegrid';
import { ColumnChooserService, ToolbarService } from '@syncfusion/ej2-angular-treegrid';
import { DropDownTreeModule } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons'
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { CheckBoxAllModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TreeGridModule,
    AppRoutingModule,
    DropDownButtonModule,
    DropDownListModule,
    DropDownTreeModule,
    GridModule,
    CheckBoxModule,
    ButtonModule,
  ],
  providers: [SortService, ResizeService, PageService, EditService, ExcelExportService, PdfExportService, ContextMenuService
    , ColumnChooserService, ToolbarService, FreezeService, SelectionService, FilterService, ResizeService, ReorderService,
    RowDDService],
  bootstrap: [AppComponent]
})
export class AppModule { }
