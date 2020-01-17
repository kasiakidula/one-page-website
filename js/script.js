/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function createSelect(select){
    var selElement, selectedItem, optionList, optionItem;
    
    for (let i = 0; i < select.length; i++) {
      selElement = select[i].getElementsByTagName("select")[0];
      /*for each element, create a new DIV that will act as the selected item:*/
      selectedItem = document.createElement("DIV");
      selectedItem.setAttribute("class", "select-selected");
      selectedItem.innerHTML = selElement.options[selElement.selectedIndex].innerHTML;
      select[i].appendChild(selectedItem);
      /*for each element, create a new DIV that will contain the option list:*/
      optionList = document.createElement("DIV");
      optionList.setAttribute("class", "select-items select-hide");
      /*for each option in the original select element,
        create a new DIV that will act as an option item:*/
      for (let j = 1; j < selElement.length; j++) {
        
        optionItem = document.createElement("DIV");
        optionItem.innerHTML = selElement.options[j].innerHTML;
        optionItem.addEventListener("click", function(e) {
            /*when an item is clicked, update the original select box,
            and the selected item:*/
            var y, k, s, h;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            h = this.parentNode.previousSibling;
            for (let i = 0; i < s.length; i++) {
              if (s.options[i].innerHTML == this.innerHTML) {
                s.selectedIndex = i;
                h.innerHTML = this.innerHTML;
                y = this.parentNode.getElementsByClassName("same-as-selected");
                for (k = 0; k < y.length; k++) {
                  y[k].removeAttribute("class");
                }
                this.setAttribute("class", "same-as-selected");
                break;
              }
            }
            h.click();
        });
        optionList.appendChild(optionItem);
      }
      select[i].appendChild(optionList);
      selectedItem.addEventListener("click", function(e) {
          /*when the select box is clicked, close any other select boxes,
          and open/close the current select box:*/
          e.stopPropagation();
          closeAllSelect(this);
          this.nextSibling.classList.toggle("select-hide");
          this.classList.toggle("select-arrow-active");
        });
    }
}

    function closeAllSelect(elmnt) {
      /*a function that will close all select boxes in the document,
      except the current select box:*/
      var selectItems, selectSelected, arrNo = [];
      selectItems = document.getElementsByClassName("select-items");
      selectSelected = document.getElementsByClassName("select-selected");
      for (let i = 0; i < selectSelected.length; i++) {
        if (elmnt == selectSelected[i]) {
          arrNo.push(i);
        } else {
          selectSelected[i].classList.remove("select-arrow-active");
        }
      }
      for (let i = 0; i < selectItems.length; i++) {
        if (arrNo.indexOf(i)) {
          selectItems[i].classList.add("select-hide");
        }
      }
    }

function scrollFunction(conMenu, menu, menuLinks, logo) {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        conMenu.classList.add("sticky_menu");
        menu.classList.add("menu_bar");
        menuLinks.classList.add("links_bar");
        logo.classList.add("logo_bar");
    }else{
        conMenu.classList.remove("sticky_menu");
        menu.classList.remove("menu_bar");
        menuLinks.classList.remove("links_bar");
        logo.classList.remove("logo_bar");
    }
  }
  
function showMenuMobile(conMenu, showMenu) {
    var style = conMenu.currentStyle || window.getComputedStyle(conMenu);
    if(style.marginTop === "-195px"){
        conMenu.style.marginTop = "0";
        showMenu = true;
    }else{
       conMenu.style.marginTop = "-195px"; 
       showMenu = false;
    }
   
   return showMenu;
}

function createTooltip(){
    var elementsWithTooltip = document.getElementsByClassName("tooltip");
   
    var tooltipContainer = document.createElement("div");
    tooltipContainer.id = "tooltopContainer";
    document.body.appendChild(tooltipContainer);
    
    var tmpTitles = [];
    
    for(var i = 0; i < elementsWithTooltip.length; i ++){
        tmpTitles[i] = elementsWithTooltip[i].title;
        elementsWithTooltip[i].tmpId = i;
        
        elementsWithTooltip[i].addEventListener("mouseover", function(e){
            tooltipContainer.innerHTML = this.title;
            this.title = "";
            
            tooltipContainer.style.left = e.clientX + document.documentElement.scrollLeft + 10 + "px";
            tooltipContainer.style.top = e.clientY + document.documentElement.scrollTop - 10 + "px";
            
            tooltipContainer.style.opacity = "1";
            tooltipContainer.style.transition = ".5s"; 
        });
        elementsWithTooltip[i].addEventListener("mouseout", function(){
            this.title = tmpTitles[this.tmpId];
            
            tooltipContainer.style.opacity = "0";
            tooltipContainer.style.transition = ".5s";
        });
    }
}
//check form
function checkNameOrSurname(value){
    var regex = /^[A-Za-z]+((\ |\-)?[A-Za-z]+)*$/;
    return regex.test(value);
}
    
