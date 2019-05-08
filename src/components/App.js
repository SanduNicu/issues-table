import React from 'react';

const url = 'https://api.github.com/repos/facebook/react/issues';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
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

    promise.then(res => console.log(res))
  }

  render() {
    return (
      <div>
        Placeholder
      </div>
    );
  }
}

export default App;
