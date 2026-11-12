import React from "react"
import styles from "../styles/Statistics.module.css";

const Statistics = (props) => {
  let total_view = props.total_view;
  let total_day = props.total_day;
  return (
    <div className={styles['wrapper']} >
      <p style={{direction:'rtl'}}>  {total_view} {'  بازدید'}     </p>
      <p>
        |
      </p>

      {total_day == 0 ?
       <p style={{direction:'rtl'}}>  اولین  {'روز در بوملکس'} { ' ' }  </p>
       
        :
        <p style={{direction:'rtl'}}>  {total_day}  {'روز در بوملکس'} { ' ' }  </p>
      
      }
     
      
    </div>
  )
};

export default Statistics;
