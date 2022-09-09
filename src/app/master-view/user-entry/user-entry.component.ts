import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../services/user';

@Component({
  selector: 'app-user-entry',
  templateUrl: './user-entry.component.html',
  styleUrls: ['./user-entry.component.scss']
})
export class UserEntryComponent implements OnInit {

  @Input() user!: User;

  constructor() {
  }

  ngOnInit(): void {
  }

}
