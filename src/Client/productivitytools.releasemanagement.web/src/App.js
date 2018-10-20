import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class CalendarTable extends Component{
	
	constructor(props){
		super(props)
		
		this.getMonday=this.getMonday.bind(this);
		this.getDayNumber=this.getDayNumber.bind(this);
		
	}
	
	getMonday(d) {
		d = new Date(d);
		var day = d.getDay(),
		diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
		return new Date(d.setDate(diff));
	}

	getDayNumber(day,shift){
		var r=new Date(day.setDate(day.getDate() + shift)).getDate();
		return r;
	}
	
	render(){
		debugger;
		const {start,end}=this.props		
		let firstDayOfRange=this.getMonday(start)	
		const mondays=[];
		for (var d = new Date(firstDayOfRange); d <= new Date(end); d.setDate(d.getDate() + 7)) {
			mondays.push(new Date(d));
		}
			
				
		return(
			<table>
				<tr>
					<th>Monday</th>
					<th>Tuesday</th>
					<th>Wendesday</th>
					<th>Thursday</th>
					<th>Friday</th>
					<th>Saturday</th>
					<th>Sunday</th>
				</tr>
				{mondays.map((day)=>
				<tr>
							<td>{this.getDayNumber(day,0)}</td>
							<td>{this.getDayNumber(day,1)}</td>
							<td>{this.getDayNumber(day,1)}</td>
							<td>{this.getDayNumber(day,1)}</td>
							<td>{this.getDayNumber(day,1)}</td>
							<td>{this.getDayNumber(day,1)}</td>
							<td>{this.getDayNumber(day,1)}</td>
								
				</tr>)
				}
			</table>
		)
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
	  debugger;
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
            <CalendarTable start={calendar.start} end={calendar.end}/>
		:null}
        </header>
      </div>
    );
  }
}

export default App;
