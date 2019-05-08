import React from 'react';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';

const header = [
  'Issue Number',
  'Title',
  'Created at',
  'Updated at',
  'Labels',
  'State',
];

class IssueTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { issues } = this.props;
    console.log(issues);
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            {
              header.map(cell => (
                <Table.HeaderCell key={cell}>
                  {cell}
                </Table.HeaderCell>
              ))
            }
          </Table.Row> 
        </Table.Header>
      </Table>
    );
  }
}

export default IssueTable;
