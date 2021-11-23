import React, { useState } from "react";
import styles from "../styles/FilterCard.module.css";

export default function FilterCard(props) {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <button onClick={() => setToggle(!toggle)} />
      {toggle && <div className={styles.card}>{props.children}</div>}
    </>
  );
}
