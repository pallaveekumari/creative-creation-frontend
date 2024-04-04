import React, { useEffect, useState } from "react";
import styles from "./Homepage.module.css";
import CreativeCreationDrawer from "../Components/CreativeCreationDrawer/CreativeCreationDrawer";
import CreativeList from "../Components/CreativeList/CreativeList";
var init = {
 title: "",
 subTitle: "",
 bgColor: "",
};
const Homepage = () => {
 const [drawerOpenStatus, setDrawerOpenStatus] = useState(false);
 const [formData, setFormData] = useState(init);
 const [creations, setCreations] = useState([]);
 const [colors, setColors] = useState([]);
 const [selectedColorInDrawer, setSelectedColorInDrawer] = useState("");
 const [formValid, setFormValid] = useState(false);
 const [filteredList, setFilteredList] = useState([]);
 const [colorFilterSelected, setColorFilterSelected] = useState("");
 const [textFilter, setTextFilter] = useState("");


 const handlegetColors = async () => {
   try {
     let res = await fetch(
       "https://random-flat-colors.vercel.app/api/random?count=5"
     );
     let data = await res.json();
     setColors(data.colors);
   } catch (err) {
     console.log("SOMETHING WENT WRONG");
   }
 };


 const handleChange = (e) => {
   const { name, value } = e.target;
   setFormData({ ...formData, [name]: value });
 };


 const handleCloseDrawer = () => {
   setDrawerOpenStatus(false);
   setFormData(init);
   setSelectedColorInDrawer("");
 };




 const handleSelectColorForFilter = (color) => {
   let updatedData = creations.filter((el, i) => {
     return (
       el.bgColor == color &&
       (el.title.toLowerCase().includes(textFilter.toLowerCase()) ||
         el.subTitle.toLowerCase().includes(textFilter.toLowerCase()))
     );
   });
   setFilteredList(updatedData);
 };


 const handleSubmitCreateCreationForm = (e) => {
   e.preventDefault();
   setCreations([...creations, formData]);
   setFilteredList([...creations, formData]);
   setTextFilter("");
   setColorFilterSelected("");
   setDrawerOpenStatus(false);
   setFormData(init);
   setSelectedColorInDrawer("");
 };


 const handleClearFilter = () => {
   setFilteredList(creations);
   setTextFilter("");
   setColorFilterSelected("");
 };


 useEffect(() => {
   handlegetColors();
 }, []);
 useEffect(() => {
   if (
     formData.title != "" &&
     formData.subTitle != "" &&
     formData.bgColor != ""
   ) {
     setFormValid(true);
   } else {
     setFormValid(false);
   }
 }, [formData]);
 return (
   <div className={styles.mainContainer}>
     <div
       className={styles.contentBox}
       style={{ width: drawerOpenStatus ? "70%" : "100%" }}
     >
       <div className={styles.filterByText}>Filter By</div>
       <div className={styles.filterBox}>
         <div className={styles.colorFilterBox}>
           <p className={styles.titleText}>Colors : </p>
           <div className={styles.colorsBox}>
             {colors.map((el, i) => {
               return (
                 <div
                   key={i}
                   style={{
                     backgroundColor: el,
                     border:
                       colorFilterSelected == el ? "3px solid purple" : "",
                   }}
                   onClick={() => {
                     setColorFilterSelected(el);
                     handleSelectColorForFilter(el);
                   }}
                   className={styles.eachColor}
                 ></div>
               );
             })}
           </div>
         </div>
         <div className={styles.colorFilterBox}>
           <p className={styles.titleText}>Title / Subtitle : </p>
           <input
             value={textFilter}
             onChange={(e) => {
               setTextFilter(e.target.value);
               let filter1 = creations.filter((el, i) => {
                 if (colorFilterSelected == "") {
                   return el;
                 } else {
                   return el.bgColor == colorFilterSelected;
                 }
               });
               let filter2 = filter1.filter((el, i) => {
                 if (e.target.value == "") {
                   return el;
                 } else {
                   return (
                     el.title
                       .toLowerCase()
                       .includes(e.target.value.toLowerCase()) ||
                     el.subTitle
                       .toLowerCase()
                       .includes(e.target.value.toLowerCase())
                   );
                 }
               });
               setFilteredList(filter2);
             }}
             type="text"
             className={styles.inputField}
             placeholder="search for title or subtitle"
           />
         </div>
         <p className={styles.clearFilterText} onClick={handleClearFilter}>
           clear filter
         </p>
       </div>
       <div className={styles.progressBarContainer}>
         <div className={styles.progressBarEmpty}>
           <div
             className={styles.filledProgress}
             style={{ width: `${(filteredList.length / 5) * 100}%` }}
           ></div>
         </div>{" "}
         {filteredList.length} / 5 Creatives
       </div>
       <div className={styles.createCreationButtonBox}>
         <button
           className={styles.createCreationButton}
           disabled={drawerOpenStatus || creations.length == 5}
           style={{
             opacity: drawerOpenStatus || creations.length == 5 ? "0.5" : "1",
             cursor:
               drawerOpenStatus || creations.length == 5
                 ? "not-allowed"
                 : "pointer",
           }}
           onClick={
             drawerOpenStatus
               ? null
               : () => {
                   setDrawerOpenStatus(true);
                 }
           }
         >
           + Add Creative
         </button>
       </div>
       <CreativeList filteredList={filteredList} />
     </div>
     <CreativeCreationDrawer
       handleCloseDrawer={handleCloseDrawer}
       drawerOpenStatus={drawerOpenStatus}
       handleChange={handleChange}
       handleSubmitCreateCreationForm={handleSubmitCreateCreationForm}
       formData={formData}
       colors={colors}
       setSelectedColorInDrawer={setSelectedColorInDrawer}
       setFormData={setFormData}
       setFormValid={setFormValid}
       selectedColorInDrawer={selectedColorInDrawer}
       formValid={formValid}
     />
   </div>
 );
};


export default Homepage;





