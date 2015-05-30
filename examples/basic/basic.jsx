var React = require('react/addons');
var DateTimeField = require('react-bootstrap-datetimepicker');
var moment = require('moment');

var Basic = React.createClass({

	render: function() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-xs-12">
						<h1>React Bootstrap DateTimePicker</h1>
						This project is a port of <a href="https://github.com/Eonasdan/bootstrap-datetimepicker">https://github.com/Eonasdan/bootstrap-datetimepicker</a> for React.js
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12">
						Default Basic Example
						<DateTimeField />
						<pre> {'<DateTimeField />'} </pre>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12">
						Example with custom placeholder
						<DateTimeField
							placeholder="Selecciona una fecha"
							/>
						<pre> {'<DateTimeField placeholder="Selecciona una fecha" />'} </pre>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12">
						ViewMode set to years view with custom inputFormat
						<DateTimeField
							inputFormat='DD-MM-YYYY'
							viewMode='years'
							/>
						<pre> {'<DateTimeField viewMode="years" inputFormat="DD-MM-YYYY" />'} </pre>
					</div>
				</div>
				<div className="row">
                    <div className="col-xs-12">
                        daysOfWeekDisabled
                        <DateTimeField
                            daysOfWeekDisabled={[0,1,2]}
                            />
                        <pre> {'<DateTimeField daysOfWeekDisabled={[0,1,2]} />'} </pre>
                    </div>
                </div>
				<div className="row">
                    <div className="col-xs-12">
                        Just time picker
                        <DateTimeField
                            mode="time"
                            />
                        <pre> {'<DateTimeField mode="time" />'} </pre>
                    </div>
				</div>
                <div className="row">
                    <div className="col-xs-12">
                        Just date picker
                        <DateTimeField
                            mode="date"
                            />
                        <pre> {'<DateTimeField mode="date" />'} </pre>
                    </div>
                </div>
				<div className="row">
					<div className="col-xs-12">
						minDate and maxDate
						<DateTimeField
							minDate={moment().add(2, 'months')}
							maxDate={moment().add(4, 'months')}
							/>
						<pre> {'<DateTimeField minDate={moment().add(2, "months")} maxDate={moment().add(4, "months")}/>'} </pre>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12">
						Clearable
						<DateTimeField
							clearable={true}
							/>
						<pre> {'<DateTimeField clearable={true} />'} </pre>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12">
						Empty
						<DateTimeField />
						<pre> {'<DateTimeField />'} </pre>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12">
						Initial Value
						<DateTimeField value="1432646785289" clearable={true}  />
						<pre> {'<DateTimeField value="1432646785289" clearable={true} />'} </pre>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12">
						Disables
						<DateTimeField disabled={true}/>
						<pre> {'<DateTimeField disabled={true} />'} </pre>
						<DateTimeField disabled={true} value="1432646535471"/>
						<pre> {'<DateTimeField disabled={true} />'} </pre>
					</div>
				</div>
			</div>
		);
	}
});



React.render(React.createFactory(Basic)(), document.getElementById('example'));
