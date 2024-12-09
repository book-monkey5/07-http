import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BookStoreService } from '../../shared/book-store.service';
import { Book } from '../../shared/book';

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
  standalone: false,
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {
  book?: Book;
  constructor(
    private service: BookStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const isbn = this.route.snapshot.paramMap.get('isbn')!;
    this.service.getSingle(isbn).subscribe(book => {
      this.book = book;
    });
  }

  removeBook(isbn: string) {
    if (window.confirm('Remove book?')) {
      this.service.remove(isbn).subscribe(() => {
        this.router.navigateByUrl('/books');
      });
    }
  }
}
