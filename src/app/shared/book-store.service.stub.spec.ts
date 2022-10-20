import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Book } from './book';
import { BookStoreService } from './book-store.service';

describe('BookStoreService', () => {
  let service: BookStoreService;

  beforeEach(() => {

    const expectedBooks: Book[] = [
      { isbn: '111', title: 'Book 1', authors: [] },
      { isbn: '222', title: 'Book 2', authors: [] }
    ];

    const httpStub = {
      get: () => of(expectedBooks)
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: httpStub
        },
        BookStoreService
      ]
    });
    service = TestBed.inject(BookStoreService);
  });

  it('should GET a list of all books', () => {

    let receivedBooks!: Book[];
    service.getAll().subscribe(b => receivedBooks = b);

    expect(receivedBooks.length).toBe(2);
    expect(receivedBooks[0].isbn).toBe('111');
    expect(receivedBooks[1].isbn).toBe('222');
  });
});
