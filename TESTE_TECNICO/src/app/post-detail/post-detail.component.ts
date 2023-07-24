import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { IPost } from '../IPost';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: IPost | null = null;
  // isPost: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {
  }
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const postId = Number(params.get('id'));
      this.getPost(postId);
      this.postService.isPost = true;
    });
  }

  getPost(id: number) {
    this.postService.getPostById(id).subscribe(post => {
      this.post = post;
    });
  }

}
