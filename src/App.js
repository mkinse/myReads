import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList'
import Book from './Book'
import './App.css'

class BooksApp extends React.Component {
    state = {
      books: [],
      foundBooks: [],
      query: ''
  }

  componentDidMount() {
          BooksAPI.getAll().then((books) => {
              console.log('Here are the books from cdu?:', books);
              this.setState({ books })
          })
  }

  loadBooks() {
    BooksAPI.getAll().then( allBooks => {
      this.setState({
        books: allBooks
      });
    });
  }

  handleShelfChange = (book, shelf) => {
      BooksAPI.update(book, shelf).then( result =>{
            this.loadBooks();
                })
  }

  searchForBooks = query => {
      this.setState({ ['foundBooks']: [] });
      console.log('query is:', query);
      BooksAPI.search(query, 20).then(
          searchResult => {
              if(searchResult.error)
              {
                  console.log('error????', searchResult);
                  this.setState({ foundBooks: [] })
              }else{
                    console.log('no error...', searchResult);
                   this.setState({ foundBooks: searchResult })
               }
            }, errorMsg => {
                console.log('error!', errorMsg);
                this.setState({ foundBooks: [] })
            })
          }

  updateQuery = (query) => {
      this.setState({ query: query.trim() });
      this.searchForBooks(query);
    }

  render() {
      const { query } = this.state
      const { books } = this.state
      const { foundBooks } = this.state

    return (
      <div className="app">

      <Route exact path='/search' render={({ history }) => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"
                    value={query}
                    onChange={(event) => this.updateQuery(event.target.value)}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {
                  foundBooks.length > 0 ?
                   foundBooks.map(book =>
                      <li key={book.id}>
                      <Book book={book} onShelfChange={this.handleShelfChange}/>
                      </li>
                )
                :
                    query ?
                        <div>No results found for '{query}'.</div>
                        :
                        <div>No results found.</div>
               }
              </ol>
            </div>
          </div>
      )}
      />

      <Route exact path='/' render={({ history }) => (
         <div className="list-books">
         <div className="list-books-title">
           <h1>MyReads</h1>
         </div>
         <BookList books={this.state.books} handleShelfChange={this.handleShelfChange} />
         <div className="open-search">
           <Link to='/search' >Add a book</Link>
         </div>
       </div>)}/>
      </div>
    )
  }
}

export default BooksApp
