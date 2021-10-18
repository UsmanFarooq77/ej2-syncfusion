
import { Component, OnInit, ViewChild } from '@angular/core';
// import { sampleData } from './jsontreegriddata';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import {  EditSettingsModel } from '@syncfusion/ej2-treegrid';
import { TreeGridComponent,ColumnChooserService, ToolbarService } from '@syncfusion/ej2-angular-treegrid';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    
})
export class AppComponent implements OnInit {
  public data: DataManager;
  public pageSetting: Object;

  @ViewChild('treegrid')
  public treegrid: TreeGridComponent;

    // public data: Object[] = [];
    public pageSettings: Object;
    public contextMenuItems: string[] = [];
    public editing: EditSettingsModel;
    public toolbar: string[];
    public editparams: Object;

    ngOnInit(): void {
      this.data =  new DataManager({ url: 'https://ej2services.syncfusion.com/production/web-services/api/SelfReferenceData', adaptor: new WebApiAdaptor });
      this.pageSetting = { pageCount: 3 };
        // this.data = sampleData;
        this.contextMenuItems = ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending',
         'Edit', 'Delete', 'Save', 'Cancel',
        'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage',
        'LastPage', 'NextPage'];
    this.editing = { allowDeleting: true, allowEditing: true, mode: 'Row' };
    // this.pageSettings= { pageSize: 10 };
    this.editparams = {params: { format: 'n' }};
    this.toolbar = ['ColumnChooser'];

    }
}
