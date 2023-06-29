import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";
import css from "./App.module.css";

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem("state")) || []
  );
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(contacts));
  }, [contacts]);

  const newName = (name, number) => {
    const existingContact = contacts.find((contact) => contact.name === name);
    if (existingContact) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newContact = { id: nanoid(), name, number };
    const updatedContacts = [...contacts, newContact];

    setContacts(updatedContacts);
  };

  const removeContact = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
  };

  const updateFilter = (newValue) => {
    setFilter(newValue);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={css.box}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={newName} />

      <h2 className={css.title}>Contacts</h2>
      <Filter onChange={updateFilter} />
      <ContactList contacts={filteredContacts} onClick={removeContact} />
    </div>
  );
};
