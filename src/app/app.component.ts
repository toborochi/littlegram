
import {Component, OnInit, Inject, ViewEncapsulation, ViewChild, AfterViewInit, ElementRef, HostListener} from '@angular/core';
import {DiagramComponent, IExportOptions, PortVisibility, SymbolPaletteComponent} from '@syncfusion/ej2-angular-diagrams';
import {
  Diagram, NodeModel, UndoRedo, ConnectorModel, PointPortModel, Connector, FlowShapeModel,
  SymbolInfo, IDragEnterEventArgs, SnapSettingsModel, MarginModel, TextStyleModel, StrokeStyleModel,
  OrthogonalSegmentModel, Node, PaletteModel
} from '@syncfusion/ej2-diagrams';
import { ExpandMode } from '@syncfusion/ej2-navigations';
import { paletteIconClick } from '../scripts/diagram-common';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ListaUsuariosComponent} from './componentes/lista-usuarios/lista-usuarios.component';
import {ChatUsuariosComponent} from './componentes/chat-usuarios/chat-usuarios.component';
Diagram.Inject(UndoRedo);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class AppComponent implements OnInit,AfterViewInit {

  @ViewChild('diagram')
  public diagram: DiagramComponent;

  @ViewChild('symbolpalette')
  public palette: SymbolPaletteComponent;

  @ViewChild('angcard') elementView: ElementRef;

  constructor(public dialog: MatDialog) {}


  private connectorSymbols: ConnectorModel[] = [
    {
      id: 'Link1',
      type: 'Orthogonal',
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      targetDecorator: { shape: 'Arrow', style: {strokeColor: '#757575', fill: '#757575'} },
      style: { strokeWidth: 1, strokeColor: '#757575' }
    },
    {
      id: 'link3',
      type: 'Orthogonal',
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      style: { strokeWidth: 1, strokeColor: '#757575' },
      targetDecorator: { shape: 'None' }
    },
    {
      id: 'Link21',
      type: 'Straight',
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      targetDecorator: { shape: 'Arrow', style: {strokeColor: '#757575', fill: '#757575'} },
      style: { strokeWidth: 1, strokeColor: '#757575' }
    },
    {
      id: 'link23',
      type: 'Straight',
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      style: { strokeWidth: 1, strokeColor: '#757575' },
      targetDecorator: { shape: 'None' }
    },
    {
      id: 'link33',
      type: 'Bezier',
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      style: { strokeWidth: 1, strokeColor: '#757575' },
      targetDecorator: { shape: 'None' }
    }
  ];

  private ports_up_down : PointPortModel[]=[
    {
      id: 'port3',
      offset: {
        x: 0.5,
        y: 0
      },
      height: 6,
      width: 6,
      visibility: PortVisibility.Visible
    },
    {
      id: 'port4',
      offset: {
        x: 0.5,
        y: 1
      },
      height: 6,
      width: 6,
      visibility: PortVisibility.Visible
    }
  ];


  private ports : PointPortModel[]=[
    {
      id: 'port1',
      offset: {
        x: 0,
        y: 0.5
      },
      height: 6,
      width: 6,
      visibility: PortVisibility.Visible
    },
    {
      id: 'port2',
      offset: {
        x: 1,
        y: 0.5
      },
      height: 6,
      width: 6,
      visibility: PortVisibility.Visible
    },
    {
      id: 'port3',
      offset: {
        x: 0.5,
        y: 0
      },
      height: 6,
      width: 6,
      visibility: PortVisibility.Visible
    },
    {
      id: 'port4',
      offset: {
        x: 0.5,
        y: 1
      },
      height: 6,
      width: 6,
      visibility: PortVisibility.Visible
    }
  ];

  private flowshapes: NodeModel[] = [
    { id: 'Terminator', shape: { type: 'Flow', shape: 'Terminator' },ports: this.ports },
    { id: 'Process', shape: { type: 'Flow', shape: 'Process' } ,ports: this.ports },
    { id: 'Decision', shape: { type: 'Flow', shape: 'Decision' },ports: this.ports  },
    { id: 'Document', shape: { type: 'Flow', shape: 'Document' },ports: this.ports  },
    { id: 'PreDefinedProcess', shape: { type: 'Flow', shape: 'PreDefinedProcess' },ports: this.ports  },
    { id: 'PaperTap', shape: { type: 'Flow', shape: 'PaperTap' },ports: this.ports  },
    { id: 'DirectData', shape: { type: 'Flow', shape: 'DirectData' },ports: this.ports  },
    { id: 'SequentialData', shape: { type: 'Flow', shape: 'SequentialData' },ports: this.ports  },
    { id: 'Sort', shape: { type: 'Flow', shape: 'Sort' },ports: this.ports  },
    { id: 'MultiDocument', shape: { type: 'Flow', shape: 'MultiDocument' },ports: this.ports  },
    { id: 'Collate', shape: { type: 'Flow', shape: 'Collate' },ports: this.ports  },
    { id: 'SummingJunction', shape: { type: 'Flow', shape: 'SummingJunction' },ports: this.ports  },
    { id: 'Or', shape: { type: 'Flow', shape: 'Or' },ports: this.ports  },
    {
      id: 'InternalStorage',
      shape: { type: 'Flow', shape: 'InternalStorage' },
      ports: this.ports
    },
    { id: 'Extract', shape: { type: 'Flow', shape: 'Extract' },ports: this.ports  },
    {
      id: 'ManualOperation',
      shape: { type: 'Flow', shape: 'ManualOperation' },
      ports: this.ports
    },
    { id: 'Merge', shape: { type: 'Flow', shape: 'Merge' },ports: this.ports  },
    {
      id: 'OffPageReference',
      shape: { type: 'Flow', shape: 'OffPageReference' },
      ports: this.ports
    },
    {
      id: 'SequentialAccessStorage',
      shape: { type: 'Flow', shape: 'SequentialAccessStorage' },
      ports: this.ports
    },
    { id: 'Annotation', shape: { type: 'Flow', shape: 'Annotation' },ports: this.ports  },
    { id: 'Annotation2', shape: { type: 'Flow', shape: 'Annotation2' },ports: this.ports  },
    { id: 'Data', shape: { type: 'Flow', shape: 'Data' },ports: this.ports_up_down  },
    { id: 'Card', shape: { type: 'Flow', shape: 'Card' },ports: this.ports  },
    { id: 'Delay', shape: { type: 'Flow', shape: 'Delay' },ports: this.ports  }
  ];

  public palettes: PaletteModel[] = [
    {
      id: 'flow',
      expanded: false,
      symbols: this.flowshapes,
      iconCss: 'shapes',
      title: 'Figuras',
    },
    {
      id: 'connectors',
      expanded: false,
      symbols: this.connectorSymbols,
      iconCss: 'shapes',
      title: 'Conectores'
    }
  ];

  public expandMode: ExpandMode = 'Multiple';
  public symbolMargin: MarginModel = { left: 10, right: 10, top: 10, bottom: 10 };

  public getSymbolInfo(symbol: NodeModel): SymbolInfo {
    return { fit: true };
  }

  public getSymbolDefaults(symbol: NodeModel): void {
    symbol.style.strokeColor = '#757575';
    if (symbol.id === 'Terminator' || symbol.id === 'Process') {
      symbol.width = 80;
      symbol.height = 40;
    } else if (
      symbol.id === 'Decision' ||
      symbol.id === 'Document' ||
      symbol.id === 'PreDefinedProcess' ||
      symbol.id === 'PaperTap' ||
      symbol.id === 'DirectData' ||
      symbol.id === 'MultiDocument' ||
      symbol.id === 'Data'
    ) {
      symbol.width = 50;
      symbol.height = 40;
    } else {
      symbol.width = 50;
      symbol.height = 50;
    }
  }
  public interval: number[] = [
    1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25,
    9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75
  ];

  public snapSettings: SnapSettingsModel = {
    horizontalGridlines: { lineColor: '#e0e0e0', lineIntervals: this.interval },
    verticalGridlines: { lineColor: '#e0e0e0', lineIntervals: this.interval }
  };



  public connDefaults(obj: Connector): void {
    if (obj.id.indexOf('connector') !== -1) {
      obj.type = 'Orthogonal';
      obj.targetDecorator = { shape: 'Arrow', width: 10, height: 10 };
    }
  }

  public dragEnter(args: IDragEnterEventArgs): void {
    let obj: NodeModel = args.element as NodeModel;
    if (obj && obj.width && obj.height) {
      let oWidth: number = obj.width;
      let oHeight: number = obj.height;
      let ratio: number = 100 / obj.width;
      obj.width = 100;
      obj.height *= ratio;
      obj.offsetX += (obj.width - oWidth) / 2;
      obj.offsetY += (obj.height - oHeight) / 2;

    }
  }

  public diagramCreate(args: Object): void {
    paletteIconClick();
  }

  public created(): void {
    this.diagram.fitToPage();
  }



  ngOnInit(): void {


  }

  x : number;
  ngAfterViewInit(): void {

    this.diagram.historyChange.subscribe(_=>{
      console.log('s');
    });

    this.diagram.height=this.elementView.nativeElement.offsetHeight;
    this.diagram.propertyChange.subscribe(_=>{

      //console.log('Cambio');
    });

  }

  data:string;



  exportPNG(){
    let x : IExportOptions = {
      format: 'PNG',
      fileName: 'imagen',

    };
    this.diagram.exportDiagram(x);


  }

  openDialog(x:string) {

    if(x=='chat'){
      const dialogRef = this.dialog.open(ChatUsuariosComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }else{
      const dialogRef = this.dialog.open(ListaUsuariosComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

  }


  guardar(){
    console.log(this.diagram.nodes);
    console.log(this.diagram.connectors);

    this.data=this.diagram.saveDiagram();
    this.diagram.clear();
  }

  cargar(){
    this.diagram.loadDiagram(this.data);
  }

}
