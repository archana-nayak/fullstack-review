import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';

const RepoList = (props) => {
  {
    if ( props.repos.length === 0) {
      return (
        <div  className="table">
          <h4> Repo List Component</h4>
          There are {props.repos.length} repos.
        </div>
      );
  }}
  return (
    <div>
      <h4> Repo List Component </h4>
      {
        props.repos.map((repo) => {
          return <RepoListEntry repo={repo} key={repo.repo_id}/>
        })
      }
    </div>
  );
}

export default RepoList;

/* There are {props.repos.length} repos. */