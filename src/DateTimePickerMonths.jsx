var DateTimePickerMonths, React, moment;

React = require('react/addons');
classNames = require('classnames');

moment = require('moment');

DateTimePickerMonths = React.createClass({
  propTypes: {
    subtractYear: React.PropTypes.func.isRequired,
    addYear: React.PropTypes.func.isRequired,
    viewDate: React.PropTypes.object.isRequired,
    selectedDate: React.PropTypes.object,
    showYears: React.PropTypes.func.isRequired,
    setViewMonth: React.PropTypes.func.isRequired
  },
  renderMonths: function() {
    var classes, i, month, months, monthsShort;
    month = this.props.viewDate.month();
    monthsShort = moment.monthsShort();
    i = 0;
    months = [];
    while (i < 12) {
      classes = {
        month: true,
        'active': i === month && this.props.selectedDate && this.props.viewDate.year() === this.props.selectedDate.year()
      };
      months.push(<span key={i} className={classNames(classes)} onClick={this.props.setViewMonth}>{monthsShort[i]}</span>);
      i++;
    }
    return months;
  },
  render: function() {
    return (
    <div className="datepicker-months" style={{display: 'block'}}>
          <table className="table-condensed">
            <thead>
              <tr>
                <th className="prev" onClick={this.props.subtractYear}>‹</th>

                <th className="switch" colSpan="5" onClick={this.props.showYears}>{this.props.viewDate.year()}</th>

                <th className="next" onClick={this.props.addYear}>›</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan="7">{this.renderMonths()}</td>
              </tr>
            </tbody>
          </table>
        </div>
    );
  }
});

module.exports = DateTimePickerMonths;
