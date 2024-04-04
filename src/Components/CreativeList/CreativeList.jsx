import React from "react";
import styles from "./CreativeList.module.css";
import EachCreationCard from "../EachCreationCard/EachCreationCard";


const CreativeList = (props) => {
 return (
   <div className={styles.mainContainer}>
     {props.filteredList.map((el, i) => {
       return <EachCreationCard key={i} cardData={el} />;
     })}
   </div>
 );
};


export default CreativeList;



