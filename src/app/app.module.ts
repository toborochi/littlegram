import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DiagramModule ,SymbolPaletteAllModule} from '@syncfusion/ej2-angular-diagrams';
import { AppComponent } from './app.component';
import { HierarchicalTreeService, MindMapService, RadialTreeService, ComplexHierarchicalTreeService } from '@syncfusion/ej2-angular-diagrams';
import { DataBindingService, SnappingService, PrintAndExportService, BpmnDiagramsService} from '@syncfusion/ej2-angular-diagrams';
import { SymmetricLayoutService, ConnectorBridgingService, UndoRedoService, LayoutAnimationService} from '@syncfusion/ej2-angular-diagrams';
import { DiagramContextMenuService, ConnectorEditingService } from '@syncfusion/ej2-angular-diagrams';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';

import {FlexModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRippleModule} from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ListaUsuariosComponent } from './componentes/lista-usuarios/lista-usuarios.component';
import { ChatUsuariosComponent } from './componentes/chat-usuarios/chat-usuarios.component';
import { ChatComponentComponent } from './componentes/chat-core/chat-component/chat-component.component';
import {FormsModule} from '@angular/forms';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { EditorComponent } from './componentes/editor/editor.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { NuevoDiagramaComponent } from './componentes/dialogos/nuevo-diagrama/nuevo-diagrama.component';
@NgModule({
  declarations: [
    AppComponent,
    ListaUsuariosComponent,
    ChatUsuariosComponent,
    ChatComponentComponent,
    InicioComponent,
    EditorComponent,
    DashboardComponent,
    NuevoDiagramaComponent
  ],
  imports: [
    BrowserModule,
    DiagramModule,
    SymbolPaletteAllModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatDividerModule,
    MatBadgeModule,
    MatDialogModule,
    MatListModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatRippleModule,
    FormsModule
  ],
  providers: [
    HierarchicalTreeService,
    MindMapService,
    RadialTreeService,
    ComplexHierarchicalTreeService,
    DataBindingService,
    SnappingService,
    PrintAndExportService,
    BpmnDiagramsService,
    SymmetricLayoutService,
    ConnectorBridgingService,
    UndoRedoService,
    LayoutAnimationService,
    DiagramContextMenuService,
    ConnectorEditingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
