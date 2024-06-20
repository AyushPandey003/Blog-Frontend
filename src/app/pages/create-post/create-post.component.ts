import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // For Reactive Forms
import { CommonModule } from '@angular/common'; // For *ngFor
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from '../../service/post.service';
@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule, 
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {
  postForm! : FormGroup;
  tags:string[] = [];
  constructor(private fb:FormBuilder,
    private router:Router,
    private snackBar:MatSnackBar,
    private postService:PostService,
  ) { }
  ngOnInit(){
    this.postForm = this.fb.group({
      name:[null,Validators.required],
      content:[null,[Validators.required,Validators.maxLength(5000)]],
      img:[null,Validators.required],
      postedBy:[null,Validators.required],
    })
  }
  add(event:any){
    const value=(event.value || '').trim();
    if(value){
      this.tags.push(value);
    }
    event.chipInput!.clear();
  }
  remove(tag:any){
    const index = this.tags.indexOf(tag);
    if(index >= 0){
      this.tags.splice(index,1);
    }
  }
  createPost(){
    const data=this.postForm.value;
    data.tags=this.tags;

    this.postService.createNewPost(data).subscribe(res=>{
      this.snackBar.open("Post Created Successfully !!!","Ok");
      this.router.navigateByUrl("/");
    },
  error=>{
    this.snackBar.open("Something Went Wrong !!!","Ok")
  })
  }

}
