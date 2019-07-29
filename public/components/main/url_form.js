import React from 'react';
import PropTypes from 'prop-types';
import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiText,
  EuiTextArea,
} from '@elastic/eui';

const DECODE = 'decode';

export class UrlForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      outputValue: 'hello',
    };

    this.changeInput = this.changeInput.bind(this);
    this.codeRunner = this.codeRunner.bind(this);
  }

  changeInput({ target: { value } }) {
    this.setState(() => ({
      inputValue: value,
    }));
  }

  codeRunner(decodeOrEncode) {
    return () => {
      if (decodeOrEncode === DECODE) {
        this.setState(() => ({
          outputValue: decodeURI(this.state.inputValue),
        }));
      } else {
        this.setState(() => ({
          outputValue: encodeURI(this.state.inputValue),
        }));
      }
    };
  }

  render() {
    return (
      <EuiText>
        <h3>URL</h3>
        <EuiFlexGroup gutterSize="m">
          <EuiFlexItem grow={false}>
            <EuiTextArea value={this.state.inputValue} onChange={this.changeInput} />
            <EuiSpacer />
            <EuiTextArea value={this.state.outputValue} />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton size="s" onClick={this.codeRunner(DECODE)} >
              Decode
            </EuiButton>
            <EuiSpacer />
            <EuiButton size="s" onClick={this.codeRunner('encode')} >
              Encode
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem grow={true}>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiText>
    );
  }
}


UrlForm.propTypes = {
  input: PropTypes.instanceOf(Element),
  output: PropTypes.instanceOf(Element),
};
