import React, { Component } from 'react';
import CalendarTable from './../CalendarTable'


class ReleaseList extends Component{
	constructor(props){
		super(props)
		this.releaseListClick=this.releaseListClick.bind(this);
	}
	
	releaseListClick(event){
	  debugger;
		const {calendar}=this.props;
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
	
	render(){
		const {calendar}=this.props	
		
		return(
		<div class="container">
			<div class="scheduleList">
				{calendar.schedules.map(
						item=>
							<div>
								<input type="checkbox" value={item.id} onChange={this.releaseListClick} selected={item.selected}/>
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