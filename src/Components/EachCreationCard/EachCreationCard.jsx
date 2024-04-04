import React from "react";
import styles from "./EachCreationCard.module.css";
const EachCreationCard = (props) => {
 return (
   <div
     className={styles.cardContainer}
     style={{ backgroundColor: props.cardData.bgColor }}
   >
     <p className={styles.titleText} >{props.cardData.title}</p>
     <p className={styles.subTitleText}>{props.cardData.subTitle}</p>
   </div>
 );
};


export default EachCreationCard;



