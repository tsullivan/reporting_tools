import React from 'react';
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPanel,
  EuiTab,
  EuiTabs,
  EuiText,
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
} from '@elastic/eui';

import { Decoders } from './decoders';
import { Schedulizer } from './schedulizer';

export class Main extends React.Component {
  constructor(props) {
    super(props);

    this.tabs = [
      {
        id: 'schedulizer',
        name: 'PDF Schduling',
        disabled: false,
      },
      {
        id: 'decoders',
        name: 'Decoding Tools',
        disabled: false,
      },
    ];

    this.state = {
      selectedTabId: 'schedulizer',
    };
  }

  onSelectedTabChanged = id => {
    this.setState({
      selectedTabId: id,
    });
  };

  renderTabs() {
    return this.tabs.map((tab, index) => (
      <EuiTab
        {...tab.href && { href: tab.href, target: '_blank' }}
        onClick={() => this.onSelectedTabChanged(tab.id)}
        isSelected={tab.id === this.state.selectedTabId}
        disabled={tab.disabled}
        key={index}>
        {tab.name}
      </EuiTab>
    ));
  }

  renderSelectedTab() {
    if (this.state.selectedTabId === 'decoders') {
      return <Decoders/>;
    }
    return <Schedulizer/>;
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
              <EuiTabs>{this.renderTabs()}</EuiTabs>
              <EuiText>
                <EuiFlexGroup>
                  <EuiFlexItem>
                    <EuiPanel>
                      {this.renderSelectedTab()}
                    </EuiPanel>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiText>
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
}
