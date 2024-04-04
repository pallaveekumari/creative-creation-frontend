import React from "react";
import styles from "./CreativeCreationDrawer.module.css";
const CreativeCreationDrawer = (props) => {
 return (
   <div
     className={styles.drawer}
     style={props.drawerOpenStatus ? { right: "0" } : { right: "-500px" }}
   >
     <div className={styles.headerContainer}>
       <div className={styles.drawerHeading}>Creative Creation</div>
       <div
         className={styles.drawerCloseButton}
         onClick={() => {
           props.handleCloseDrawer();
         }}
       >
         X
       </div>
     </div>
     <form
       className={styles.form}
       onSubmit={(e) => props.handleSubmitCreateCreationForm(e)}
     >
       <div className={styles.titleBox}>
         <p className={styles.titleText}>Title</p>
         <input
           onChange={(e) => props.handleChange(e)}
           name="title"
           className={styles.inputField}
           type="text"
           placeholder="enter title here"
           value={props.formData.title}
         />
       </div>
       <div className={styles.titleBox}>
         <p className={styles.titleText}>Subtitle</p>
         <input
           onChange={(e) => props.handleChange(e)}
           name="subTitle"
           className={styles.inputField}
           type="text"
           placeholder="enter subtitle here"
           value={props.formData.subTitle}
         />
       </div>
       <div className={styles.titleBox}>
         <p className={styles.titleText}>Background Color</p>
         <div className={styles.colorsBox}>
           {props.colors.map((el, i) => {
             return (
               <div
                 onClick={() => {
                   props.setSelectedColorInDrawer(el);
                   props.setFormData({ ...props.formData, bgColor: el });
                   if (
                     props.formData.title != "" &&
                     props.formData.subTitle != ""
                   ) {
                     props.setFormValid(true);
                   }
                 }}
                 key={i}
                 style={{
                   backgroundColor: el,
                   border:
                     props.selectedColorInDrawer == el
                       ? "3px solid purple"
                       : "",
                 }}
                 className={styles.eachColor}
               ></div>
             );
           })}
         </div>
       </div>
       <button
         type="submit"
         disabled={!props.formValid}
         className={styles.doneBtn}
         style={{
           cursor: !props.formValid ? "not-allowed" : "pointer",
           color: !props.formValid ? "gray" : "black",
         }}
       >
         Done
       </button>
     </form>
   </div>
 );
};


export default CreativeCreationDrawer;



