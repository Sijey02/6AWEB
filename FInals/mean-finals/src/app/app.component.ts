import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'booksapp';
  //set the link of the based route
  readonly APIUrl="/api/books/";


  constructor(private http:HttpClient){
  }
  //initialize the books array
  books:any=[];

  // Form data
  newBook = { title: '', desc: '', price: '' };
  searchQuery = '';

  // Editing state
  editingBookId: string | null = null;
  editBook = { title: '', desc: '', price: '' };

  refreshBooks(){
    this.http.get(this.APIUrl+'GetBooks').subscribe({
      next: (data)=>{
        this.books=data;
      },
      error: (err)=>{
        console.error('Error fetching books:', err);
        alert('Error fetching books: ' + JSON.stringify(err));
      }
    })
  }

  ngOnInit(){
    this.refreshBooks();
  }

  addBook(){
    console.log('Adding book:', this.newBook);

    if(!this.newBook.title || !this.newBook.desc || !this.newBook.price){
      alert('Please fill in all fields');
      return;
    }

    var formData=new FormData();
    formData.append("title", this.newBook.title);
    formData.append("description", this.newBook.desc);
    formData.append("price", this.newBook.price.toString());

    this.http.post(this.APIUrl+'AddBook', formData).subscribe({
      next: (data)=>{
        alert(data);
        this.newBook = { title: '', desc: '', price: '' };
        this.refreshBooks()
      },
      error: (err)=>{
        console.error('Error adding book:', err);
        alert('Error adding book: ' + JSON.stringify(err));
      }
    })
  }

  deleteBook(id:any){
    this.http.delete(this.APIUrl+'DeleteBook?id='+id).subscribe({
      next: (data)=>{
        alert(data);
        this.refreshBooks()
      },
      error: (err)=>{
        console.error('Error deleting book:', err);
        alert('Error deleting book: ' + JSON.stringify(err));
      }
    })
  }

  // Search books
  searchBooks(){
    if(this.searchQuery.trim() === ""){
      this.refreshBooks();
      return;
    }
    this.http.get(this.APIUrl+'SearchBooks?query='+this.searchQuery).subscribe({
      next: (data)=>{
        this.books=data;
      },
      error: (err)=>{
        console.error('Error searching books:', err);
        alert('Error searching books: ' + JSON.stringify(err));
      }
    })
  }

  // Edit functionality
  startEdit(book: any){
    this.editingBookId = book.id;
    this.editBook = {
      title: book.title,
      desc: book.desc,
      price: book.price.toString()
    };
  }

  cancelEdit(){
    this.editingBookId = null;
    this.editBook = { title: '', desc: '', price: '' };
  }

  saveEdit(id: any, title: string, desc: string, price: string){
    var formData=new FormData();
    formData.append("id", id);
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("price", price.toString());
    this.http.put(this.APIUrl+'UpdateBook', formData).subscribe({
      next: (data)=>{
        alert(data);
        this.editingBookId = null;
        this.editBook = { title: '', desc: '', price: '' };
        this.refreshBooks()
      },
      error: (err)=>{
        console.error('Error updating book:', err);
        alert('Error updating book: ' + JSON.stringify(err));
      }
    })
  }
}

