import {Component, OnInit, ViewChild} from '@angular/core';
import {UserFormComponent, UserFormGroup} from '../user-form/user-form.component';
import {FormBuilder, FormGroup, FormGroupDirective} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Gender} from '../../services/gender';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../services/user';
import {take} from 'rxjs';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.scss']
})
export class EditUserFormComponent implements OnInit {

  // implement user form as subform
  @ViewChild(UserFormComponent, {static: true}) userForm!: UserFormComponent;
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;

  public editUserForm!: FormGroup;
  private user: User | undefined;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.editUserForm = this.fb.group({
      user: this.userForm.createGroup()
    });

    // fetch user id from params
    this.route.params.subscribe(params => {
      const userId = +params['id'];

      // fetch user data and insert into form
      this.userService.getUser(userId).pipe(take(1)).subscribe(user => {
        this.user = user;
        this.patchFormValues();
      });

    });
  }

  onFormSubmit() {
    if (!this.editUserForm.valid) {
      return;
    }

    const userFormControls = this.editUserForm.get('user') as UserFormGroup;

    this.userService.editUser({
      id: this.user?.id,
      firstName: userFormControls.controls.firstName.value,
      lastName: userFormControls.controls.lastName.value,
      birthDate: userFormControls.controls.birthDate.value,
      email: userFormControls.controls.email.value as string,
      gender: userFormControls.controls.gender.value as Gender,
      image: userFormControls.controls.image.value
    });

  }

  private patchFormValues() {
    if (!this.user) return;

    const userFormControls = this.editUserForm.get('user') as UserFormGroup;

    userFormControls.controls.firstName.patchValue(this.user.firstName);
    userFormControls.controls.lastName.patchValue(this.user.lastName);
    userFormControls.controls.birthDate.patchValue(this.user.birthDate);
    userFormControls.controls.gender.patchValue(this.user.gender);
    userFormControls.controls.email.patchValue(this.user.email);
    userFormControls.controls.image.patchValue(this.user.image);
  }
}
