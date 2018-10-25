import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class SchedulesRows extends Component{


	constructor(props){
		super(props)
		
		this.dateDifferenceInDays=this.dateDifferenceInDays.bind(this)
	}
	
	dateDifferenceInDays(d1, d2){
		
		var timeDiff = Math.abs(d2.getTime() - d1.getTime());
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
		return diffDays;
	}
	
	render(){
		const {Schedules,WeekStart,WeekEnd}=this.props;
		
		console.log(Schedules)
		
		var rows=[]
		Schedules.forEach(schedule=>
		{
			
			let scheduleStart=new Date(schedule.start);
			let scheduleEnd=new Date(schedule.end);
			console.log(scheduleEnd,WeekStart);
			let beginSpan=this.dateDifferenceInDays(scheduleEnd,WeekStart);
			let fillAfter=7-beginSpan;
			if(beginSpan>0 && beginSpan<=7)
			{
				rows.push
				(
						<td colspan={beginSpan}>{beginSpan}</td>	
				)
				rows.push
				(
						<td colspan={fillAfter}>{fillAfter}</td>	
				)
			}
			
			
		})
		return(
			<tr>
				{rows}
			</tr>
		)
	}
}

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
		const {start,end, schedules}=this.props		
		let firstDayOfRange=this.getMonday(start)	
		const mondays=[];
		for (var d = new Date(firstDayOfRange); d <= new Date(end); d.setDate(d.getDate() + 7)) {
			mondays.push(new Date(d));
		}
		
		
		var rows=[]
		mondays.forEach(day=>
		{
			let weekStart=new Date(day);
			rows.push(
				
						<tr>
							<td>{this.getDayNumber(day,0)}</td>
							<td>{this.getDayNumber(day,1)}</td>
							<td>{this.getDayNumber(day,1)}</td>
							<td>{this.getDayNumber(day,1)}</td>
							<td>{this.getDayNumber(day,1)}</td>
							<td>{this.getDayNumber(day,1)}</td>
							<td>{this.getDayNumber(day,1)}</td>
						</tr>
			)
			let weekEnd=new Date(day);
			rows.push(<SchedulesRows Schedules={schedules} WeekStart={weekStart} WeekEnd={weekEnd}/>)
		})		
				
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
				{rows}
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
			<CalendarTable start={calendar.start} end={calendar.end} schedules={calendar.schedules}/>
		:null}
        </header>
      </div>
    );
  }
}

export default App;
