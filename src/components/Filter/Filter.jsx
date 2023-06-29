import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Filter.module.css';

export class Filter extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const { value } = e.target;
    this.props.onChange(value);
  }

  render() {
    return (
      <>
        <h3>Find contact by name</h3>
        <input className={css.formInput} onChange={this.handleInputChange} />
      </>
    );
  }
}


Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
};
