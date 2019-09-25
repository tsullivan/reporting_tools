import React from 'react';
import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
} from '@elastic/eui';
import { kfetch } from 'ui/kfetch';

export class Schedulizer extends React.Component {
  constructor(props) {
    super(props);
    this.sendRequest = this.sendRequest.bind(this);
    this.state = {};
  }

  async sendRequest() {
    const list = await kfetch({
      pathname: '/api/reporting-performance/test',
      method: 'POST',
    });
  }

  render() {
    return (
      <React.Fragment>
        <h3>Test Headless</h3>
        <EuiFlexGroup>
          <EuiFlexItem grow={false}>
            <EuiButton onClick={this.sendRequest}>
              Run a Test
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </React.Fragment>
    );
  }
}
