import React from 'react';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiFieldText,
  EuiTextArea,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiLoadingSpinner,
} from '@elastic/eui';
import { kfetch } from 'ui/kfetch';

export class Performance extends React.Component {
  constructor(props) {
    super(props);

    this.state = { testUrl: '', isLoading: false, resultText: null };

    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onClickClear = this.onClickClear.bind(this);
  }

  async sendRequest() {
    this.setState(() => ({ isLoading: true }));

    let result;
    const testUrl = this.state.testUrl;
    try {
      result = await kfetch({
        pathname: '/api/reporting-performance/run',
        method: 'POST',
        body: JSON.stringify({ 'test_url': testUrl }) // prettier-ignore
      });
    } catch (err) {
      this.setState(() => ({ resultText: err.toString() }));
      return;
    }

    this.setState(() => ({
      isLoading: false,
      resultText: JSON.stringify(result),
    }));
  }

  onChangeUrl(value) {
    const targetText = value.target.value;
    this.setState(() => ({
      testUrl: targetText,
    }));
  }

  onClick() {
    this.sendRequest();
  }

  onClickClear() {
    this.setState(() => ({ resultText: '' }));
  }

  renderSpinner() {
    if (this.state.isLoading) {
      return <EuiLoadingSpinner size="m" />;
    }
    return null;
  }

  render() {
    return (
      <React.Fragment>
        <h3>Performance</h3>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiForm>
              <EuiFormRow label="Test URL" helpText="A share link to a dashboard">
                <EuiFieldText
                  placeholder="URL"
                  value={this.state.value}
                  onChange={this.onChangeUrl}
                />
              </EuiFormRow>

              <EuiSpacer />

              <EuiFormRow>
                <React.Fragment>
                  <EuiButton type="submit" fill onClick={this.onClick}>
                    Start test
                  </EuiButton>
                  &nbsp;&nbsp;
                  <EuiButton color="secondary" type="submit" onClick={this.onClickClear}>
                    Clear result
                  </EuiButton>
                  &nbsp;&nbsp;
                  {this.renderSpinner()}
                </React.Fragment>
              </EuiFormRow>

              <EuiSpacer />

              <EuiFormRow label="Result">
                <EuiTextArea value={this.state.resultText || ''} readOnly />
              </EuiFormRow>
            </EuiForm>
          </EuiFlexItem>
        </EuiFlexGroup>
      </React.Fragment>
    );
  }
}
