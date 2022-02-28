import "./App.css";
import ListItem from "./ListItem.js";
import { useState, useRef, useEffect } from "react";

function App() {
  const [listItems, setListItems] = useState([{ text: "", key: 0 }]);
  const keyRef = useRef(0);

  useEffect(() => {
    const key = JSON.parse(localStorage.getItem("key"));
    const listItemsLocal = JSON.parse(localStorage.getItem("listItems"));

    if (key !== null) {
      keyRef.current = parseInt(key);
    }
    if (listItemsLocal !== null) {
      setListItems(listItemsLocal);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("listItems", JSON.stringify(listItems));
    localStorage.setItem("key", keyRef.current.toString());
  }, [listItems]);

  const generateKey = () => {
    const key = keyRef.current + 1;
    keyRef.current = key;
    return key;
  };

  return (
    <div className="App">
      <header>Simple To-Do</header>
      <form id="todo-form">
        {listItems.map((item, index) => (
          <ListItem
            item={item}
            index={index}
            listItems={listItems}
            setListItems={setListItems}
            generateKey={generateKey}
            key={item.key.toString()}
          />
        ))}
      </form>
    </div>
  );
}

export default App;
