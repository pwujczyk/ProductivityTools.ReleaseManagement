import React, { Component } from 'react';


function isChecked() {
    return function (item) {
        return item.selected
        console.log("isChecked");
    }
}

class SchedulesRows extends Component {


    constructor(props) {
        super(props)

        this.dateDifferenceInDays = this.dateDifferenceInDays.bind(this)
        this.createRows = this.createRows.bind(this);
    }

    dateDifferenceInDays(d1, d2) {

        var timeDiff = d1.getTime() - d2.getTime();
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return diffDays;
    }


    createRows(Schedules, WeekStart, WeekEnd) {
        var rows = []
        var emptyWeek = [-1, -1, -1, -1, -1, -1, -1]
        var emptyWeekName = ['', '', '', '', '', '', '']
        Schedules.filter(isChecked()).forEach(schedule => {

            let scheduleStart = new Date(schedule.start);
            let scheduleEnd = new Date(schedule.end);
            let scheduleFirstDay = 7 - this.dateDifferenceInDays(WeekEnd, scheduleStart); //day inclusive
            let endSpan = this.dateDifferenceInDays(scheduleEnd, WeekStart) + 1;

            debugger;
            let maxI = 7;
            if (endSpan < 7) {
                maxI = endSpan;
            }
            for (var i = scheduleFirstDay; i <= maxI; i++) {
                emptyWeek[i - 1] = schedule.id;
                emptyWeekName[i - 1] = schedule.name;
            }

        })

        var cells = []
        let span = 1;
        for (var i = 0; i < 7; i++) {
            if (emptyWeek[i] == emptyWeek[i + 1]) {
                span++;
            }
            else {
                cells.push(<td colSpan={span}>{emptyWeekName[i]}</td>)
                span = 1;
            }
        }


        if (cells.length > 0) {
            rows.push
                (
                <tr>
                    {cells}
                </tr>
                )
        }
		
		
		 Schedules.filter(isChecked()).forEach(schedule => {
			var subSchedules=schedule.schedules;
			if (subSchedules != null)
			{
				var subScheduleRows=this.createRows(subSchedules,WeekStart,WeekEnd)
				rows.push(subScheduleRows)
			}

        })


        return rows;
    };

    render() {
        const { Schedules, WeekStart, WeekEnd } = this.props;

        console.log(Schedules)

        var rows = this.createRows(Schedules, WeekStart, WeekEnd)

        return (
            rows
        )
    }
}

class CalendarTable extends Component {

    constructor(props) {
        super(props)

        this.getMonday = this.getMonday.bind(this);
        this.getDayNumber = this.getDayNumber.bind(this);

    }

    getMonday(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }

    getDayNumber(day, shift) {
        var r = new Date(day.setDate(day.getDate() + shift)).getDate();
        return r;
    }

    render() {
        const { start, end, schedules } = this.props
        let firstDayOfRange = this.getMonday(start)
        const mondays = [];
        for (var d = new Date(firstDayOfRange); d <= new Date(end); d.setDate(d.getDate() + 7)) {
            mondays.push(new Date(d));
        }


        var rows = []
        mondays.forEach(day => {
            let weekStart = new Date(day);
            rows.push(

                <tr>
                    <td>{this.getDayNumber(day, 0)}</td>
                    <td>{this.getDayNumber(day, 1)}</td>
                    <td>{this.getDayNumber(day, 1)}</td>
                    <td>{this.getDayNumber(day, 1)}</td>
                    <td>{this.getDayNumber(day, 1)}</td>
                    <td>{this.getDayNumber(day, 1)}</td>
                    <td>{this.getDayNumber(day, 1)}</td>
                </tr>
            )
            let weekEnd = new Date(day);
            rows.push(<SchedulesRows Schedules={schedules} WeekStart={weekStart} WeekEnd={weekEnd} />)
        })

        return (
            <table>
                <tbody>
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
                </tbody>
            </table>
        )
    }
}


export default CalendarTable;