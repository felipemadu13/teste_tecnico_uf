import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  public post:any = [];
  public currentPage:number = 1;
  public searchText: string = '';

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
    this.postService.getAllPosts().subscribe(data => {this.post = data;});
  }

  postsPerPage() {
    const start: number = (this.currentPage - 1) * 5;
    const end: number = start + 5;
    return this.post.slice(start,end)
  }

  newCurrentPage(page: number) {
    this.currentPage = page;
  }

  previousPage() {
    if(this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
    }
  }

  nextPage() {
    if(this.currentPage < 20) {
      this.currentPage = this.currentPage + 1;
    }
  }

  numberOfPages() {
    const numberOfPages = Math.floor(this.post.length / 5);
    const pagesArray = [];

    for (let i = 1; i <= numberOfPages; i++) {
      pagesArray.push(i);
    }
    return pagesArray;
  }

  findPosts() {
    if (this.searchText.trim() === '') {
      this.postService.getAllPosts();
    }
    this.postService.searchPostsByTitle(this.searchText).subscribe(
      (posts) => {
        this.post = posts;
        if (posts.length === 0) {
          this.post = [
            {
              "userId": 1,
              "id": 1,
              "title": "Post não encontrado",
              "body": ""
            }
        ]
        }
      }
    );
  }

  goToPostDetail(postId: number) {
    this.router.navigate(['/post', postId]);
    this.postService.isPost = false;
  }


}
