"use client";

import { ToastContainer } from "react-toastify";
import { Tooltip } from "react-tooltip";

function SanctionClientComponents() {
  return (
    <>
      <ToastContainer />
      <Tooltip id="sanctiontooltip" />
    </>
  );
}

export default SanctionClientComponents;
