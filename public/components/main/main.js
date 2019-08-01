import React from 'react';
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPageHeader,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import * as rison from 'rison';
import { DecodeForm } from './form';

function decodeUrl({ inputValue }) {
  return decodeURIComponent(inputValue);
}

function decodeRison({ inputValue }) {
  try {
    const decodeObj = rison.decode(inputValue);
    return JSON.stringify(decodeObj);
  } catch (err) {
    return err;
  }
}

function decodeJSON({ inputValue }) {
  try {
    const jsonObj = JSON.parse(inputValue);
    return rison.encode(jsonObj);
  } catch (err) {
    return err;
  }
}

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderForms() {
    return (
      <React.Fragment>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiText>
              <h3>URL Decoder</h3>
              <p>Paste Kibana App State or Reporting JobParams to get RISON</p>
              <DecodeForm decode={decodeUrl} />
              <EuiSpacer />
            </EuiText>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiText>
              <h3>JSON Decoder</h3>
              <p>Paste JSON to get RISON</p>
              <DecodeForm decode={decodeJSON} />
            </EuiText>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiText>
              <h3>RISON Decoder</h3>
              <p>Paste RISON to get JSON</p>
              <DecodeForm decode={decodeRison} />
              <EuiSpacer />
            </EuiText>
          </EuiFlexItem>
        </EuiFlexGroup>
      </React.Fragment>
    );
  }

  render() {
    return (
      <EuiPage className="reportingTools">
        <EuiPageBody>
          <EuiPageHeader>
            <EuiTitle size="l">
              <h1>Reporting Tools</h1>
            </EuiTitle>
          </EuiPageHeader>
          <EuiPageContent>
            <EuiPageContentBody>
              {this.renderForms()}
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
}
