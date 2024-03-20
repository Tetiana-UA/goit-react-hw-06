import styles from "./search-box.module.css";

const SearchBox = ({ filter, changeFilter }) => {
  return (
    <div className={styles.filter}>
      <label className={styles.filterLabel}>Find contacts by name</label>
      <input
        className={styles.filterInput}
        onChange={changeFilter}
        value={filter}
        name="filter"
      />
    </div>
  );
};

export default SearchBox;
