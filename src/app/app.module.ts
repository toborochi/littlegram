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
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ListaUsuariosComponent } from './componentes/lista-usuarios/lista-usuarios.component';
import { ChatUsuariosComponent } from './componentes/chat-usuarios/chat-usuarios.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { EditorComponent } from './componentes/editor/editor.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { NuevoDiagramaComponent } from './componentes/dialogos/nuevo-diagrama/nuevo-diagrama.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { HttpClientModule } from '@angular/common/http';
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
import { NgxSpinnerModule } from "ngx-spinner";

var config_firebase = {
  apiKey: "AIzaSyC_KBHVE5Ba_NOHaPS4_GzbR3X5qrOKCYs",
  authDomain: "littlegram-beta.firebaseapp.com",
  databaseURL: "https://littlegram-beta-default-rtdb.firebaseio.com",
  projectId: "littlegram-beta",
  storageBucket: "littlegram-beta.appspot.com",
  messagingSenderId: "765380842157",
  appId: "1:765380842157:web:158f10899cda2936146c24",
  measurementId: "G-NM05S1WTFB"

};

@NgModule({
  declarations: [
    AppComponent,
    ListaUsuariosComponent,
    ChatUsuariosComponent,
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
    MatSlideToggleModule,
    FormsModule,
    FontAwesomeModule,
    SocketIoModule.forRoot(config),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(config_firebase),
    AngularFireAuthModule,
    NgxSpinnerModule,
    HttpClientModule
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
