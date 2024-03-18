import { useState } from "react";
import styles from "./contacts-form.module.css";
import { nanoid } from "nanoid";

const INITIAL_STATE={
    name: '',
    number: '',   
}

const ContactsForm =({onSubmit})=> {
    const [state, setState] = useState({...INITIAL_STATE});

    const handleChange = ({target}) => {
    const {name, value}=target;
    setState({
        ...state,
        [name]:value,
    })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({...state});
        reset();
    }
    const reset = () => {
        setState({...INITIAL_STATE})
    }

    const contactNameId=nanoid();
    const contactNumberId=nanoid();
        
    const {name,number}=state;

        return (

            <form onSubmit={handleSubmit} className={styles.form} >
                <div className={styles.formElement} >
                    <label className={styles.formLabel} htmlFor={contactNameId}>Name</label>
                    <input 
                    className={styles.formInput} 
                    value={name} 
                    type="text" 
                    name="name" 
                    required   
                    id={contactNameId} 
                    onChange={handleChange} 
                    />
                </div>
                <div className={styles.formElement}>
                    <label className={styles.formLabel} htmlFor={contactNumberId}>Number</label>
                    <input 
                    className={styles.formInput} 
                    value={number} 
                    type="tel" 
                    name="number" 
                    required   
                    id={contactNumberId} 
                    onChange={handleChange}
                    />
                </div>
                <button 
                className={styles.formButton} 
                type="submit">
                    Add contact
                </button>
            </form>
        );
    }

 
export default ContactsForm;