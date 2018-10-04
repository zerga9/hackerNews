import React, { Component } from 'react';
import './App.css';

const isSearched = searchTerm => item =>
item.title.toLowerCase().includes(searchTerm.toLowerCase());

const list = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: 3,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    objectID: 1,
  },
];

class App extends Component {

  constructor(props){
    super(props);


  this.state = {
    list,
    searchTerm: '',
  };
  this.onDismiss = this.onDismiss.bind(this);
  this.onSearchChange = this.onSearchChange.bind(this);
}

onDismiss = (id) => {
  const updatedList = this.state.list.filter( item => item.objectID !== id);
  this.setState({list: updatedList})
}

onSearchChange(event) {
  this.setState({ searchTerm: event.target.value})
}

  render() {
    const { searchTerm, list } = this.state;
    return (
      <div className="App">
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}
        >
          Search
        </Search>
        <Table
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}


class Search extends Component {
  render() {
    const { value, onChange, children } = this.props;
    return (
      <form>
        {children}
        <input type='text'
          value={value}
        onChange={onChange}
      />
      </form>
    );
  }
}

class Table extends Component {
  render() {
    const {onDismiss, pattern, list} = this.props;
    return(
      <div>
      {list.filter(isSearched(pattern)).map(item =>
        <div key={item.objectID}>
          <span>
            <a href={item.url}>{item.title}</a>
          </span>
          <span>{item.author}</span>
          <span>{item.num_comments}</span>
          <span>{item.points}</span>
          <span>
          <button
            onClick={() => onDismiss(item.objectID)}
            type="button"
            >
              Dismiss
            </button>
          </span>
        </div>
      )
      }
    </div>
  )

}
}




export default App;
