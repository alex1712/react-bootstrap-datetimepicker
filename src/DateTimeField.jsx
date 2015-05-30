var DateTimeField, DateTimePicker, Glyphicon, React, moment;

React = require('react');
classNames = require('classnames');

DateTimePicker = require('./DateTimePicker');

moment = require('moment');

var Glyphicon = require('react-bootstrap').Glyphicon;

var Constants = require('./Constants');

DateTimeField = React.createClass({
  propTypes: {
    dateTime: React.PropTypes.string,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
    format: React.PropTypes.string,
    inputProps: React.PropTypes.object,
    inputFormat: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    mode: React.PropTypes.oneOf([Constants.MODE_DATE, Constants.MODE_DATETIME, Constants.MODE_TIME]),
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    clearable: React.PropTypes.bool,
    disabled: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      disabled: false,
      clearable: false,
      format: 'x',
      showToday: true,
      viewMode: 'days',
      daysOfWeekDisabled: [],
      mode: Constants.MODE_DATETIME,
      placeholder: "Select a date",
      onChange: function (x) {}
    };
  },
  getInitialViewDate: function(props) {
    props = props ? props : this.props;
    if (props.value) {
      return moment(props.value, props.format, true);
    } else if (props.minDate) {
      return props.minDate.clone().startOf("month");
    } else {
      return props.dateTime ? moment(props.dateTime, props.format, true).startOf("month") : moment().startOf("month");
    }
  },
  getInitialState: function() {
    return {
      showDatePicker: this.props.mode !== Constants.MODE_TIME,
      showTimePicker: this.props.mode === Constants.MODE_TIME,
      inputFormat: this.resolvePropsInputFormat(),
      buttonIcon: this.props.mode === Constants.MODE_TIME ? "time" : "calendar",
      widgetStyle: {
        display: 'block',
        position: 'absolute',
        left: -9999,
        zIndex: '9999 !important'
      },
      viewDate: this.getInitialViewDate(),
      selectedDate: this.props.value ? moment(this.props.value, this.props.format, true) : null,
      inputValue: this.props.value ?  moment(this.props.value, this.props.format, true).format(this.resolvePropsInputFormat()) : null
    };
  },
  componentWillReceiveProps: function(nextProps) {
    if(this.props.value !== nextProps.value) {
      return this.setState({
        viewDate: this.getInitialViewDate(nextProps),
        selectedDate: nextProps.value ? moment(nextProps.value, nextProps.format, true) : null,
        inputValue: nextProps.value ?  moment(nextProps.value, nextProps.format, true).format(this.resolvePropsInputFormat(nextProps)) : null
      });
    } else if(this.props.minDate !== nextProps.minDate) {
      return this.setState({
        viewDate: this.getInitialViewDate(nextProps)
      });
    }
  },
  resolvePropsInputFormat: function(props) {
    props = props ? props : this.props;
    if(props.inputFormat) return props.inputFormat;
    switch(props.mode) {
      case Constants.MODE_TIME:
        return "h:mm A";
      case Constants.MODE_DATE:
        return "MM/DD/YY";
      default:
        return "MM/DD/YY h:mm A";
    }
  },
  onChange: function(event) {
    var value = event.target == null ? event : event.target.value;
    if (moment(value, this.state.inputFormat, true).isValid()) {
      this.setState({
        selectedDate: moment(value, this.state.inputFormat, true),
        viewDate: moment(value, this.state.inputFormat, true)
      });
    }

    return this.setState({
      inputValue: value
    }, function() {
      return this.props.onChange(moment(this.state.inputValue, this.state.inputFormat, true).format(this.props.format));
    });

  },
  clearDate: function() {
    this.state.selectedDate = null;
    this.state.inputValue = null;
    this.state.viewDate = this.getInitialViewDate();
    this.forceUpdate(function() {
      this.props.onChange();
    });
  },
  getCurrentWorkingDate: function() {
    return this.state.selectedDate ? this.state.selectedDate.clone() : this.state.viewDate.clone();
  },
  setSelectedDate: function(e) {
    var target = e.target;
    if (target.className && !target.className.match(/disabled/g)) {
      var month;
      if(target.className.includes("new")) month = this.state.viewDate.month() + 1;
      else if(target.className.includes("old")) month = this.state.viewDate.month() - 1;
      else month = this.state.viewDate.month();
      return this.setState({
        selectedDate: this.state.viewDate.clone().month(month).date(parseInt(e.target.innerHTML)).hour(this.state.viewDate.hours()).minute(this.state.viewDate.minutes())
      }, function() {
        this.closePicker();
        this.props.onChange(this.getCurrentWorkingDate().format(this.props.format));
        return this.setState({
          viewDate: this.getCurrentWorkingDate(),
          inputValue: this.getCurrentWorkingDate().format(this.state.inputFormat)
        });
      });
    }
  },
  setSelectedHour: function(e) {
    return this.setState({
      selectedDate: this.getCurrentWorkingDate().clone().hour(parseInt(e.target.innerHTML)).minute(this.getCurrentWorkingDate().minutes())
    }, function() {
      this.closePicker();
      this.props.onChange(this.getCurrentWorkingDate().format(this.props.format));
      return this.setState({
        inputValue: this.getCurrentWorkingDate().format(this.state.inputFormat)
      });
    });
  },
  setSelectedMinute: function(e) {
    return this.setState({
      selectedDate: this.getCurrentWorkingDate().clone().hour(this.state.viewDate.hours()).minute(parseInt(e.target.innerHTML))
    }, function() {
      this.closePicker();
      this.props.onChange(this.state.selectedDate.format(this.props.format));
      return this.setState({
        inputValue: this.state.selectedDate.format(this.state.inputFormat)
      });
    });
  },
  setViewMonth: function(month) {
    return this.setState({
      viewDate: this.state.viewDate.clone().month(month)
    });
  },
  setViewYear: function(year) {
    return this.setState({
      viewDate: this.state.viewDate.clone().year(year)
    });
  },
  addMinute: function() {
    return this.setState({
      selectedDate: this.getCurrentWorkingDate().clone().add(1, "minutes")
    }, function() {
      this.props.onChange(this.getCurrentWorkingDate().format(this.props.format));
      return this.setState({
        inputValue: this.getCurrentWorkingDate().format(this.state.inputFormat),
        viewDate: this.getCurrentWorkingDate()
      });
    });
  },
  addHour: function() {
    return this.setState({
      selectedDate: this.getCurrentWorkingDate().clone().add(1, "hours")
    }, function() {
      this.props.onChange(this.getCurrentWorkingDate().format(this.props.format));
      return this.setState({
        inputValue: this.getCurrentWorkingDate().format(this.state.inputFormat),
        viewDate: this.getCurrentWorkingDate()
      });
    });
  },
  addMonth: function() {
    return this.setState({
      viewDate: this.state.viewDate.add(1, "months")
    });
  },
  addYear: function() {
    return this.setState({
      viewDate: this.state.viewDate.add(1, "years")
    });
  },
  addDecade: function() {
    return this.setState({
      viewDate: this.state.viewDate.add(10, "years")
    });
  },
  subtractMinute: function() {
    return this.setState({
      selectedDate: this.getCurrentWorkingDate().clone().subtract(1, "minutes")
    }, function() {
      this.props.onChange(this.getCurrentWorkingDate().format(this.props.format));
      return this.setState({
        inputValue: this.getCurrentWorkingDate().format(this.state.inputFormat),
        viewDate: this.getCurrentWorkingDate()
      });
    });
  },
  subtractHour: function() {
    return this.setState({
      selectedDate: this.getCurrentWorkingDate().clone().subtract(1, "hours")
    }, function() {
      this.props.onChange(this.getCurrentWorkingDate().format(this.props.format));
      return this.setState({
        inputValue: this.getCurrentWorkingDate().format(this.state.inputFormat),
        viewDate: this.getCurrentWorkingDate()
      });
    });
  },
  subtractMonth: function() {
    return this.setState({
      viewDate: this.state.viewDate.subtract(1, "months")
    });
  },
  subtractYear: function() {
    return this.setState({
      viewDate: this.state.viewDate.subtract(1, "years")
    });
  },
  subtractDecade: function() {
    return this.setState({
      viewDate: this.state.viewDate.subtract(10, "years")
    });
  },
  togglePeriod: function() {
    if (this.getCurrentWorkingDate().hour() > 12) {
      return this.onChange(this.getCurrentWorkingDate().clone().subtract(12, 'hours').format(this.state.inputFormat));
    } else {
      return this.onChange(this.getCurrentWorkingDate().clone().add(12, 'hours').format(this.state.inputFormat));
    }
  },
  togglePicker: function() {
    return this.setState({
      showDatePicker: !this.state.showDatePicker,
      showTimePicker: !this.state.showTimePicker
    });
  },
  onClick: function() {
    if(this.props.disabled) return;
    var classes, gBCR, offset, placePosition, scrollTop, styles;
    if (this.state.showPicker) {
      return this.closePicker();
    } else {
      this.setState({
        showPicker: true
      });
      gBCR = this.refs.dtpbutton.getDOMNode().getBoundingClientRect();
      classes = {
        "bootstrap-datetimepicker-widget": true,
        "dropdown-menu": true
      };
      offset = {
        top: gBCR.top + window.pageYOffset - document.documentElement.clientTop,
        left: gBCR.left + window.pageXOffset - document.documentElement.clientLeft
      };
      offset.top = offset.top + this.refs.datetimepicker.getDOMNode().offsetHeight;
      scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
      placePosition = this.props.direction === 'up' ? 'top' : this.props.direction === 'bottom' ? 'bottom' : this.props.direction === 'auto' ? offset.top + this.refs.widget.getDOMNode().offsetHeight > window.offsetHeight + scrollTop && this.refs.widget.offsetHeight + this.refs.datetimepicker.getDOMNode().offsetHeight > offset.top ? 'top' : 'bottom' : void 0;
      if (placePosition === 'top') {
        offset.top = -this.refs.widget.getDOMNode().offsetHeight - this.getDOMNode().clientHeight - 2;
        classes["top"] = true;
        classes["bottom"] = false;
        classes['pull-right'] = true;
      } else {
        offset.top = 40;
        classes["top"] = false;
        classes["bottom"] = true;
        classes['pull-right'] = true;
      }
      styles = {
        display: 'block',
        position: 'absolute',
        top: offset.top,
        left: 'auto',
        right: 40
      };
      return this.setState({
        widgetStyle: styles,
        widgetClasses: classes
      });
    }
  },
  closePicker: function(e) {
    var style;
    style = this.state.widgetStyle;
    style['left'] = -9999;
    style['display'] = 'none';
    return this.setState({
      showPicker: false,
      widgetStyle: style
    });
  },
  renderOverlay: function() {
    var styles = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: '999'
    };
    if (this.state.showPicker) {
      return (<div style={styles} onClick={this.closePicker} />);
    } else {
      return <span />;
    }
  },
  render: function() {
    return (
          <div>
            {this.renderOverlay()}
            <DateTimePicker ref="widget"
                  widgetClasses={this.state.widgetClasses}
                  widgetStyle={this.state.widgetStyle}
                  showDatePicker={this.state.showDatePicker}
                  showTimePicker={this.state.showTimePicker}
                  viewDate={this.state.viewDate}
                  selectedDate={this.state.selectedDate}
                  showToday={this.props.showToday}
                  viewMode={this.props.viewMode}
                  daysOfWeekDisabled={this.props.daysOfWeekDisabled}
                  mode={this.props.mode}
                  minDate={this.props.minDate}
                  maxDate={this.props.maxDate}
                  addDecade={this.addDecade}
                  addYear={this.addYear}
                  addMonth={this.addMonth}
                  addHour={this.addHour}
                  addMinute={this.addMinute}
                  subtractDecade={this.subtractDecade}
                  subtractYear={this.subtractYear}
                  subtractMonth={this.subtractMonth}
                  subtractHour={this.subtractHour}
                  subtractMinute={this.subtractMinute}
                  setViewYear={this.setViewYear}
                  setViewMonth={this.setViewMonth}
                  setSelectedDate={this.setSelectedDate}
                  setSelectedHour={this.setSelectedHour}
                  setSelectedMinute={this.setSelectedMinute}
                  togglePicker={this.togglePicker}
                  togglePeriod={this.togglePeriod}
            />
            <div className="input-group date" ref="datetimepicker">
              <input type="text" className="form-control" onChange={this.onChange} onFocus={this.onClick} disabled={this.props.disabled}
                     value={this.state.inputValue} placeholder={this.props.placeholder} {...this.props.inputProps}/>
              {
                  this.props.clearable && this.state.selectedDate && !this.props.disabled ?
                      <span className="input-group-clear" onClick={this.clearDate}>×</span> :
                      null
              }
              <span className="input-group-addon" onClick={this.onClick} onBlur={this.onBlur} ref="dtpbutton" disabled={this.props.disabled}>
                <Glyphicon glyph={this.state.buttonIcon} />
              </span>
            </div>
          </div>
    );
  }
});

module.exports = DateTimeField;
