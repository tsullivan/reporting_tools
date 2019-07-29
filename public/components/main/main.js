import React from 'react';
import {
  EuiPage,
  EuiPanel,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import * as rison from 'rison';
import { DecodeForm } from './form';
import './forms.css';

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

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
                <h3>URL Decoder</h3>
                <EuiPanel>
                  <DecodeForm decode={decodeUrl} />
                </EuiPanel>
                <EuiSpacer />

                <h3>RISON Decoder</h3>
                <EuiPanel>
                  <DecodeForm decode={decodeRison} />
                </EuiPanel>
              </EuiText>
              <EuiSpacer />
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
}
