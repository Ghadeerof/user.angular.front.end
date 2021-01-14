import { Component ,OnInit} from '@angular/core';
import { IUser } from './user';
import { UserService} from './user.service';

@Component({
    selector : 'pm-users',
    templateUrl : './user-list.component.html',
    styleUrls : ['./user-list.component.css']
})

export class UserListComponent implements OnInit{
    pageTitle : string = "User List";
    imageWidth : number = 50;
    imageMargin : number = 2;
    showImage : boolean = false;
    filteredUsers : IUser[];
    users : IUser[] = [];
    errorMessage : string = '';
    
    _listFilter : string;
    get listFilter(): string{
      return this._listFilter;
    }
    set listFilter(value : string){
      this._listFilter = value;
      this.filteredUsers = this.listFilter? this.performFilter(this.listFilter) : this.users;
    }
    
    constructor(private userService: UserService){

    }
    toggleImage() : void{
      this.showImage = !this.showImage;
    }

    ngOnInit(): void{
      this.userService.getUsers().subscribe({
        next: users => {
          this.users = users,
          this.filteredUsers = this.users
        },
        error: err => this.errorMessage = err
      });
      this.filteredUsers = this.users;
    }



    performFilter(filterBy: string): IUser[]{
      filterBy = filterBy.toLocaleLowerCase();
      return this.users.filter((user : IUser) =>
        user.first_name.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
}