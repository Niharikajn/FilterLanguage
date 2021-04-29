import React, { Component } from 'react';
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      finalData: [],
      value: ''
    }
  }

  componentDidMount() {
    fetch('https://www.mist-one.com/pub/languages')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ data: data.data.rows, finalData: data.data.rows });
      }
      )
  }

  updateLanguage = async (input) => {
    const getData = this.state.finalData;
    const filtered = this.state.data.filter(item => {
      return (item.languageNameEnglish.toLowerCase().includes(input.toLowerCase()) ||item.languageNameNative.toLowerCase().includes(input.toLowerCase()) ) 
    })
    this.setState({
      value: input,
      data: filtered
    });

    if (input.length === 0) {
      this.setState({ data: getData, value: input })
    }


  }

  render() {
    return (
      <div>
        <input type="text" placeholder="search"
          value={this.state.value}
          onChange={(e) => this.updateLanguage(e.target.value)} />
        {this.state.data && this.state.data.length > 0 ?
          <div className="container">
            {this.state.data.map((item, index) => {
              return (
                <>
                  {item.image ? <div key={index} className="lanContent">
                    <img src={item.image} alt="pic" />
                    <h3>{item.languageNameEnglish} ({item.languageNameNative})</h3>

                  </div>
                    : null}
                </>
              )
            })}
          </div>
          : <h2 class="NoResult">No Results Found</h2>}

      </div>
    );
  }
}

export default App;
