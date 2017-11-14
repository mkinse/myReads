import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

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

export default BookList
