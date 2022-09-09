import {Injectable} from '@angular/core';
import {User} from './user';
import {HttpClient} from '@angular/common/http';
import {map, Observable, of, ReplaySubject, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [];
  private usersSubject: ReplaySubject<User[]> = new ReplaySubject<User[]>(0);
  public $users: Observable<User[]> = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.init()
  }

  private init() {
    this.http.get('https://dummyjson.com/users').subscribe(data => {
      // @ts-ignore
      this.users = data["users"];
      this.usersSubject.next(this.users);
    });
  }

  public createUser(user: User) {
    this.http.post('https://dummyjson.com/users/add', user).subscribe(newUser => {
      // @ts-ignore
      this.users.push(newUser)
      this.usersSubject.next(this.users);
    });
  }

  // sends backend request
  // return observable of type boolean if deletion was successful
  public deleteUser(id: number): Observable<boolean> {
    return this.http.delete('https://dummyjson.com/users/' + id)
      .pipe(
        map((response) => {
          // @ts-ignore
          return response["isDeleted"];
        }),
        tap(isDeleted => {
          if (!isDeleted) return;

          // find and update local user data if found
          let index = this.users.findIndex(user => user.id === id);
          if (index > -1) {
            this.users.splice(index, 1);
            this.usersSubject.next(this.users);
          }
        })
      );
  }

  public editUser(user: User) {
    this.http.put('https://dummyjson.com/users/' + user.id, user).subscribe(updatedUser => {

      // find and update local user data if found
      let index = this.users.findIndex(user => user.id === (updatedUser as User).id);
      if (index > -1) {
        this.users[index] = updatedUser as User;
        this.usersSubject.next(this.users);
      }
    });
  }

  public getUser(id: number): Observable<User> {
    // use cached user data if available
    const cachedUser = this.users.find(user => user.id === id);
    if (cachedUser) {
      return of(cachedUser);
    }

    return this.http.get('https://dummyjson.com/users/' + id).pipe(map((data) => {
      return data as User;
    }))
  }

}
