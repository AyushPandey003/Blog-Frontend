import { Component } from '@angular/core';
import { PostService } from '../../service/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { CommentService } from '../../service/comment.service';

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
  comments:any;

  commentForm!:FormGroup;

  constructor(
    private postService:PostService,
    private snackBar:MatSnackBar,
    private activatedRoute:ActivatedRoute,
    private fb:FormBuilder,
    private commentService:CommentService)
  {}
  ngOnInit(){
    console.log(this.postId);
    this.getPostById();
    this.commentForm=this.fb.group({
      postedBy:[null,Validators.required],
      content:[null,Validators.required],
    })
  }

  publishComment(){
    const postedBy=this.commentForm.get('postedBy')?.value;
    const content=this.commentForm.get('content')?.value;

    this.commentService.createComment(this.postId,postedBy,content).subscribe((res)=>{
      this.snackBar.open("Comment Posted Successfully","OK");
      this.getCommentsByPost();
    },
    (error)=>{
      this.snackBar.open("Something Went Wrong !!!","OK")
    })
  }

  getCommentsByPost(){
    this.commentService.getAllCommentsByPost(this.postId).subscribe((res)=>{
      this.comments=res;
    },
    (error)=>{
      this.snackBar.open("Something Went Wrong !!!","OK")
    })
  }

  getPostById(){
    this.postService.getAllPostById(this.postId).subscribe(res=>{
      this.postData=res;
      console.log(res);
      this.getCommentsByPost();
    },
    error=>{
      this.snackBar.open("Something Went Wrong !!!","OK")
    })
  }



  likePost(){
    this.postService.likePost(this.postId).subscribe((response)=>{
      this.snackBar.open("Post Liked Successfully","OK");
      this.getPostById();
    },
    (error)=>{
      this.snackBar.open("Something Went Wrong !!!","OK")
    })
  }

}
