
import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { EditSettingsModel } from '@syncfusion/ej2-treegrid';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { sampleData } from '../assets/datasource';
// import { GridComponent, IFilterUI, Column } from '@syncfusion/ej2-angular-grids';
import { removeClass, addClass } from '@syncfusion/ej2-base';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { GridComponent, IFilterUI, Column } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class AppComponent implements OnInit {
  // public data: DataManager;
  public data: Object[];

  public pageSetting: Object;

  @ViewChild('treegrid')
  public treegrid: TreeGridComponent;
  @ViewChild('dropdown1')
  public dropdown1: DropDownListComponent;

  // public data: Object[] = [];
  public pageSettings: Object;
  public contextMenuItems: string[] = [];
  public editing: EditSettingsModel;
  public toolbar: string[];
  public editparams: Object;

  public filterSettings: Object;
  public immediateModeDelay: Object;
  public templateOptions: object;
  public dropDownFilter: DropDownList;
  public d1data: Object;
  public fields1: Object;

  //   constructor(@Inject('sourceFiles') private sourceFiles: any) {
  //     sourceFiles.files = ['./app.component.css'];
  // }

  ngOnInit(): void {
    // this.data = new DataManager({ url: 'https://ej2services.syncfusion.com/production/web-services/api/SelfReferenceData', adaptor: new WebApiAdaptor });
    this.data = sampleData;
    this.pageSetting = { pageCount: 3 };
    this.contextMenuItems = ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending',
      'Edit', 'Delete', 'Save', 'Cancel',
      'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage',
      'LastPage', 'NextPage'];
    this.editing = { allowDeleting: true, allowEditing: true, mode: 'Row' };
    // this.pageSettings= { pageSize: 10 };
    this.editparams = { params: { format: 'n' } };

    // For ColumnChooser
    this.toolbar = ['ColumnChooser'];

    // For Filtering the treeGrid
    this.filterSettings = { type: 'FilterBar', hierarchyMode: 'Parent', mode: 'Immediate' };
    this.templateOptions = {
      create: (args: { element: Element }) => {
        let dd: HTMLInputElement = document.createElement('input');
        dd.id = 'duration';
        return dd;
      },
      write: (args: { element: Element }) => {
        let dataSource: string[] = ['All', '1', '3', '4', '5', '6', '8', '9'];
        this.dropDownFilter = new DropDownList({
          dataSource: dataSource,
          value: 'All',
          change: (e: ChangeEventArgs) => {
            let valuenum: any = +e.value;
            let id: any = <string>this.dropDownFilter.element.id;
            let value: any = <string>e.value;
            if (value !== 'All') {
              this.treegrid.filterByColumn(id, 'equal', valuenum);
            } else {
              this.treegrid.removeFilteredColsByField(id);
            }
          }
        });
        this.dropDownFilter.appendTo('#duration');
      }
    };
    this.fields1 = { text: 'mode', value: 'id' };
    this.d1data = [{ id: 'Parent', mode: 'Parent' },
    { id: 'Child', mode: 'Child' },
    { id: 'Both', mode: 'Both' },
    { id: 'None', mode: 'None' },]
  }
  change(e: ChangeEventArgs): void {
    let mode: any = <string>e.value;
    this.treegrid.filterSettings.hierarchyMode = mode;
    this.treegrid.clearFiltering();
    this.dropDownFilter.value = 'All';
  }
}

