import React from 'react';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';

class IssueTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { issues } = this.props;
    console.log(issues);
    return (
      <div>
        Placeholder
      </div>
    );
  }
}

export default IssueTable;
