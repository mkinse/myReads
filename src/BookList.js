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

  handleShelfChange = (book, shelf) => {
      console.log('You added something to a shelf:', book);
      console.log('Here is the event:', shelf);
      this.props.handleShelfChange(book, shelf);
  }

  render()
  {
        const { books } = this.props

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
                  <Book book={book} onShelfChange={ this.handleShelfChange }/>
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
                  <Book book={book} onShelfChange={ this.handleShelfChange }/>
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
                <Book book={book} onShelfChange={ this.handleShelfChange } />
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
