import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import Table from './Table';

const url = 'https://api.github.com/repos/facebook/react/issues';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      issues: {},
    };
  }

  componentDidMount() {
    this.fetchData()    
  }

  fetchData = () => {
    const promise = new Promise((res, rej) => {
      const xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
          res(xmlHttp.responseText)
      }
      xmlHttp.open("GET", url, true); // true for asynchronous 
      xmlHttp.send(null);
    })

    promise.then(res => {
      this.setState({ loading: false, issues: JSON.parse(res) })
    })
  }

  render() {
    const { loading, issues } = this.state;
    if (loading) {
      return "Loading..."; 
    }
    console.log(issues);
    return (
      <Table />
    );
  }
}

export default App;
