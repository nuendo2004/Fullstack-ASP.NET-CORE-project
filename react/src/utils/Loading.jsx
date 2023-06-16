import React from "react";
import styles from "./loading.module.css";

const Loading = () => {
  return (
    <section style={{ margin: "auto" }}>
      <div className={styles.loading_roll}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
};

export default Loading;
