import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class CalendarTable extends Component{
	
	constructor(props){
		super(props)
		
		
	}
	
	getMonday(d) {
		d = new Date(d);
		var day = d.getDay(),
		diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
		return new Date(d.setDate(diff));
	}

	
	render(){
	
		var rows = [];
		debugger;
		var now = new Date();
		var daysOfYear = [];
		for (var d = new Date(2018, 0, 1); d <= now; d.setDate(d.getDate() + 1)) {
				let monday=d.getDate()
				let tuesday=new Date(d.setDate(d.getDate() + 1)).getDate();
				let wendesday=new Date(d.setDate(d.getDate() + 1)).getDate();
				let thursday=new Date(d.setDate(d.getDate() + 1)).getDate();
				let friday=new Date(d.setDate(d.getDate() + 1)).getDate();
				let saturday=new Date(d.setDate(d.getDate() + 1)).getDate();
				let sunday=new Date(d.setDate(d.getDate() + 1)).getDate();
			    rows.push(<tr>
							<td>{monday}</td>
							<td>{tuesday}</td>
							<td>{wendesday}</td>	
							<td>{thursday}</td>
							<td>{friday}</td>
							<td>{saturday}</td>
							<td>{sunday}</td>			
				</tr>)
				
				
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
				{rows}
			</table>
		)
	}
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CalendarTable/>
          </a>
        </header>
      </div>
    );
  }
}

export default App;
