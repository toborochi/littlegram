import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {DiagramComponent} from '@syncfusion/ej2-angular-diagrams';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Diagram, IExportOptions} from '@syncfusion/ej2-angular-diagrams';
@Component({
  selector: 'app-diagram-viewer',
  templateUrl: './diagram-viewer.component.html',
  styleUrls: ['./diagram-viewer.component.css']
})
export class DiagramViewerComponent implements OnInit,AfterViewInit {

  @ViewChild('diagram')
  public diagram: DiagramComponent;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

  }

  public created(): void {
    this.diagram.fitToPage();
  }

  ngAfterViewInit(): void {
    this.diagram.width=800;
    let d  :Diagram = JSON.parse(this.data.diagrama);
    this.diagram.nodes=d.nodes;
    this.diagram.connectors=d.connectors;
  }

}
