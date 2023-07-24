import { Component } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isPost: boolean;

  constructor(private postService: PostService) { 
    this.isPost = this.postService.isPost;
  }



}
