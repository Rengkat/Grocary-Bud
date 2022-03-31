import React, { useEffect } from "react";

function Alert({ mesg, removeAlert, list }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);
  return (
    <div>
      <p>{mesg}</p>
    </div>
  );
}

export default Alert;
