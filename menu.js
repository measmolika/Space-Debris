let toggleNavStatus = false;
//the menu is not selected by default

let toggleNav = function() {
    let getSideBar = document.querySelector(".nav-sidebar");
    let getSideBarUl = document.querySelector(".nav-sidebar ul");
    let getSideBarLinks = document.querySelector(".nav-sidebar a");

    if (toggleNavStatus === false){
        getSideBarUl.style.visibility = "visible";
        getSideBar.style.width = "272px";
        getSideBar.style.opacity = "0.5";
    
        let arrayLength = getSideBarLinks.length;
        for (let i =0; i < arrayLength.length; i++){
            getSideBarLinks[i].style.opacity = "1";
        }

        toggleNavStatus = true;
    }

    else if (toggleNavStatus === true){
        getSideBar.style.width = "272px";
        getSideBar.style.opacity = "0";
    
        let arrayLength = getSideBarLinks.length;
        for (let i =0; i < arrayLength.length; i++){
            getSideBarLinks[i].style.opacity = "0";
        }

        getSideBarUl.style.visibility = "hidden";

        toggleNavStatus = false;
    }
}