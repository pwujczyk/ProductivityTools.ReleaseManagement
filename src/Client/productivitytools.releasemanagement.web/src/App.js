import React, { Component } from 'react';
import './App.css';
import CalendarTable from './CalendarTable'

class ReleaseList extends Component{
	constructor(props){
		super(props)
		
		this.handleChange=this.handleChange.bind(this);
	}
	
	handleChange(event){
		
	}
	
	render(){
		const {schedules,releaseListClick}=this.props	
		
		return(
		schedules.map(item=>
		<div>
			<input type="checkbox" value={item.id} onChange={releaseListClick} selected={item.selected}/>
			<label >{item.name}</label>
		</div>)
		);
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
		this.releaseListClick=this.releaseListClick.bind(this);
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
  
  releaseListClick(event){
	  debugger;
		const {calendar}=this.state;
		calendar.schedules.forEach(schedule=>
		{
			if(schedule.id==event.target.value)
			{
				debugger;
				schedule.selected=!event.target.selected;
			}
		})
		this.setState(calendar:{schedules:schedules});
		console.log(event.target.value);
		console.log('handlechange')
  }
	
	
  render() {
	const {calendar}=this.state;
    return (
      <div className="App">
        <header className="App-header">
		{calendar?
			<div>
				<CalendarTable start={calendar.start} end={calendar.end} schedules={calendar.schedules}/>
				<ReleaseList schedules={calendar.schedules} releaseListClick={this.releaseListClick}/>
			</div>
		:null}
        </header>
      </div>
    );
  }
}

export default App;
