import { Component } from '@angular/core';
import { PostService } from '../../service/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-view-post',
  standalone: true,
  imports: [MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterLink,
    CommonModule,],
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.scss'
})
export class ViewPostComponent {
  postId=this.activatedRoute.snapshot.params['id'];
  postData:any;

  constructor(
    private postService:PostService,
    private snackBar:MatSnackBar,
    private activatedRoute:ActivatedRoute)
  {}
  ngOnInit(){
    console.log(this.postId);
    this.getPostById();
  }
  getPostById(){
    this.postService.getAllPostById(this.postId).subscribe(res=>{
      this.postData=res;
      console.log(res);
    },
    error=>{
      this.snackBar.open("Something Went Wrong !!!","OK")
    })
  }

}
