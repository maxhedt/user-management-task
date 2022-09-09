import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../services/user';
import {Gender} from '../../services/gender';

// typed form group for advanced type hinting
export type UserControls = { [key in keyof User]: AbstractControl };
export type UserFormGroup = FormGroup & { value: User, controls: UserControls };

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  public userFormGroup!: UserFormGroup;
  public genders = Object.values(Gender);

  // date ranges for birthdate selection
  public minDate = new Date(1900, 0, 1);
  public maxDate = new Date();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  public createGroup(): UserFormGroup {
    this.userFormGroup = this.fb.group({
      firstName: new FormControl('', [
        Validators.required,
        Validators.maxLength(64)
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(64)
      ]),
      birthDate: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(256),
        // source: https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
        Validators.pattern(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)
      ]),
      gender: new FormControl('', Validators.required),
      image: new FormControl('', [
        Validators.required,
        // source: https://gist.github.com/dperini/729294
        Validators.pattern(/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i)
      ])
    } as UserControls) as UserFormGroup;

    return this.userFormGroup;
  }

}
