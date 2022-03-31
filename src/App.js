import React, { useEffect, useState } from "react";
import Alert from "./component/alert";
import List from "./component/list";

const getlocalStorage = () => {
  const list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};
function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState(getlocalStorage());
  const [alert, setAlert] = useState({
    show: false,
    type: "",
    mesg: "",
  });
  const [isediting, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);

  //submiting input values
  const handleClick = (e) => {
    e.preventDefault();
    if (!input) {
      // display alert
      //calling the alert function
      showAler(true, "danger", "Please Enter an item");
    } else if (isediting && input) {
      // deal with edit
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, item: input };
          }
          return item;
        })
      );
      setEditID(null);
      setInput("");
      setIsEditing(false);
      showAler(true, "success", "Item edited");
    } else {
      //show success alter and add the item to the list
      //success alert
      showAler(true, "success", "Item added to the list");
      //add new item to list
      setList([
        ...list,
        {
          item: input,
          id: new Date().getTime().toString(),
        },
      ]);
      setInput("");
    }
  };
  //alert function
  const showAler = (show = false, type = "", mesg = "") => {
    setAlert({ show, type, mesg });
  };
  const handleClear = () => {
    setList([]);
    showAler(true, "danger", "Empty list");
  };
  //deleting item from list
  const handleDelet = (id) => {
    //alert fo deleting item
    showAler(true, "danger", "Item removed");
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };
  //editing item
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setEditID(id);
    setIsEditing(true);
    setInput(specificItem.item);
  };
  //perses to localstorege using useEffect
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <div className="w-full flex items-center justify-center h-screen bg-gray-300">
      <div className="w-1/3 shadow-lg py-5 rounded-md bg-white">
        {/* input form */}
        <form className="text-center">
          {/* condition rendering alert */}
          <div
            className={
              alert.type == "danger"
                ? "bg-red-300 text-red-600  w-1/2 mx-auto"
                : "bg-green-300 text-green-600 w-1/2 mx-auto"
            }>
            {alert.show && (
              <Alert {...alert} removeAlert={showAler} list={list} />
            )}
          </div>
          <h1 className="font-bold text-3xl py-2 capitalize">grocery bud</h1>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="E.g. Egg"
            className=" border-2 border-gray-400 shadow-ms py-2 px-3 rounded-md my-2"
          />

          <button
            onClick={handleClick}
            className=" border-2 text-white border-gray-400 bg-blue shadow bg-blue-400 hover:bg-blue-300 py-2 px-3 rounded-md">
            {isediting ? "Edit" : "Add"}
          </button>
        </form>
        {/* List go here */}
        <div className="listContainer">
          <List
            items={list}
            setList={setList}
            handleDelet={handleDelet}
            editItem={editItem}
          />
          <div className="text-center">
            <button
              onClick={handleClear}
              className="text-red-400 border-2 border-gray-400 shadow-ms hover:bg-red-300 hover:text-red-500 font-semibold py-2 px-3 rounded-md">
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
