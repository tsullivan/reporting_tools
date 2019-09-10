import React from 'react';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
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

export class Decoders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <h3>Decoders</h3>
        <EuiFlexGroup>
          <EuiFlexItem>
            <p>URL Decode: Paste Kibana App State or Reporting JobParams to get RISON</p>
            <DecodeForm decode={decodeUrl} buttonText="Decode" />
            <EuiSpacer />
          </EuiFlexItem>
          <EuiFlexItem>
            <p>JSON Decode: Paste RISON to get JSON</p>
            <DecodeForm decode={decodeRison} buttonText="Decode" />
            <EuiSpacer />
          </EuiFlexItem>
        </EuiFlexGroup>

        <h3>Encoders</h3>
        <EuiFlexGroup>
          <EuiFlexItem>
            <p>RISON Encode: Paste JSON to get RISON</p>
            <DecodeForm decode={encodeRison} buttonText="Encode" />
          </EuiFlexItem>
          <EuiFlexItem>
            <p>URL Encode: Paste RISON to get Kibana URL</p>
            <DecodeForm decode={encodeUrl} buttonText="Encode" />
          </EuiFlexItem>
        </EuiFlexGroup>
      </React.Fragment>
    );
  }
}
