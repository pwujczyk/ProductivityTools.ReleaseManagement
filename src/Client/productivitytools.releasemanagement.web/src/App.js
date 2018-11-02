import React, { Component } from 'react';
import './App.css';
import CalendarTable from './CalendarTable'
import ReleaseList from './ReleaseList'



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
	  let schedulesupdated=calendar.schedules.map((item)=>
	  {
		  return {
			  ...item, selected:(false)
		  }
	  });

	  this.setState({calendar:{...calendar, schedules:schedulesupdated}})
	  console.log("fdsa");
	  console.log(this.state)
  }
  
	
  render() {
	const {calendar}=this.state;
    return (
      <div className="App">
        <header className="App-header">
		{calendar?
			<div>
				<ReleaseList calendar={calendar}/>
			</div>
		:null}
        </header>
      </div>
    );
  }
}

export default App;
