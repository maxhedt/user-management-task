import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective} from '@angular/forms';
import {Gender} from '../../services/gender';
import {UserService} from '../../services/user.service';
import {UserFormComponent, UserFormGroup} from '../user-form/user-form.component';

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.scss']
})
export class CreateUserFormComponent implements OnInit {

  // implement user form as subform
  @ViewChild(UserFormComponent, {static: true}) userForm!: UserFormComponent;
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;

  public createUserForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.createUserForm = this.fb.group({
      user: this.userForm.createGroup()
    });
  }

  onFormSubmit() {
    if (!this.createUserForm.valid) return;

    const userFormControls = this.createUserForm.get('user') as UserFormGroup;

    this.userService.createUser({
      firstName: userFormControls.controls.firstName.value,
      lastName: userFormControls.controls.lastName.value,
      birthDate: userFormControls.controls.birthDate.value,
      email: userFormControls.controls.email.value as string,
      gender: userFormControls.controls.gender.value as Gender,
      image: userFormControls.controls.image.value
    });

    // reset form via formGroupDirective
    this.formGroupDirective.resetForm();
  }

}
