import { Component } from 'react';
import css from './ContactList.module.css';
import PropTypes from 'prop-types';

export class ContactList extends Component {
  handleDelete = id => {
    const { value } = id.target;

    this.props.onClick(value);
  };

  render() {
    const { contacts } = this.props;

    return (
      <ul className={css.listItem}>
        {contacts.map(contact => {
          return (
            <li key={contact.id} className={css.listBox}>
              {contact.name}: {contact.number}
              <button
                type="submit"
                value={contact.id}
                onClick={this.handleDelete}
                className={css.button}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}

ContactList.propTypes = {
  onClick: PropTypes.func.isRequired,
};
