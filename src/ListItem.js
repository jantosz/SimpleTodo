import "./ListItem.css";
import TextareaAutosize from "react-textarea-autosize";

function ListItem({ item, index, listItems, setListItems, generateKey }) {
  const onTextAreaUpdate = (textAreaIndex) => {
    // to change: dont make it rerender on every update
    return (event) => {
      if (event.target.value === "") {
        return;
      }

      const newListItems = [...listItems];
      newListItems[textAreaIndex].text = event.target.value;

      if (textAreaIndex === listItems.length - 1) {
        newListItems.push({ text: "", key: generateKey() });
      }

      setListItems(newListItems);
    };
  };

  const onTextareBlur = (textAreaIndex) => {
    return (event) => {
      if (
        textAreaIndex !== listItems.length - 1 &&
        event.target.value === "" &&
        listItems.length !== 1
      ) {
        setListItems(
          listItems.filter((element, index) => index !== textAreaIndex)
        );
      }
    };
  };

  return (
    <div className="listItemParent">
      <TextareaAutosize
        placeholder="New item..."
        onChange={onTextAreaUpdate(index)}
        onBlur={onTextareBlur(index)}
        defaultValue={item.text}
      />
    </div>
  );
}

export default ListItem;
