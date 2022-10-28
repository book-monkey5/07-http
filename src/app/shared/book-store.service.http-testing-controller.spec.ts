import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Book } from './book';
import { BookStoreService } from './book-store.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('BookStoreService', () => {
  let service: BookStoreService;
  let httpMock: HttpTestingController;
  const expectedBooks = [
    { isbn: '111', title: 'Book 1', authors: [] },
    { isbn: '222', title: 'Book 2', authors: [] }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(BookStoreService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should GET a list of all books', () => {

    let receivedBooks!: Book[];
    service.getAll().subscribe(books => receivedBooks = books);

    // Request aus der Warteschlange holen
    const req = httpMock.expectOne(
      'https://api5.angular-buch.com/books');
    expect(req.request.method).toEqual('GET'); 

    // flush -- jetzt werden die Bücher emittiert
    req.flush(expectedBooks); 

    expect(receivedBooks).toHaveSize(2);
    expect(receivedBooks[0].isbn).toBe('111');
    expect(receivedBooks[1].isbn).toBe('222');
  });

  it('should throw a HttpErrorResponse on server errors', () => {

    let errorResponse!: HttpErrorResponse;

    service.getAll().subscribe({
      error: (error: any) => errorResponse = error
    });

    const req = httpMock.expectOne('https://api5.angular-buch.com/books');

    req.flush('Fehler!', {
      status: 500,
      statusText: 'Internal Server Error'
    });

    expect(errorResponse.status).toBe(500);
    expect(errorResponse.statusText).toBe('Internal Server Error');
  });

  afterEach(() => {
    // prüfen, ob kein Request übrig geblieben ist
    httpMock.verify();
  });
});
