import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import RepoListEntry from './components/RepoListEntry.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }

  componentDidMount() {
    console.log('in component did mount ', this);
    // this.setState({repos: data[0]});
  }
    
  

  search (term) {
    // var username = {term};
    console.log(`${term} was searched`);
    // console.log(JSON.stringify(username) +' was searched');

    $.ajax({
      type:'POST',
      url: '/repos',
      data: JSON.stringify({username: term}),
      contentType: 'application/json',
      success: (data) => {
        console.log(data[0]);
        this.setState({repos: data[0].Repos});
      },
      error: (error) => {
        console.log(error);
      }
    });
  }



  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/> 
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));