import styles from './History.module.scss';
import React, {useState} from "react";
import { pastQueryState, clearHistory } from "../../Redux/historySlice";
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import Modal from "../../Components/Modals/Modal";
import {ReactComponent as Warning} from '../../Icons/warning.svg'
import QueryHistoryList from "../../Components/QueryHistoryList/QueryHistoryList";

const History = () => {

  const dispatch = useDispatch();
  let queryHistoryState = useSelector(pastQueryState);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={styles.historyInner}>
      <div className={styles.head}>
        <div className={styles.left}>
          <h2>Search History</h2>
          <p>The results of the questions you have asked are stored locally in your browser's history for 30 days.<br/>
          Click the export icon to generate a shareable link to a result set.</p>
        </div>
        <button 
          onClick={()=>setModalOpen(true)}
          className={styles.button}
          >
          Clear All
        </button>
      </div>
      <Modal 
        isOpen={modalOpen} 
        onClose={()=>setModalOpen(false)} 
        className={styles.modal} 
        containerClass={styles.modalContainer}
        hideCloseButton
        >
        <h6 className={styles.modalHeading}><Warning/>Warning!</h6>
        <p className={styles.warning}>This action cannot be undone.</p>
        <div className={styles.buttonContainer}>
          <button 
            className={styles.buttonOne}
            onClick={()=>{
              dispatch(clearHistory()); 
              setModalOpen(false);
            }}
            >
            Clear History
          </button>
          <button 
            className={styles.buttonTwo}
            onClick={()=>setModalOpen(false)}
            >
            Go Back
          </button>
        </div>
      </Modal>
        {
          queryHistoryState.length > 0 &&
          <QueryHistoryList />
        }
        {
          queryHistoryState.length <= 0 && 
          <div className={styles.noHistory}>
            <h6>No query history to show!</h6>
            <div className={styles.buttonContainer}>
              <Link to="/templates" className="primary button">Templated Queries</Link>
              <Link to="/build" className="primary button">Build Your Own</Link>
            </div>
          </div>
        }
    </div>
  );
}

export default History;