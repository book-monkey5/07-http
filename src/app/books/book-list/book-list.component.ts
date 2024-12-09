import { Component } from '@angular/core';

import { BookStoreService } from '../../shared/book-store.service';
import { Book } from '../../shared/book';

@Component({
  selector: 'bm-book-list',
  templateUrl: './book-list.component.html',
  standalone: false,
  styleUrl: './book-list.component.css'
})
export class BookListComponent {
  books: Book[] = [];

  constructor(private service: BookStoreService) {
    this.service.getAll().subscribe(books => {
      this.books = books;
    });
  }
}
