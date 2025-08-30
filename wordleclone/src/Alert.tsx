import React, { useEffect, type ReactNode } from "react";
import { gameAction, useAppSelector } from "./store/index.ts";
import { useDispatch } from "react-redux";
import styles from "./Alert.module.css";


export default function Alert() {
    const alert = useAppSelector((s) => s.game.alert);
    const dispatch = useDispatch();

    useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => {
      dispatch(gameAction.clearAlert());
    }, 3000);
    return () => clearTimeout(timer);
    }, [alert, dispatch]);

    if (alert === undefined) return null;

    return (
    <>
      <div className={`${styles.Alert} alert alert-primary alert-dismissible`}>
        {alert}
        <button 
          type="button" 
          className="btn-close" 
          data-bs-dismiss="alert" 
          onClick={() => dispatch(gameAction.clearAlert())}>
          </button>
      </div>
    </>
    
  );

}
