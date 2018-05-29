import React from 'react'
import PropTypes from 'prop-types'

class Book extends React.Component {
    static propTypes = {
        onShelfChange: PropTypes.func.isRequired,
        book: PropTypes.object.isRequired
      }

    state = {
        book: this.props.book
    }

    handleShelfChange = (book, newShelf) =>
    {
        book.shelf = newShelf;
        this.setState({ book: book});
        this.props.onShelfChange(this.state.book, newShelf);
    }

    render()
      {
          const { book } = this.state
          return(
          <div className="book">
            <div className="book-top">
              { book.imageLinks ? (
                  <div className="book-cover" style={{ width:128, height: 193, backgroundImage:`url(${ book.imageLinks.thumbnail})` }} ></div>
              ) : (
                  <div className="book-cover" style={{ width:128, height: 193, backgroundImage: `url('no_thumb.png')` }} ></div>                  
              )}
              { book.shelf ? (
                  <div className="book-shelf-changer">
                  <select value={ book.shelf} onChange={(event) => this.handleShelfChange(book, event.target.value)}>
                   <option value="none" disabled>Move to...</option>
                   <option value="currentlyReading">Currently Reading</option>
                   <option value="wantToRead">Want to Read</option>
                   <option value="read">Read</option>
                   <option value="">None</option>
                 </select>
                 </div>
             ) : (
                 <div className="add-book-button">
                 <select value={'none'} onChange={(event) => this.handleShelfChange(book, event.target.value)}>
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                </select>
                </div>
            )}
            </div>
            <div className="book-title">{ book.title}</div>
            { book.authors ? 
               book.authors.map( (author) => (
              <div className="book-authors">{ author }</div>)
            ):(
             <div className="book-authors">no author</div> 
            )}
              
            <div>{this.state.shelf}</div>
          </div>
        );
      }

  }

  export default Book
