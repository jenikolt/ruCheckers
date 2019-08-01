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

function paint(){
    
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

function checker(){
    let tag = document.createElement("div");
    let tagpole = document.getElementById("4_2");
    tag.className = "check";
    tag.top = tagpole.top;
    tag.left = tagpole.left;
    tagpole.appendChild(tag);
}

(paint());
(checker())