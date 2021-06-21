import React from 'react';

export default class EventDetails extends React.Component {
  state = {
    isHidden: true
  };

  componentDidMount() {
    this.props.fetchUserSettings().then(data => {
      this.setState({ isHidden: data.secretValuesHidden });
    });
  }

  toggleValue() {
    this.setState({ isHidden: !this.state.isHidden });
  }

  copyToClipboard = () => {
    this.refs.hiddenInput.select();
    document.execCommand('copy');
  };

  chunkedPin(pin) {
    if (this.state.isHidden) {
      return <span onClick={this.toggleValue}>* * * *</span>;
    } else if (pin.length < 3) {
      return pin;
    } else {
      let chunked = '';
      pin.split('').forEach((char, i) => {
        if (chunked.length > 0 && chunked.length % 3 === 0) {
          chunked += ' - ';
        }
        chunked += char;
      });
      return <span onClick={this.copyToClipboard}>{chunked}</span>;
    }
  }

  render() {
    const { event } = this.props;
    const { type, guestName } = event;
    const pin = this.chunkedPin(event.pin);

    if (type === 'access_denied') {
      return (
        <span className="event">
          <input ref="hiddenInput" type="hidden" value={event.pin} />
          Access denied to guest {guestName}. Attempted PIN: {pin}
        </span>
      );
    }

    if (type === 'access_granted') {
      return (
        <span className="event">
          <input ref="hiddenInput" type="hidden" value={event.pin} />
          Access granted to guest {guestName}. PIN used: {pin}
        </span>
      );
    }

    return '(unknown event)';
  }
}
