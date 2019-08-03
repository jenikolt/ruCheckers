const GAMEDIV = document.getElementById("gamediv");

function getClassNameById(id_w, id_h){
    if(id_w == 0){
        if(id_h == 9 || id_h == 0){
            return "empty";
        }
        return "side";
    }else if(id_h == 0){
        if(id_w == 9 || id_w == 0){
            return "empty";
        }
        return "side";
    }else if(id_w == 9){
        if(id_h == 9 || id_h == 0){
            return "empty";
        }
        return "side";
    }else if(id_h == 9){
        if(id_w == 9 || id_w == 0){
            return "empty";
        }
        return "side";
    }else{
        if(((id_w+id_h) % 2) == 0){
            return "pole black";
        }else{
            return "pole white";
        }
    }
}

function toABC(dig){
    if(dig == 1) return "A";
    if(dig == 2) return "B";
    if(dig == 3) return "C";
    if(dig == 4) return "D";
    if(dig == 5) return "E";
    if(dig == 6) return "F";
    if(dig == 7) return "G";
    if(dig == 8) return "H";
}

function getTextById(id_w, id_h){
    if(id_w === 0){
        if(id_h === 9 || id_h === 0){
            return "*";
        }
        return id_h+"";
    }else if(id_h === 0){
        if(id_w == 9 || id_w == 0){
            return "*";
        }
        return toABC(id_w);
    }else if(id_w == 9){
        if(id_h == 9 || id_h == 0){
            return "*";
        }
        return id_h+"";
    }else if(id_h == 9){
        if(id_w == 9 || id_w == 0){
            return "*";
        }
        return toABC(id_w);
    }else{
        return "";
    }
}

function debug(event){
    let id = event.target.id;
    let debugdiv = document.getElementById("debug");
    debugdiv.innerHTML = getfromIdCharW(id)+"-"+getFromIdH(id);
}

function setShadow(event){
    if(event.type == "mousedown"){
        event.target.classList.add("down");
    }else if(event.type == "mouseup"){
        event.target.classList.remove("down");
    }else if(event.type == "mouseleave"){
        event.target.classList.remove("down");
    }
}

function getFromIdW(id){
    let arr = id.split("_");
    return arr[0];
}
function getFromIdH(id){
    let arr = id.split("_");
    return arr[1];
}
function getfromIdCharW(id){
    let arr = id.split("_");
    return toABC(arr[0]);
}

function paintDesk(){
    
 //   GAMEDIV.innerHTML = 'play game there';

    for(let h = 9; h >= 0; h--){
        for(let w = 0; w <= 9; w++){
            let tag = document.createElement("div");
            tag.id = w + "_" + h;
            tag.className = getClassNameById(w,h);
            tag.innerHTML = getTextById(w,h);
            tag.addEventListener("click",debug);
            tag.addEventListener("mousedown",setShadow);
            tag.addEventListener("mouseup",setShadow);
            tag.addEventListener("mouseleave", setShadow)
            GAMEDIV.appendChild(tag);
        }
    }
}

function initCheck(){
    let arrwhite = [[1,3],[1,1],[2,2],[3,3],[3,1],[4,2],[5,3],[5,1],[6,2],[7,3],[7,1],[8,2]];
    let arrblack = [[1,7],[2,8],[2,6],[3,7],[4,8],[4,6],[5,7],[6,8],[6,6],[7,7],[8,8],[8,6]];
    let arrclear = [[1,5],[2,4],[3,5],[4,4],[5,5],[6,4],[7,5],[8,4]];
    addCheckFromArray(arrwhite,"white");
    addCheckFromArray(arrblack,"black");
    clearCheckFromArray(arrclear);
}

function addCheckFromArray(arr, color) {
    for (let i = 0; i < arr.length; i++) {
        let tag = getCellTag(arr[i][0], arr[i][1]);
        tag.classList.remove("bc", "wc", "wcd", "bcd");
        if (color == "white") {
            tag.classList.add("wc");
        }
        if (color == "black") {
            tag.classList.add("bc");
        }
        if (color == "white_d") {
            tag.classList.add("wcd");
        }
        if (color == "black_d") {
            tag.classList.add("bcd");
        }
    }
}

function clearCheckFromArray(arr){
    for (let i = 0; i < arr.length; i++) {
        let tag = getCellTag(arr[i][0], arr[i][1]);
        tag.classList.remove("bc", "wc", "wcd", "bcd");
    }
}

function getCellTag(w,h){
    return document.getElementById(w + "_" + h);
}

function checker(){
    //let tag = document.createElement("div");
    //let tagpole = document.getElementById("4_2");
    //tagpole.classList.add("wc");
    //tagpole = document.getElementById("4_6");
    //tagpole.classList.add("bc");
    //tag.top = tagpole.top;
    //tag.left = tagpole.left;
    //tagpole.appendChild(tag);
}


(paintDesk());
(checker());
(initCheck());