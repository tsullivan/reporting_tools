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

function encodeUrl({ inputValue }) {
  return encodeURIComponent(inputValue);
}

function decodeRison({ inputValue }) {
  try {
    const decodeObj = rison.decode(inputValue);
    return JSON.stringify(decodeObj);
  } catch (err) {
    return err;
  }
}

function encodeRison({ inputValue }) {
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
        <h3>Decoders</h3>
        <EuiFlexGroup>
          <EuiFlexItem>
            <p>URL Decode: Paste Kibana App State or Reporting JobParams to get RISON</p>
            <DecodeForm decode={decodeUrl} />
            <EuiSpacer />
          </EuiFlexItem>
          <EuiFlexItem>
            <p>JSON Decode: Paste RISON to get JSON</p>
            <DecodeForm decode={decodeRison} />
            <EuiSpacer />
          </EuiFlexItem>
        </EuiFlexGroup>

        <h3>Encoders</h3>
        <EuiFlexGroup>
          <EuiFlexItem>
            <p>RISON Encode: Paste JSON to get RISON</p>
            <DecodeForm decode={encodeRison} />
          </EuiFlexItem>
          <EuiFlexItem>
            <p>URL Encode: Paste RISON to get Kibana URL</p>
            <DecodeForm decode={encodeUrl} />
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
              <EuiText>
                {this.renderForms()}
              </EuiText>
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
}
