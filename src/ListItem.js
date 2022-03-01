import "./ListItem.css";
import TextareaAutosize from "react-textarea-autosize";
import ListButton from "./ListButton";
import { useState } from "react";

function ListItem({
  item,
  index,
  listItems,
  setListItems,
  generateKey,
  hasButton,
}) {
  const [animateStrikethrough, setAnimateStrikethrough] = useState(false);
  const [timeoutID, setTimeoutID] = useState(undefined);
  const [isLeaving, setIsLeaving] = useState(false);

  const onTextAreaUpdate = (textAreaIndex) => {
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

  const onTextAreaBlur = (textAreaIndex) => {
    return (event) => {
      if (
        textAreaIndex !== listItems.length - 1 &&
        event.target.value === "" &&
        listItems.length !== 1
      ) {
        setIsLeaving(true);
        removeListItem(item.key);
      }
    };
  };

  const removeListItem = (key) => {
    setTimeout(() => {
      setListItems((curListItems) => {
        return curListItems.filter((element) => element.key !== key);
      });
    }, 1000);
  };

  const onButtonClickFn = () => {
    setAnimateStrikethrough(true);
    setTimeoutID(
      setTimeout(() => {
        setIsLeaving(true);
        removeListItem(item.key);
      }, 1000)
    );
  };

  const onButtonUnclickFn = () => {
    clearTimeout(timeoutID);
    setAnimateStrikethrough(false);
  };

  return (
    <div className={isLeaving ? "listItemParent leaving" : "listItemParent"}>
      <ListButton
        onClickFn={onButtonClickFn}
        onUnclickFn={onButtonUnclickFn}
        invisible={!hasButton}
        leaving={isLeaving}
      />
      <TextareaAutosize
        placeholder="New item..."
        onChange={onTextAreaUpdate(index)}
        onBlur={onTextAreaBlur(index)}
        defaultValue={item.text}
        className={animateStrikethrough ? "strikethroughText" : undefined}
      />
    </div>
  );
}

export default ListItem;
