import React, { Component } from 'react';
import './App.css';
import CalendarTable from './CalendarTable'

class ReleaseList extends Component{
	constructor(props){
		super(props)
	}
	
	render(){
		return(<div>pawel</div>);
	}
	
}



class App extends Component {
	
	constructor(props){
		super(props)
		
		this.state={
		calendar:null
		}
		
		this.fetchReleases=this.fetchReleases.bind(this);
		this.setReleases=this.setReleases.bind(this);
	}

  componentDidMount() {
    this.fetchReleases();
  }
  
  fetchReleases(){
	  fetch(`https://localhost:44372/api/calendar/`)
      .then(response => response.json())
      .then(result => this.setReleases(result))
      .catch(error => error);
  }
  
  setReleases(calendar){
	  this.setState({calendar})
  }
	
	
  render() {
	const {calendar}=this.state;
    return (
      <div className="App">
        <header className="App-header">
		{calendar?
			<div>
				<CalendarTable start={calendar.start} end={calendar.end} schedules={calendar.schedules}/>
				<ReleaseList/>
			</div>
		:null}
        </header>
      </div>
    );
  }
}

export default App;
