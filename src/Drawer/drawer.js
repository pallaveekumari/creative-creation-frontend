document.addEventListener("DOMContentLoaded", function() {
    const openDrawerBtn = document.getElementById("openDrawerBtn");
    const closeDrawerBtn = document.getElementById("closeDrawerBtn");
    const drawer = document.getElementById("drawer");
  
    openDrawerBtn.addEventListener("click", function() {
      drawer.style.left = "0";
    });
  
    closeDrawerBtn.addEventListener("click", function() {
      drawer.style.left = "-300px";
    });
  });
  