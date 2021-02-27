import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DiagramComponent, IExportOptions, PortVisibility, SymbolPaletteComponent, DiagramConstraints} from '@syncfusion/ej2-angular-diagrams';
import {MatDialog} from '@angular/material/dialog';
import * as _ from 'lodash';
import {
  Connector,
  ConnectorModel, IDragEnterEventArgs,
  MarginModel,
  NodeModel,
  PaletteModel,
  PointPortModel,
  SnapSettingsModel,
  SymbolInfo,
  IHistoryChangeArgs,
  IDropEventArgs,
  ICollectionChangeEventArgs,
  IDragLeaveEventArgs,
  IClickEventArgs,
  SelectorModel,
  ISelectionChangeEventArgs,

} from '@syncfusion/ej2-diagrams';
import {ExpandMode} from '@syncfusion/ej2-navigations';
import {paletteIconClick} from '../../../scripts/diagram-common';
import {ChatUsuariosComponent, Message} from '../chat-usuarios/chat-usuarios.component';
import {ListaUsuariosComponent} from '../lista-usuarios/lista-usuarios.component';
import { faQuestion,faComments,faFolderOpen,faKey,faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {EditorService} from '../../servicios/editor/editor.service';
import {Subscription} from 'rxjs';
import firebase from 'firebase';
import User = firebase.User;
import {ChatService} from '../../servicios/chat/chat.service';
import {IntroDialogoComponent} from '../dialogos/intro-dialogo/intro-dialogo.component';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit,AfterViewInit,OnDestroy {

  messages: Message[] = new Array();
  sala : any[] = new Array();
  u : User = JSON.parse(localStorage.getItem('user'));
  pregunta_icon = faQuestion;
  chat_icon = faComments;
  folder_icon = faFolderOpen;
  llave_icon = faKey;
  volver_icon = faChevronLeft;

  @ViewChild('diagram')
  public diagram: DiagramComponent;

  @ViewChild('symbolpalette')
  public palette: SymbolPaletteComponent;

  @ViewChild('angcard') elementView: ElementRef;

  private _diagrama: Subscription;
  private diagram_id : string;

  constructor(public dialog: MatDialog,
              private router: Router,
              private editorService: EditorService,
              private chatService: ChatService,
              private route: ActivatedRoute,
              private spinner: NgxSpinnerService) {}


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


  public created(): void {
    this.diagram.fitToPage();
  }

  chat:Subscription;
  diagramInit: Subscription;


  ngOnInit(): void {

    this.u  = JSON.parse(localStorage.getItem('user'));

    this.diagram_id = this.route.snapshot.paramMap.get('id');
    console.log(this.diagram_id);

      this._diagrama = this.editorService.currentDiagram.subscribe(data=>{
        if(data.usuario && data.data){
          this.diagram.loadDiagram(data.data);
        }
      });



    this.chat = this.chatService.currentChat.subscribe(data=>{
      console.log('Recibiendo Mensajes ',data);
      this.messages.push({
        from: data.from,
        action: undefined,
        content: data.content
      });
      console.log(this.messages.length);
    });

    this.chatService.loadChat.subscribe(data=>{

      if(data.sala){
        console.log(data.sala);
        this.sala = data.sala;
      }

      this.messages = data.chat_array;

      if(data.diagram){
        this.diagram.loadDiagram(data.diagram);
      }

    });

  }

  ngOnDestroy(): void {

    console.log('DESTROY');
    this.spinner.hide();
    this._diagrama.unsubscribe();
    this.chat.unsubscribe();
  }


  x : number;

  colChange(e:ICollectionChangeEventArgs){
    //console.log('COLCHANGE');
    //console.log(e.cause);
    console.log(this.diagram.nodes);
    console.log(this.diagram.connectors);
    this.editorService.editDiagram(this.u,this.diagram_id,this.diagram.saveDiagram());
  }


   updateState(e: IHistoryChangeArgs){
     // @ts-ignore
     //console.log(e.change.type);
     /*
     e.source.forEach(data=>{
       console.log(data.id);
     })*/
    this.editorService.editDiagram(this.u,this.diagram_id,this.diagram.saveDiagram());
  }

   dropEvent(e:IDropEventArgs){
     //console.log('DROP');
    this.editorService.editDiagram(this.u,this.diagram_id,this.diagram.saveDiagram());
  }

   dragLeave(e:IDragLeaveEventArgs){
    //console.log('DRAG');
    this.editorService.editDiagram(this.u,this.diagram_id,this.diagram.saveDiagram());
  }

  clicked(e:IClickEventArgs){
    this.editorService.editDiagram(this.u,this.diagram_id,this.diagram.saveDiagram());
  }

  addNode(){

    var deep : NodeModel = _.cloneDeep<NodeModel>(this.flowshapes[0]);
    this.diagram.addNode(deep);
    console.log(this.diagram.nodes.length);
  }

  selection(e:ISelectionChangeEventArgs){
    console.log("SELECTION");

    /*
    e.newValue.forEach(data=>{

      let n : NodeModel | ConnectorModel = data

      if(n instanceof Connector){
        let x = n as ConnectorModel;
        console.log(x.sourcePoint.x,'-',x.targetPoint.y);
      }else{
        let x = n as NodeModel;
        console.log(x);
      }

      //console.log(`Nodo ${n.id} seleccionado`);
    })*/
  }

  mouseUp(e){

  }




  ngAfterViewInit(): void {

    this.diagram.selectedItems = {};
    let d = this.diagram.saveDiagram();
    this.editorService.updateDiagram(this.diagram_id,d,this.u.uid).subscribe(r=>{
      console.log(r.data);
      if(r.data.edit==false){
        this.spinner.show();
      }
    });
    this.editorService.initConnection(this.u,this.diagram_id);


  }

  data:string;



  exportPNG(){
    let x : IExportOptions = {
      format: 'PNG',
      fileName: 'imagen',

    };
    this.diagram.exportDiagram({mode:'Download'});


  }

  openDialog(x:string) {

    if(x=='chat'){
      let dialogRef = this.dialog.open(ChatUsuariosComponent,{
        data : {
          user: this.u,
          room: this.diagram_id,
          messages: this.messages
        }
      });

      const sub = dialogRef.componentInstance.onSendMessage.subscribe((d) => {
        this.messages = d;
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }else{
      const dialogRef = this.dialog.open(ListaUsuariosComponent,{
        data:{
          usuarios: this.sala
        }
      });

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

  goDashboard(){
    this.dialog.closeAll();
    this.router.navigateByUrl('/dashboard');
  }

}

