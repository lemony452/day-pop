"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { closeModal } from "@/lib/modal/modalSlice";
import { useRef } from "react";
import styles from "./Modal.module.css";
import { fat } from "@/app/layout";

export default function Modal() {
  const dialogRef = useRef();
  const dispatch = useAppDispatch();
  const { isOpen, content } = useAppSelector((state) => state.modal);

  if (isOpen) dialogRef.current?.showModal();
  else dialogRef.current?.close();

  return (
    <dialog open={isOpen} ref={dialogRef} className={styles["modal-container"]}>
      <p className={`${styles["modal-content"]} ${fat.variable}`}>{content}</p>
      <button
        onClick={() => {
          dialogRef.current.close();
          dispatch(closeModal());
        }}
      >
        close
      </button>
    </dialog>
  );
}
