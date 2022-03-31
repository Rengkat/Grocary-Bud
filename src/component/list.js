import { FaTrash, FaEdit } from "react-icons/fa";
import React from "react";

function List({ items, handleDelet, editItem }) {
  return (
    <div>
      {items.map((singleItem) => {
        const { id, item } = singleItem;
        return (
          <section
            key={id}
            className="flex w-5/6 mx-auto list-section border-2 border-grey-300 rounded-md  py-0.5 px-1 my-3">
            <main>
              <p className="text-2xl font-semibold">
                {item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
              </p>
            </main>
            <section className=" flex pt-2 text-lg">
              <FaEdit
                className="text-green-500 cursor-pointer"
                onClick={() => editItem(id)}
              />
              <FaTrash
                className="text-red-500 ml-1 cursor-pointer"
                onClick={() => handleDelet(id)}
              />
            </section>
          </section>
        );
      })}
    </div>
  );
}

export default List;
