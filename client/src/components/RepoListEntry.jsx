import React from 'react';


class RepoListEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="row">
        <div className="cell">{this.props.repo.repo_name}</div>
      </div>
    );
  }
}

export default RepoListEntry;