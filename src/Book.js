import React from 'react'
import * as BooksAPI from './BooksAPI'

//import PropTypes from 'prop-types'

class Book extends React.Component {

    onDoAThing = (event) =>
    {
        BooksAPI.update(this.props.book, event).then(function(res){
            console.log('the res is: ',res);
        });
    }

    render()
      {
          const { book } = this.props.book

          console.log('Books props:', this.props);
          return(
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width:128, height: 193, backgroundImage:`url(${this.props.book.imageLinks.thumbnail})` }} ></div>
              <div className="book-shelf-changer">
                <select onChange={(event) => this.onDoAThing(event.target.value)}>
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

  export default Book
