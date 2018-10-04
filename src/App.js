import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';


const isSearched = searchTerm => item =>
item.title.toLowerCase().includes(searchTerm.toLowerCase());


class App extends Component {

  constructor(props){
    super(props);


  this.state = {
    result: null,
    searchTerm: DEFAULT_QUERY,
  };
  this.setSearchTopStories = this.setSearchTopStories.bind(this);
  this.onDismiss = this.onDismiss.bind(this);
  this.onSearchChange = this.onSearchChange.bind(this);
}

setSearchTopStories(result) {
  this.setState({ result });
}

componentDidMount() {
  const {searchTerm} = this.state;

  fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
  .then(response => response.json())
  .then(result => this.setSearchTopStories(result))
  .catch(error => error);
}

onDismiss = (id) => {
  const updatedList = this.state.list.filter( item => item.objectID !== id);
  this.setState({list: updatedList})
}

onSearchChange(event) {
  this.setState({ searchTerm: event.target.value})
}

  render() {
    const { searchTerm, result } = this.state;

    if(!result) { return null; }
    return (
      <div className="page">
        <div className="interactions">
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}
        >
          Search
        </Search>
      </div>
        <Table
          list={result.hits}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}


const Search = ({ value, onChange, children }) => {
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

const largeColumn = {
  width: '40%'
}

const midColumn = {
  width: '30%'
}

const smallColumn = {
  width: '10%'
}
const Table = ({onDismiss, pattern, list}) => {
    return(
      <div className="table">
      {list.filter(isSearched(pattern)).map(item =>
        <div key={item.objectID} className='table-row'>
          <span style={largeColumn}>
            <a href={item.url}>{item.title}</a>
          </span>
          <span style={midColumn}>{item.author}</span>
          <span style={smallColumn}>{item.num_comments}</span>
          <span style={smallColumn}>{item.points}</span>
          <span>
          <Button
            onClick={() => onDismiss(item.objectID)}
            className="button-inline"
            >
              Dismiss
            </Button>
          </span>
        </div>
      )
      }
    </div>
  )
}


const Button = ( {
      onClick,
      className = '', //make classname optional
      children
    } ) => {
    return (
      <button
        onClick={onClick}
        className={className}
        type="button"
        >{children}
      </button>
    );
  }





export default App;
