//Переписуємо компонент на хуки
import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";

import ContactsForm from "./ContactsForm/ContactsForm";
import ContactsList from "./ContactsList/ContactsList";
import Filter from "./Filter/Filter";

import styles from "./app.module.css";

const App = () => {
  
  const [contacts, setContacts] = useState (() => {
    const data=JSON.parse(localStorage.getItem("my-contacts"));
    return data || [];
  });

  const [filter, setFilter] = useState ("");
  const firstRender = useRef(true);

  useEffect(()=>{
    if(!firstRender.current){
      localStorage.setItem("my-contacts", JSON.stringify(contacts));
  }
  }, [contacts]);
  
useEffect (()=>{
  firstRender.current=false;
}, [])
  

//Перевіряємо на повтори контактів при введенні
  const isDublicate = ({name,number})=> {
    
    const normalizedName=name.toLowerCase();
    const normalizedNumber=number.toLowerCase();

    const dublicate=contacts.find(item=>{
      const normalizedCurrentName=item.name.toLowerCase();
      const normalizedCurrentNumber=item.number.toLowerCase();
      return (normalizedCurrentName === normalizedName || normalizedCurrentNumber === normalizedNumber );
    })
    return Boolean(dublicate);
    
  }


  const addContact = (data) => {
    if(isDublicate(data)) {
        return alert (`Contact with ${data.name} and ${data.number} already in list`)
    }
      
    const newContact={
      id:nanoid(),
      ...data,
    } 
    setContacts(prevContacts => [...prevContacts, newContact]) 

    }

  const deleteContact =(id)=>{
    setContacts(prevContacts =>prevContacts.filter(item => item.id !== id))
  }

  const changeFilter = ({target}) => setFilter(target.value);
  

  const getFilteredContacts = () => {
    if (!filter){
          return contacts;
        }
    
        const normalizedFilter=filter.toLowerCase();
    
        const filteredContacts = contacts.filter(({name}) => {
        const normalizedName=name.toLowerCase();
        return (normalizedName.includes(normalizedFilter))
    });
    return filteredContacts;
    }
  

    const items=getFilteredContacts();

    return (
        <div className={styles.wraper}>
        <h2 className={styles.title}>PhoneBook</h2>
        <ContactsForm onSubmit={addContact}/>

        <h2 className={styles.title}>Contacts</h2>
        <Filter changeFilter={changeFilter} filter={filter}/>
        <ContactsList items={items} deleteContact={deleteContact}/>
        </div>
 

    );
  }

 
export default App;