function checkEmail(value){
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    return regex.test(value);
}
    
function checkText(value){
    var regex = /^([A-Za-z]|\d)+((\'|\,|\.|\!|\?|\-|:|\;|\(|\)|\<|\>)?(\s)?([A-Za-z]|\d)+)*(\.|\?|\!)*?$/;
    return regex.test(value);
}
    
function clearForm(form){
    for(let i = 0; i < form.length - 1; i++){
        form[i].value = "";
    }
}
    
function changeStyle(form){
    for(let i = 0; i < form.length - 1; i++){
        form[i].addEventListener("focus", function(){
            form[i].style.borderColor = "rgb(192,192,192)";
        });
    }
        
    for(let i = 0; i < form.length - 1; i++){
        form[i].addEventListener("blur", function(){
            form[i].style.borderColor = "rgb(224,224,224)";
        });
    }        
}
    
    function showMessage(isEverythingOK, infoForUser, offerSelected, form){
        var confirmation = document.getElementById("confirmation");
        var none_selected = document.getElementById("none_selected");
        
        if(isEverythingOK){
            confirmation.innerHTML = "<p class=\"success\">Your message has been sent.<br><br>" + infoForUser + "</p>";
            none_selected.style.display = "none";
            clearForm(form);
        }else{
            confirmation.innerHTML = "<p class=\"failure\">Form completed incorrectly.<br>Please, check your answers.<br>In your texts do not use characters: @, #, $, %, ^, & , *, {, }, [, ].</p>";
            
            if(!offerSelected){
                none_selected.style.display = "block";
                none_selected.innerHTML = "<p class=\"failure\">Choose offer<\p>";
            }
            
            changeStyle(form);
        }
    }
    
    function checkForm(form){
        var correct = true;
        var isEverythingOK = true;
        var infoForUser = "";
        var offerSelected = true;
        var value = "";
        
        for(let i = 0; i < form.length - 1; i++){
            value = form[i].value.trim();
            
            if(value === ""){
                if(form[i].name === "offer"){
                    offerSelected = false;                    
                }else {
                    form[i].style.borderColor = "red";
                }
                isEverythingOK = false;
            }else {
                switch(form[i].name){
                    case 'name':
                    case 'surname':
                       correct = checkNameOrSurname(value);
                       break;
                    case 'email':
                       correct = checkEmail(value);
                       break;
                    case 'offer':
                       correct = true;
                    default:
                       correct = checkText(value);
                       break;
                } 
                
                if(correct){
                    infoForUser += form[i].name + ": " + value + "<br>";
                }else {
                    form[i].style.borderColor = "red";
                    isEverythingOK = false;
                }
            }
        }
        showMessage(isEverythingOK, infoForUser, offerSelected, form);   
    }    

//////////////////////

window.onload = function () {
   var conMenu = document.getElementById("con_menu");
   var menu = document.getElementById("menu");
   var menuLinks = document.getElementById("menu_links");
   var logo = document.getElementById("logo");
   
   var select = document.getElementsByClassName("custom-select");

   //mobile menu
   var menuIcon = document.getElementById("menuIcon");
   var showMenu = false;
   menuIcon.addEventListener("click", function(){
       showMenu = showMenuMobile(conMenu, menuLinks);
   });
   menuLinks.addEventListener("click", function(){
        if(showMenu === true){
           conMenu.style.marginTop = "-195px";
           showMenu = false;
       }
   });
   
   window.onresize = function(){
       var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
       if(width > 768){
          conMenu.style.marginTop = "0"; 
       }else{
          conMenu.style.marginTop = "-195px";
       }
   };
   ////////
   
   //fixed menu
   window.onscroll = function() {
        scrollFunction(conMenu, menu, menuLinks, logo);
    };
    ///////
    
    //tooltip
    createTooltip();
    ///////
   
   //select in form
   createSelect(select);
   /*if the user clicks anywhere outside the select box,
    then close all select boxes:*/
    document.addEventListener("click", closeAllSelect);
    /////
    
    //check form
    var contactForm = document.getElementById("contactForm");
    var submitForm = contactForm.submitForm;

    submitForm.addEventListener("click", function(event){
        event.preventDefault();
        checkForm(contactForm);  
    });

    ////   
};




