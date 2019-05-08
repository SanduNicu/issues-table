import React from 'react';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';
import { splitEvery } from 'ramda';

const header = [
  'Issue Number',
  'Title',
  'Created at',
  'Updated at',
  'Labels',
  'State',
];

const cells = [
  'number',
  'title',
  'created_at',
  'updated_at',
  'labels',
  'state',
]

const pageSize = 5;

class IssueTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
    };
  }

  renderCell(issue, cell) {
    if (cell === 'labels') {
      return (
        <div>
          {
            issue.labels.map(label => (
              <div 
                className="badge badge-primary" 
                style={{ backgroundColor: `#${label.color}` }}
                key={label.id}
              >
                {label.name}
              </div>
            ))
          }
        </div>
      ) 
    }
    return (
      <div key={cell}>
        {issue[cell]} 
      </div>
    )
  }

  render() {
    const { issues } = this.props;
    const { page } = this.state;
    const paginatedIssues = splitEvery(pageSize, issues);
    const pageIssues = paginatedIssues[page];
    console.log(paginatedIssues);

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
        <Table.Body>
          {
            pageIssues.map(issue => (
              <Table.Row key={issue.id}>
                {
                  cells.map(cell => (
                    <Table.Cell key={cell}>
                      {
                        this.renderCell(issue, cell)
                      }
                    </Table.Cell>
                  ))
                }
              </Table.Row>
            ))
          }
        </Table.Body>

      </Table>
    );
  }
}

export default IssueTable;
