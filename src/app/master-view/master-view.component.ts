import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../services/user';
import {UserService} from '../services/user.service';
import {takeWhile} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-master-view',
  templateUrl: './master-view.component.html',
  styleUrls: ['./master-view.component.scss']
})
export class MasterViewComponent implements OnInit, OnDestroy {

  public users: User[] = [];
  private isAlive = true;
  private selectedUserId: number | undefined;

  constructor(private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.userService.$users.pipe(takeWhile(() => this.isAlive)).subscribe(users => {
      this.users = users;
    });

    this.route.params.subscribe(params => {
      this.selectedUserId = +params['id'];
    });
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  isUserSelected(userId: number | undefined) {
    return userId === this.selectedUserId;
  }
}
