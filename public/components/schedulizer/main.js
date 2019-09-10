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
      pathname: '/api/reporting-schedulization/list-reports',
      method: 'GET',
    });
    console.log(list);
  }

  render() {
    return (
      <React.Fragment>
        <h3>Scheduling PDF</h3>
        <EuiFlexGroup>
          <EuiFlexItem grow={false}>
            <EuiButton onClick={this.sendRequest}>
              Send a test Request
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </React.Fragment>
    );
  }
}
