import React, {Component} from 'react';

function format_date(now) {
  const dow = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const pad_zero = (num) => {
    if (num < 10) {
      return '0' + num;
    }

    return num;
  };

  const hour = now.getHours() < 13 ? now.getHours() : now.getHours() - 12;
  const ret = dow[now.getDay()] +
                ' ' + month[now.getMonth()] +
                ' ' + now.getDate() +
                ' ' + pad_zero(hour) +
                ':' + pad_zero(now.getMinutes());

  return ret;
}

class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateClass: new Date(),
    };

    this.time = format_date(this.state.dateClass);
  }

  setTime = () => {
    this.setState({
      dateClass: new Date(),
    });

    this.time = format_date(this.state.dateClass);
  };

  componentDidMount() {
    setInterval(this.setTime, 10000);
  }

  render() {
    return (
      <div>
        {this.time}
      </div>
    );
  }
}

export default Clock;
