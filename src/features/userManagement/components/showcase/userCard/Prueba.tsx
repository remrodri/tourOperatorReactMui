import ReactDOM from "react-dom/client";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Prueba() {

  const showSwal = () => {
    withReactContent(Swal).fire({
      title: <i>Input something</i>,
      input: "text",

    });
  };

  return (
    <>

    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<Prueba />);