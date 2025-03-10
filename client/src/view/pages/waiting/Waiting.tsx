import React from "react";
import styles from "./waiting.module.scss";
import { useWaitingRoomVM } from "./WaitingVM";

const WaitingRoom: React.FC = () => {
  const { status, error, loading } = useWaitingRoomVM();

  return (
    <div className={styles.container}>
      <h1>Waiting Room</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <p>
          {status === "waiting"
            ? "Your account is under review. Please wait for admin approval."
            : `Current status: ${status}`}
        </p>
      )}
    </div>
  );
};

export default WaitingRoom;
