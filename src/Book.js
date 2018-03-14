import React from 'react'
import PropTypes from 'prop-types'

//import PropTypes from 'prop-types'

class Book extends React.Component {
    static propTypes = {
        onShelfChange: PropTypes.func.isRequired
      }

    handleShelfChange = (book, shelf) =>
    {
        console.log('You passed a book?:', book);
        console.log('You passed a shelf?:', shelf);
        //TODO: send all of this up to parent element.
        this.setState({ [shelf]: shelf })

        this.props.onShelfChange(book, shelf);
    }

    render()
      {
          const { book } = this.props

          return(
          <div className="book">
            <div className="book-top">
            {book.imageLinks.thumbnail ? (
              <div className="book-cover" style={{ width:128, height: 193, backgroundImage:`url(${this.props.book.imageLinks.thumbnail})` }} ></div>
          ):(
              <div className="book-cover" style={{ width:128, height: 193, backgroundImage:`url()` }} ></div>
          )}

              {this.props.book.shelf ? (
                  <div className="book-shelf-changer">
                  <select value={this.props.book.shelf} onChange={(event) => this.handleShelfChange(book, event.target.value)}>
                   <option value="none" disabled>Move to...</option>
                   <option value="currentlyReading">Currently Reading</option>
                   <option value="wantToRead">Want to Read</option>
                   <option value="read">Read</option>
                   <option value="">None</option>
                 </select>
                 </div>
             ) : (
                 <div className="add-book-button">
                 <select value={this.props.book.shelf ? this.props.book.shelf : 'none'} onChange={(event) => this.handleShelfChange(book, event.target.value)}>
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                </select>
                </div>
            )}


            </div>
            <div className="book-title">{this.props.book.title}</div>
            <div className="book-authors">{this.props.book.authors}</div>
          </div>
        );
      }

  }

  export default Book
