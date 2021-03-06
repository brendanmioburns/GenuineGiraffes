import React from 'react';

const SearchListItem = (props) => {
    return (
        <tr>
        <td className="mdl-data-table__cell--non-numeric">{props.book.title}</td>
            <td>{props.book.author}</td>
            <td>{props.book.yearPublished}</td>
            <td>{props.book.genre}</td>
            <td>{props.book.lang}</td>
            <td><img className="thumbnail" src={props.book.cover} style={{zoom: '25%'}}/></td>
            <td><i className="material-icons">headset</i></td>
            <td onClick={ () => { props.addBookToLibrary(props.book) } }><a className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></a></td>
        </tr>


    )
};



export default SearchListItem;
