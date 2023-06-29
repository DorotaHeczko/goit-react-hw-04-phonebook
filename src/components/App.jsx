import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import css from './App.module.css';



export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Annie Copeland', number: '227-91-26' },
      { id: 'id-2', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-3', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-4', name: 'Eden Clements', number: '645-17-79' },
    ],
    filter: '',
  };


  
  newName = (name, number) => {
    const { contacts } = this.state;

    const newValue = contacts.map(contact => contact.name);

    if (newValue.includes(name)) {
      return alert(`${name} is already in contacts`);
    }

    const newContact = { id: nanoid(), name, number };
    const updatedContacts = [...contacts, newContact];

    this.setState({ contacts: updatedContacts });
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }
  //Aktualizacja
  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  listFilteredContacts = () => {
    const { contacts, filter } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return filteredContacts;
  };

  removeContact = id => {
    const { contacts } = this.state;

    const updatedContacts = contacts.filter(contact => contact.id !== id);

    this.setState({ contacts: updatedContacts });
  };

  updateFilter = newValue => {
    this.setState({
      filter: newValue,
    });
  };

  render() {
    return (
      <div className={css.box}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.newName} />

        <h2 className={css.title}>Contacts</h2>
        <Filter onChange={this.updateFilter} />
        <ContactList
          contacts={this.listFilteredContacts()}
          onClick={this.removeContact}
        />
      </div>
    );
  }
}
