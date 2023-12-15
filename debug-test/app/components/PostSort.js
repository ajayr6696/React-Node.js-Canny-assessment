import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchPosts, recountVotes } from '../actions/posts';
import { changeSort } from '../actions/sort';

import './css/_PostSort.css';

const Options = [
  {
    name: 'old',
    render: 'Old',
  },
  {
    name: 'top',
    render: 'Top',
  },
  {
    name: 'new',
    render: 'New',
  },
];

@connect(
  ({ sort }) => ({ sort }),
  (dispatch) => ({
    changeSort: (sort) => {
      dispatch(changeSort(sort));
      dispatch(fetchPosts({ sort }));
      return dispatch(recountVotes());
    },
  })
)
export default class PostSort extends Component {
  static propTypes = {
    changeSort: PropTypes.func,
    posts: PropTypes.object,
  };

  state = {
    menuOpen: false,
    selectedOption: 'Old', // Set the default selectedOption to 'Old'
  };

  onChangeSort = (sort, render) => {
    // On change, also set selectedOption to the chosen render value
    this.setState({ menuOpen: false, selectedOption: render}, () => {
      this.props.changeSort(sort);
    });
  };

  onOpenMenu = () => {
    if (this.state.menuOpen) {
      return;
    }

    this.setState({ menuOpen: true });
  };

  renderDropdown = () => {
    const { menuOpen } = this.state;
    if (!menuOpen) {
      return null;
    }

    const {
      sort: { sort },
    } = this.props;
    const sorts = Options.map((option) => {
      const className = 'option' + (option.name === sort ? ' selected' : '');
      // Render value of selected option is also sent, so that the value in the parent component is also changed
      return (
        <div className={className} key={option.name} onClick={() => this.onChangeSort(option.name, option.render)}>
          <div className="dot" />
          {option.render}
        </div>
      );
    });

    return (
      <div className="dropdown">
        <div className="sorts">
          <div className="sortHeader">Sort</div>
          {sorts}
        </div>
      </div>
    );
  };

  render() {
    // const {
    //   sort: { sort },
    // } = this.props;
    // const option = Options.find((option) => option.name === sort);
    const { selectedOption } = this.state; // To display the selected value from child component(function), this new state is used.
    return (
      <div className="postSort">
        <div className="text">Showing</div>
        <div className="selector" onClick={this.onOpenMenu}>
          <div className="selectedName">{selectedOption}</div>
          <div className="icon-chevron-down">v</div>
          {this.renderDropdown()}
        </div>
        <div className="text">posts</div>
      </div>
    );
  }
}
