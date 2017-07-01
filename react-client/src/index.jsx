import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import SearchList from './components/SearchList.jsx';
import Search from './components/Search.jsx';
import BookShelf from './components/BookShelf.jsx';
import ModalSearchList from './components/ModalSearchList.jsx';
import ModalBookOnShelf from './components/ModalBookOnShelf.jsx';
import Boron from 'boron';
import Modal from 'boron/OutlineModal';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchedBooks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      modalSearchListOpen: false,
      modalBookOnShelfOpen: false,
      libraryBooks: [{title: 'BlahBlah'}]
    }
    this.addBookToLibrary = this.addBookToLibrary.bind(this);
    this.deleteBookFromLibrary = this.deleteBookFromLibrary.bind(this);
    this.fetchLibraryBooks = this.fetchLibraryBooks.bind(this);
    this.search = this.search.bind(this);
    this.showModalSearchList = this.showModalSearchList.bind(this);
    this.showModalBookOnShelf = this.showModalBookOnShelf.bind(this);
  }

  showModalSearchList(){
    this.setState({
      modalSearchListOpen: true,
      modalBookOnShelfOpen: false
    })
  }

  showModalBookOnShelf(){
    this.setState({
      modalSearchListOpen: false,
      modalBookOnShelfOpen: true
    })
  }

  hideModal(){
    this.refs.modal.hide();
  }

  search(term) {
    console.log(`Submitting POST request...Searching ${term}...`)
    axios.post('/book/import', { q: term })
      .then((res) => {
        const books = res.data.books;
        const searchedBooks = [];
        books.map((book) => {
          var bookObject = {
            //isbn: book.isbn,
            title: book.title,
            author: book.authors[0].first_name + ' ' + book.authors[0].last_name,
            cover: book.cover,
            yearPublished: book.copyright_year,
            content: book.url_text_source,
            audio: book.url_librivox,
            totaltime: book.totaltime,
            //numPages: book.,
            lang: book.language,
            genre: book.genre,
            description: book.description
          };
          console.log(bookObject);
          searchedBooks.push(bookObject);
        });

        return this.setState({
          searchedBooks: searchedBooks
        });

        //console.log(books);
      })
      .then(() => {
        console.log('Set the book state!', this.state.searchedBooks)
      })
      .catch((err) => {
        console.log('ERROR: ', err);
      });
  }

  addBookToLibrary(book) {
    console.log('Your book...', book)
    console.log('Submitting POST request...Adding book to library...')
    axios.post('/library', { 'book': book })
      .then((res) => {
        console.log('POST successful! Added book to library!')
      })
      .catch((err) => {
        console.log('ERROR: ', err);
      });
  }

  deleteBookFromLibrary(book) {
    console.log('Submitting POST request...deleting book from library...');
    axios.post('/library', { 'book': book })
      .then((res) => {
        console.log('POST successful! Deleted book from library!');
      })
      .catch((err) => {
        console.log('ERROR: ', err);
      })
  }

  fetchLibraryBooks() {
    console.log('Submitting GET request...fetching all library books...')
    axios.get('/library')
      .then((res) => {
        console.log('GET successful! Got library books!')
      })
      .catch((err) => {
        console.log('ERROR: ', err);
      });
  }

  render() {
    return (
      <div>
        <h1 id="appTitle">PageTurner</h1>
        <h3 id="appSubtitle">The public-domain book manager app</h3>
        <BookShelf libraryBooks={this.state.libraryBooks}/>
        <button onClick={this.showModalSearchList}>Open ModalSearchList</button>
        <button onClick={this.showModalBookOnShelf}>Open ModalBookOnShelf</button>
        <ModalSearchList isOpen={this.state.modalSearchListOpen}/>
        <ModalBookOnShelf isOpen={this.state.modalBookOnShelfOpen}/>
        <Search onSearch={this.search} />
        <SearchList addBookToLibrary={this.addBookToLibrary} searchedBooks={this.state.searchedBooks} modal={this.state.isModalOpen} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
