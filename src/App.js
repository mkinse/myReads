import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList'
import LoadingOverlay from './LoadingOverlay'
import Book from './Book'
import './App.css'

class BooksApp extends React.Component {
    state = {
      books: [],
      foundBooks: [],
      query: '',
      isLoading: false
  }

  componentDidMount() {
          BooksAPI.getAll().then((books) => {
              this.setState({ books })
          })
  }

  loadBooks() {
     this.setState({isLoading: true});
     BooksAPI.getAll().then( allBooks => {
      this.setState({
        books: allBooks,
        isLoading: false
      });
    });
  }

  handleShelfChange = (book, shelf) => {
      this.setState({isLoading: true});
      BooksAPI.update(book, shelf).then( result =>{
            this.loadBooks();
            this.searchForBooks(this.state.query);
            this.setState({isLoading: false});
           })
  }

  searchForBooks = query => {
      if (query.length < 1)
      {
          this.setState({ foundBooks: [], isLoading: false })
          return
      }
      this.setState({isLoading: true});
      BooksAPI.search(query, 20).then(
          searchResult => {
              if(searchResult.error)
              {
                  this.setState({ foundBooks: [] })
              }else{
                  //compare all items in state.books with items in searchResult array
                  // if there's a match, add attributes from state.books to searchResult
                  // TODO: use ES6 to do this better

                  const allFoundBooks = searchResult.map( foundBook => {
                     let existingBook = this.state.books.find( savedBook =>  foundBook.id === savedBook.id )
                     if (existingBook)
                     {
                          foundBook.shelf = existingBook.shelf;
                     }
                     return foundBook;
                  })
                   this.setState({ foundBooks: allFoundBooks })
               }
               this.setState({isLoading: false});

            }, errorMsg => {
                this.setState({ foundBooks: [], isLoading: false })
            })
          }

  updateQuery = (queryValue) => {
      this.searchForBooks(queryValue);
      this.setState({ query: queryValue });
    }

  render() {
      const { query, isLoading } = this.state
      const { foundBooks } = this.state

    return (
      <div className="app">
      { this.state.isLoading && <LoadingOverlay/> }

      <Route exact path='/search' render={({ history }) => (
          
          <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"
                    value={ query }
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
         <BookList books={this.state.books} reloadShelves={this.handleShelfChange} />
         <div className="open-search">
           <Link to='/search' >Add a book</Link>
         </div>
       </div>)}/>
      </div>
    )
  }
}

export default BooksApp
