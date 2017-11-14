import React from 'react'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

import './App.css'


class Book extends React.Component {

    render()
      {
          console.log('Books props:', this.props);
          return(
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width:128, height: 193, backgroundImage:`url(${this.props.book.imageLinks.thumbnail})` }} ></div>
              <div className="book-shelf-changer">
                <select>
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{this.props.book.title}</div>
            <div className="book-authors">{this.props.book.authors}</div>
          </div>
        );
      }

  }



class BookList extends React.Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
  }

  state = {
    query: ''
  }
  render()
    {
        const { books } = this.props
        const { query } = this.state

        console.log('books', this.props.books);

        return (
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {books.filter( function (book) {
                    return (book.shelf === "currentlyReading") }).map( (book) => (
                  <li key={book.id}>
                  <Book book={book}/>
                  </li>))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {books.filter( function (book) {
                    return (book.shelf === "wantToRead") }).map( (book) => (
                  <li key={book.id}>
                  <Book book={book}/>
                  </li>))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">


              <ol className="books-grid">
              {books.filter( function (book) {
                  return (book.shelf === "read") }).map( (book) => (
                <li key={book.id}>
                <Book book={book}/>
            </li>))}
              </ol>

              </div>
            </div>
          </div>
        </div>
    )
    }
}

class BooksApp extends React.Component {

    state = {
      books: [],

    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  componentDidMount() {
      BooksAPI.getAll().then((books) => {
          this.setState({ books })
      })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (

          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <BookList books={this.state.books}/>

            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
