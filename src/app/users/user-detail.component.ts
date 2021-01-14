import { Component, OnInit } from '@angular/core';
import { IUser } from './user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService} from './user.service';

@Component({
    templateUrl : './user-detail.component.html',
    styleUrls : ['./user-detail.component.css']
})

export class UserDetailComponent implements OnInit{
    pageTitle: string = "User Detail";
    user: IUser;
    errorMessage : string = '';
    
    constructor(private route: ActivatedRoute, private router: Router,private userService: UserService){}

    ngOnInit(){
        let id = +this.route.snapshot.paramMap.get('id');
        this.pageTitle += `: ${id}`;
        this.userService.getUser(id).subscribe({
            next: user => {
              this.user = user
            },
            error: err => this.errorMessage = err
          });
    }

    onBack(): void{
        this.router.navigate(['/users']);
    }
}