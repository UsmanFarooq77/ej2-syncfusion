
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
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { CheckBoxAllModule } from '@syncfusion/ej2-angular-buttons';
import { SortEventArgs } from '@syncfusion/ej2-grids';

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

  @ViewChild('taskName')
  public taskName: CheckBoxComponent;
  @ViewChild('taskID')
  public taskID: CheckBoxComponent;
  // @ViewChild('orderDate')
  // public orderDate: CheckBoxComponent;
  // @ViewChild('units')
  // public units: CheckBoxComponent;
  // @ViewChild('price')
  // public price: CheckBoxComponent;

  @ViewChild('dropdown2')
  public dropdown0: DropDownListComponent;

  @ViewChild('dropdown2')
  public dropdown2: DropDownListComponent;

  @ViewChild('dropdown3')
  public dropdown3: DropDownListComponent;

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
  public sortSettings: Object;
  
 // For Selection
  public selectionSettings: Object;
  // public d0data: Object;
  // public fields0: Object;
  public d2data: Object;
  public fields2: Object;
  public d3data: Object;
  public fields3: Object;

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
    { id: 'None', mode: 'None' },];

    this.sortSettings = {
      columns: [{ field: 'taskID', direction: 'Ascending' },
      { field: 'taskName', direction: 'Ascending' }]
    }

    // For selection

    this.selectionSettings = { type: 'Multiple' };
    this.fields1 = { text: 'type', value: 'id' };
    this.d1data = [{ id: 'Single', type: 'Single' },
    { id: 'Multiple', type: 'Multiple' }],
      this.fields2 = { text: 'mode', value: 'id' };
    this.d2data = [{ id: 'Row', mode: 'Row' },
    { id: 'Cell', mode: 'Cell' },],
      this.fields3 = { text: 'mode', value: 'id' };
    this.d3data = [{ id: 'Flow', mode: 'Flow' },
    { id: 'Box', mode: 'Box' }]
  }

  change(e: ChangeEventArgs): void {
    let mode: any = <string>e.value;
    this.treegrid.filterSettings.hierarchyMode = mode;
    this.treegrid.clearFiltering();
    this.dropDownFilter.value = 'All';
  }

  // For Multi-Sorting
  public onClick1(e: MouseEvent): void {
    if (this.taskName.checked) {
      this.treegrid.sortByColumn('taskName', 'Ascending', true);
    } else {
      this.treegrid.grid.removeSortColumn('taskName');
    }

  }
  public onClick2(e: MouseEvent): void {
    if (this.taskID.checked) {
      this.treegrid.sortByColumn('taskID', 'Ascending', true);
    } else {
      this.treegrid.grid.removeSortColumn('taskID');
    }

  }
  // public onClick3(e: MouseEvent): void {
  //   if (this.orderDate.checked) {
  //     this.treegrid.sortByColumn('orderDate', 'Ascending', true);
  //   } else {
  //     this.treegrid.grid.removeSortColumn('orderDate');
  //   }

  // }
  // public onClick4(e: MouseEvent): void {
  //   if (this.units.checked) {
  //     this.treegrid.sortByColumn('units', 'Ascending', true);
  //   } else {
  //     this.treegrid.grid.removeSortColumn('units');
  //   }

  // }

  public sort(args: SortEventArgs): void {
    if (args.requestType === 'sorting') {
      for (let columns of this.treegrid.getColumns()) {
        for (let sortcolumns of this.treegrid.sortSettings.columns) {
          if (sortcolumns.field === columns.field) {
            this.check(sortcolumns.field, true); break;
          } else {
            this.check(columns.field, false);
          }
        }
      }
    }

  }
  public check(field: string, state: boolean): void {
    switch (field) {
      case 'taskName':
        this.taskName.checked = state; break;
      case 'taskID':
        this.taskID.checked = state; break;
      // case 'orderDate':
      //   this.orderDate.checked = state; break;
      // case 'units':
      //   this.units.checked = state; break;
      // case 'price':
      //   this.price.checked = state; break;
    }
  }
  // For Selection
  change1(e: ChangeEventArgs): void {
    let type: any = <string>e.value;
    let mode: any = <string>this.dropdown2.value;
    this.treegrid.selectionSettings.type = type;
    if (type === 'Multiple' && mode === 'Cell') {
      document.getElementById('cellselection').style.display = 'table-row';
    } else {
      document.getElementById('cellselection').style.display = 'none';
    }
  }
  // For selection
  change2(e: ChangeEventArgs): void {
    let mode: any = e.value;
    let type: any = <string>this.dropdown0.value;
    this.treegrid.selectionSettings.mode = mode;
    if (type === 'Multiple' && mode === 'Cell') {
      document.getElementById('cellselection').style.display = 'table-row';
    } else {
      document.getElementById('cellselection').style.display = 'none';
    }
  }
  change3(e: ChangeEventArgs): void {
    let cellmode: any = <string>e.value;
    this.treegrid.selectionSettings.cellSelectionMode = cellmode;
  }
}

