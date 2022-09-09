import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {DetailViewComponent} from './detail-view/detail-view.component';
import {MasterViewComponent} from './master-view/master-view.component';
import {CreateUserFormComponent} from './forms/create-user-form/create-user-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule} from '@angular/common/http';
import {MatListModule} from '@angular/material/list';
import {UserEntryComponent} from './master-view/user-entry/user-entry.component';
import {RouterModule} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {UserFormComponent} from './forms/user-form/user-form.component';
import {EditUserFormComponent} from './forms/edit-user-form/edit-user-form.component';
import {MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import {MatIconModule} from '@angular/material/icon';
import {DeleteUserConfirmDialogComponent} from './detail-view/delete-user-confirm-dialog/delete-user-confirm-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';

registerLocaleData(localeDe, 'de-DE', localeDeExtra);

@NgModule({
  declarations: [
    AppComponent,
    DetailViewComponent,
    MasterViewComponent,
    CreateUserFormComponent,
    UserEntryComponent,
    UserFormComponent,
    EditUserFormComponent,
    DeleteUserConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'users', component: MasterViewComponent},
      {path: 'users/:id', component: MasterViewComponent},
      {path: 'create', component: CreateUserFormComponent},
      {path: 'edit/:id', component: EditUserFormComponent},
      {path: '', redirectTo: '/users', pathMatch: 'full'},
    ]),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatMomentDateModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}, // set default input field style
    {provide: MAT_DATE_LOCALE, useValue: 'de-DE'}, // set default locale for input fields
    {provide: LOCALE_ID, useValue: 'de-DE'}, // set default locale for date pipe
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}} // use moment date adapter for better date input parsing
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
