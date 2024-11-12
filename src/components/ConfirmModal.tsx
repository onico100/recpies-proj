// ConfirmModal.tsx
import React from "react";
import styles from "@/styles/ConfirmModal.module.css";

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => (
  <div className={styles.overlay}>
    <div className={styles.modal}>
      <p>{message}</p>
      <button onClick={onConfirm} className={styles.confirmButton}>
        Confirm
      </button>
      <button onClick={onCancel} className={styles.cancelButton}>
        Cancel
      </button>
    </div>
  </div>
);

export default ConfirmModal;
