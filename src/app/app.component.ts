
import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { ContextMenu, ContextMenuItem, EditSettingsModel } from '@syncfusion/ej2-treegrid';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { sampleData } from '../assets/datasource';
// import { GridComponent, IFilterUI, Column } from '@syncfusion/ej2-angular-grids';
import { removeClass, addClass } from '@syncfusion/ej2-base';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { GridComponent, IFilterUI, Column, ContextMenuOpenEventArgs } from '@syncfusion/ej2-angular-grids';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { SortEventArgs } from '@syncfusion/ej2-grids';
import { BeforeOpenCloseMenuEventArgs, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';
import { ContextMenuComponent, MenuItem, MenuItemModel } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class AppComponent implements OnInit {
  public data: DataManager;
  // public data: Object[];

  public pageSetting: Object;

  @ViewChild('treegrid')
  public treegrid: TreeGridComponent;
  @ViewChild('dropdown1')
  public dropdown1: DropDownListComponent;
  @ViewChild('taskName')
  public taskName: CheckBoxComponent;
  @ViewChild('taskID')
  public taskID: CheckBoxComponent;
  @ViewChild('startDate')
  public startDate: CheckBoxComponent;
  @ViewChild('endDate')
  public endDate: CheckBoxComponent;
  @ViewChild('duration')
  public duration: CheckBoxComponent;
  @ViewChild('progress')
  public progress: CheckBoxComponent;
  @ViewChild('priority')
  public priority: CheckBoxComponent;
  @ViewChild('dropdown2')
  public dropdown0: DropDownListComponent;
  @ViewChild('dropdown2')
  public dropdown2: DropDownListComponent;
  @ViewChild('dropdown3')
  public dropdown3: DropDownListComponent;
  @ViewChild('headercontextmenu')
  public headercontextmenu: ContextMenuComponent;

  // public data: Object[] = [];
  public pageSettings: Object;
  public contextMenuItemsRow: string[] = [];
  public contextMenuItems: any;
  public contextMenuSettings: any
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
  public d0data: Object;
  public fields0: Object;
  public d2data: Object;
  public fields2: Object;
  public d3data: Object;
  public fields3: Object;

  // For Row Drag and Drop
  public selectOptions: Object;
  public headermenuItems: any[] = [
    {
      text: 'Cut', target: '.e-headercontent', id: ''
    },
  ];
  public menuItems: MenuItemModel[] = [
    {
      text: 'Cut'
    },
    {
      text: 'Copy'
    },
    {
      text: 'Paste'
    }];

  //   constructor(@Inject('sourceFiles') private sourceFiles: any) {
  //     sourceFiles.files = ['./app.component.css'];
  // }

  ngOnInit(): void {
    this.data = new DataManager({ url: 'https://ej2services.syncfusion.com/production/web-services/api/SelfReferenceData', adaptor: new WebApiAdaptor });
    // this.data = sampleData;
    this.pageSetting = { pageCount: 3 };
    // this.contextMenuItemsRow = ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending',
    //   'Edit', 'Delete', 'Save', 'Cancel',
    //   'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage',
    //   'LastPage', 'NextPage'];
    this.editing = { allowDeleting: true, allowEditing: true, allowAdding: true, mode: 'Row' };

    this.contextMenuItems = [
      { text: 'Insert Column', target: '.e-headercontent', id: 'insert' },
      { text: 'Delete Column', target: '.e-headercontent', id: 'delete' },
      { text: 'Edit Column', target: '.e-headercontent', id: 'rename' },
      {
        //Enables the context menu
        text: 'Edit Type',
        target: '.e-headercontent',
        // show: true,
        items: [
          { text: 'String', id: 'string' },
          { text: 'Number', id: 'number' },
          { text: 'Boolean', id: 'boolean' }
        ],
        // Hides the default context menu items
        showCustomMenuOnly: false,
      },
      {
        //Enables the context menu
        text: 'Add Row',
        target: '.e-content',
        show: true,
        items: [
          { text: 'Add Next', id: 'string' },
          { text: 'Add Child', id: 'number' },
        ],
        // Hides the default context menu items
        showCustomMenuOnly: false,
      },

      'Copy', 'Edit', 'Delete'

    ];
    // this.pageSettings= { pageSize: 10 };
    // this.editparams = { params: { format: 'n' } };

    // For ColumnChooser
    this.toolbar = ['ColumnChooser'];

    // For Filtering the treeGrid
    this.filterSettings = { type: 'FilterBar', hierarchyMode: 'Parent', mode: 'Immediate' };
    this.templateOptions = {
      create: (args: { element: Element }) => {
        let dd: HTMLInputElement = document.createElement('input');
        dd.id = 'Duration';
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
        this.dropDownFilter.appendTo('#Duration');
      }
    };
    this.fields0 = { text: 'mode', value: 'id' };
    this.d0data = [{ id: 'Parent', mode: 'Parent' },
    { id: 'Child', mode: 'Child' },
    { id: 'Both', mode: 'Both' },
    { id: 'None', mode: 'None' },];

    this.sortSettings = {
      columns: [{ field: 'TaskID', direction: 'Ascending' },
      { field: 'TaskName', direction: 'Ascending' },
      ]
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
    { id: 'Box', mode: 'Box' }];

    // For Row Drag and Drop
    this.selectOptions = { type: 'Multiple' };
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
      this.treegrid.sortByColumn('TaskName', 'Ascending', true);
    } else {
      this.treegrid.grid.removeSortColumn('TaskName');
    }

  }
  public onClick2(e: MouseEvent): void {
    if (this.taskID.checked) {
      this.treegrid.sortByColumn('TaskID', 'Ascending', true);
    } else {
      this.treegrid.grid.removeSortColumn('TaskID');
    }

  }
  public onClick3(e: MouseEvent): void {
    if (this.startDate.checked) {
      this.treegrid.sortByColumn('StartDate', 'Ascending', true);
    } else {
      this.treegrid.grid.removeSortColumn('StartDate');
    }

  }
  public onClick4(e: MouseEvent): void {
    if (this.endDate.checked) {
      this.treegrid.sortByColumn('EndDate', 'Ascending', true);
    } else {
      this.treegrid.grid.removeSortColumn('EndDate');
    }

  }
  public onClick5(e: MouseEvent): void {
    if (this.duration.checked) {
      this.treegrid.sortByColumn('Duration', 'Ascending', true);
    } else {
      this.treegrid.grid.removeSortColumn('Duration');
    }

  } public onClick6(e: MouseEvent): void {
    if (this.progress.checked) {
      this.treegrid.sortByColumn('Progress', 'Ascending', true);
    } else {
      this.treegrid.grid.removeSortColumn('Progress');
    }

  } public onClick7(e: MouseEvent): void {
    if (this.priority.checked) {
      this.treegrid.sortByColumn('Priority', 'Ascending', true);
    } else {
      this.treegrid.grid.removeSortColumn('Priority');
    }

  }

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
      case 'TaskName':
        this.taskName.checked = state; break;
      case 'TaskID':
        this.taskID.checked = state; break;
      case 'StartDate':
        this.startDate.checked = state; break;
      case 'EndDate':
        this.endDate.checked = state; break;
      case 'Duration':
        this.duration.checked = state; break;
      case 'Progress':
        this.progress.checked = state; break;
      case 'Priority':
        this.priority.checked = state; break;
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
  contextMenuClick(args?: MenuEventArgs): void {
    // console.log(args);
    // console.log(this.treegrid);
    if (args.item.id === 'insert') {
      let columnName = { field: 'new', headerText: 'NewColumn', width: 100 };
      this.treegrid.columns.push(columnName as any); // Insert Columns
      this.treegrid.refreshColumns(); // Refresh Columns
    } else if (args.item.id === 'delete') {
      let columnIndex = args['column'].index;
      this.treegrid.columns.splice(columnIndex, 1); //Splice columns
      this.treegrid.refreshColumns(); //Refresh Columns
    } else if (args.item.id === 'rename') {
      let columnName = args['column'].field;
      console.log(this.treegrid.getColumnByField(columnName)); //Get the required column
      this.treegrid.getColumnByField(columnName).headerText = 'Task details'; //Rename column name
      this.treegrid.refreshColumns(); //Refresh Columns
    }
  }
  contextMenuOpen(args?: ContextMenuOpenEventArgs) {
    // console.log(args);
    // console.log(args.rowInfo['target'].className);
   
    // if (args.rowInfo['target'].className == 'e-headertext') {
    //   let contextMenuObj = (args.element as any).ej2_instances[0];
    //   contextMenuObj.enableItems(["Add Row"],false);
    // }
    // else {
    //    contextMenuObj.enableItems(["Add Row"],true); 
    // }
  }


  beforeOpen(args): void {
  }

  select(args): void {
  }
}