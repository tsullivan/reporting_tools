import PropTypes from 'prop-types';
import React from 'react';
import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiTextArea,
} from '@elastic/eui';

export class DecodeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      outputValue: '',
    };

    this.changeInput = this.changeInput.bind(this);
    this.codeRunner = this.codeRunner.bind(this);
    this.clear = this.clear.bind(this);
  }

  changeInput({ target: { value } }) {
    this.setState(() => ({ inputValue: value }));
  }

  codeRunner() {
    const outputValue = this.props.decode(this.state);
    this.setState(() => ({ outputValue }));
  }

  clear() {
    this.setState(() => ({ outputValue: '' }));
  }

  render() {
    return (
      <EuiFlexGroup gutterSize="m">
        <EuiFlexItem grow={false}>
          <EuiTextArea value={this.state.inputValue} onChange={this.changeInput} />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton size="s" onClick={this.codeRunner}>Decode</EuiButton>
          <EuiButton size="s" onClick={this.clear}>Clear</EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={true}>
          <EuiTextArea value={this.state.outputValue} readOnly />
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }
}

DecodeForm.propTypes = {
  decode: PropTypes.func.isRequired,
};
