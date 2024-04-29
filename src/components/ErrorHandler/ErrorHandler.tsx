"use client";

import type * as Fetcher from "@/robot/backendFetcher";

import { FC } from "react";
import styles from "./ErrorHandler.module.scss";

type ErrorHandlerProps = {
  error: Fetcher.ErrorWrapper<unknown> | Error;
};

const ErrorHandler: FC<ErrorHandlerProps> = ({ error }) => {
  if (!error) {
    return null; // or some default error message
  }

  let errorMessage = "An unexpected error occurred."; // Default message

  if (
    typeof error === "object" &&
    "status" in error &&
    error.status &&
    "payload" in error
  ) {
    switch (error.status) {
      case 401:
        errorMessage = `(${error.status}) Unauthorized: ${error.payload}`;
        break;
      case 404:
        errorMessage = `(${error.status}) Not Found: ${error.payload}`;
        break;
      default:
        errorMessage = `(${error.status}) Error (Status: ${error.status}): ${error.payload}`;
    }
  } else if (typeof error === "object" && "message" in error) {
    // Handle React Query or other standard errors
    errorMessage = `(400) ${error.message}`;
  }

  return <div className={styles.container}>{errorMessage}</div>;
};

export default ErrorHandler;
