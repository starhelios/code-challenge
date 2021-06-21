import React from 'react';

export default class SecretValue extends React.Component {
  defaultProps = {
    contentVisible: true,
    disabled: false
  };

  state = {
    contentVisible: true
  };

  componentDidMount() {
    this.props.fetchUserSettings().then(data => {
      this.setState({ contentVisible: !data.secretValuesHidden });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.contentVisible !== this.props.contentVisible) {
      this.setState({ contentVisible: nextProps.contentVisible });
    }
  }

  // 123456789 -> 123 - 456 - 789
  formatValue(value) {
    return [...value]
      .reduce((acc, ch, i) => {
        if ((i + 1) % 3 === 0) {
          return acc + ' - ' + ch;
        } else {
          return acc + ch;
        }
      })
      .trim();
  }

  toggleContentVisible() {
    if (!this.props.disabled) {
      this.setState({ contentVisible: !this.state.contentVisible });
    }
  }

  render() {
    const { contentVisible } = this.state;
    const { content } = this.props;

    return (
      <span
        style={{
          margin: 12,
          paddingTop: 6,
          paddingBottom: 6,
          paddingLeft: 12,
          paddingRight: 12,
          background: '#2D78A9',
          color: 'hsl(0, 0%, 10%)'
        }}
        onClick={this.toggleContentVisible}
      >
        {contentVisible ? this.formatValue(content) : '* * * *'}
      </span>
    );
  }
}
