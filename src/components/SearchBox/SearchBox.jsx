import { useSelector, useDispatch } from "react-redux";
import setNewFilter from "../../redux/filtersSlice.js";

import styles from "./search-box.module.css";

const SearchBox = () => {
  const filter = useSelector((state) => state.filters.name);

  const dispatch = useDispatch();
  //запис значення інпуту фільтра в STORE
  const changeFilter = ({ target }) => dispatch(setNewFilter(target.value));

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
