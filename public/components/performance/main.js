import React from 'react';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
} from '@elastic/eui';

export class Performance extends React.Component {
  constructor(props) {
    super(props);

    this.state = { urlText: '' };

    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChangeUrl(value) {
    const targetText = value.target.value;
    this.setState(() => ({
      urlText: targetText
    }));
  }

  onClick() {
    // TODO post data
  }

  render() {
    return (
      <React.Fragment>
        <h3>Performance</h3>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiForm>
              <EuiFormRow label="Dashboard share link" helpText="I am some friendly help text.">
                <EuiFieldText
                  placeholder="URL"
                  value={this.state.value}
                  onChange={this.onChangeUrl}
                  aria-label="Use aria labels when no actual label is in use"
                />
              </EuiFormRow>

              <EuiSpacer />

              <EuiButton type="submit" fill onClick={this.onClick}>
                Start test
              </EuiButton>
            </EuiForm>
          </EuiFlexItem>
        </EuiFlexGroup>
      </React.Fragment>
    );
  }
}
