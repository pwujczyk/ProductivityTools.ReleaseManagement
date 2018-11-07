import React, { Component } from 'react';
import CalendarTable from './../CalendarTable'


class ReleaseList extends Component{
	constructor(props){
		super(props)
		this.releaseListClick=this.releaseListClick.bind(this);
		this.selectSchedule=this.selectSchedule.bind(this);
	}
	
	selectSchedule(schedule,selection){
		schedule.selected=selection;
		if(schedule.schedules !=null)
		{
			schedule.schedules.forEach(subSchedule=>
			{
				this.selectSchedule(subSchedule,selection)
			});
		}
		
	}
	
	releaseListClick(event){
		const {calendar}=this.props;
		var selection=event.target.checked;
		debugger;
		calendar.schedules.forEach(schedule=>
		{
			if(schedule.id==event.target.value)
			{

				this.selectSchedule(schedule,selection);
			}
		})
						debugger;	
		this.setState(calendar:calendar);
		console.log(event.target.value);
		console.log('handlechange')
  }
	
	render(){
		const {calendar}=this.props	
		debugger;
		return(
		<div class="container">
			<div class="scheduleList">
				{calendar.schedules.map(
						item=>
							<div>
								<input type="checkbox" value={item.id} onChange={this.releaseListClick} defaultChecked={item.selected}/>
								<label >{item.name}</label>
							</div>
					)
				}
			
			</div>
			<div class="calendarTable">
				<CalendarTable start={calendar.start} end={calendar.end} schedules={calendar.schedules}/>
			</div>
		</div>
		)
	}
}


export default ReleaseList;