import React from 'react';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';
import { splitEvery } from 'ramda';
import moment from 'moment-mini';

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
      page: 1,
    };
  }

  renderCell(issue, cell) {
    if (cell === 'labels') {
      return (
        <div>
          {
            issue.labels.map(label => (
              <div 
                className="badge badge-primary mx-1" 
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
    if (cell === 'created_at' || cell === 'updated_at') {
      return (
        <div>
          {moment(issue[cell]).fromNow()}
        </div>
      )
    }
    return (
      <div key={cell}>
        {issue[cell]} 
      </div>
    )
  }

  getPaginatedIssues = () => {
    const { issues } = this.props;
    return splitEvery(pageSize, issues);
  }

  changePage = (page) => {
    const paginatedIssues = this.getPaginatedIssues();
    if(page >= 1 && page <= paginatedIssues.length) {
      this.setState({ page: page });
    }
  }

  render() {
    const { issues } = this.props;
    const { page } = this.state;
    const paginatedIssues = this.getPaginatedIssues();
    const pageIssues = paginatedIssues[page - 1];

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
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='6'>
              <Menu floated='right' pagination>
                <Menu.Item as='a' icon onClick={() => this.changePage(page - 1)}>
                  <Icon name='chevron left' />
                </Menu.Item>
                {
                  paginatedIssues.map((issueGroup, index) => (
                    <Menu.Item 
                      as='a' 
                      active={index + 1 === page}
                      key={issueGroup[0].id}
                      onClick={() => this.changePage(index + 1)}
                    >
                      {index + 1}
                    </Menu.Item>
                  ))
                }
                <Menu.Item as='a' icon onClick={() => this.changePage(page + 1)}>
                  <Icon name='chevron right' />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
}

export default IssueTable;
