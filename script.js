const GAMEDIV = document.getElementById("gamediv");
const CELLS = new Array(32);
const SelectCell = new Array(2);
const SelectCellPrev = new Array(2);
const SelectCheck = new Array(2);
const SelectCheckPrev = new Array(2);

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

function ClickCell(e) {
    debug(e);
    let id = event.target.id;
    let w = getFromIdW(id) * 1;
    let h = getFromIdH(id) * 1;
    if (((w + h) % 2) == 0) {
        if (w < 9 && w > 0 && h < 9 && h > 0) {
            for (let i = 0; i < 32; i++) {
                if (CELLS[i].width == w && CELLS[i].height == h) {
                    if (!CELLS[i].empty) {
                        if (SelectCell[0] === undefined) {
                            SelectCell[0] = w;
                            SelectCell[1] = h;
                        }
                        SelectCellPrev[0] = SelectCell[0];
                        SelectCellPrev[1] = SelectCell[1];
                        SelectCell[0] = w;
                        SelectCell[1] = h;
                        CELLS[i].select = true;
                        if (SelectCellPrev[0] != SelectCell[0] && SelectCellPrev[1] != SelectCell[1]) {
                            for (let j = 0; j < 32; j++) {
                                if (CELLS[j].width == SelectCellPrev[0] && CELLS[j].height == SelectCellPrev[1]) {
                                    CELLS[j].select = false;
                                    break;
                                }
                            }
                        }
                        break;
                    } else {
                        if (SelectCell[0] === undefined) {
                            break;
                        }
                        let previndex = 0;
                        for (let j = 0; j < 32; j++) {
                            if (CELLS[j].width == SelectCellPrev[0] && CELLS[j].height == SelectCellPrev[1]) {
                                previndex = j;
                                break;
                            }
                        }
                        CELLS[i].color = CELLS[previndex].color;
                        CELLS[i].king = CELLS[previndex].king;
                        CELLS[i].empty = false;
                        CELLS[i].select = true;
                        CELLS[previndex].empty = true;
                        CELLS[previndex].select = false;
                        SelectCellPrev[0] = SelectCell[0];
                        SelectCellPrev[1] = SelectCell[1];
                        SelectCell[0] = w;
                        SelectCell[1] = h;
                        break;
                    }
                }
            }
        }
        console.log(SelectCell);
        console.log(SelectCellPrev);

    }
    repaintPropsFromArr(CELLS);
    /*
    console.log(SelectCell);
    if(w < 9 && w > 0 && h < 9 && h >0){
        if(SelectCell[0] > 0 && SelectCell[1] > 0){
            let t = document.getElementById(SelectCell[0]+"_"+SelectCell[1]);
            t.classList.remove("select");
            
            console.log(t);
        }
        document.getElementById(w+"_"+h).classList.add("select");
        SelectCell[0] = w;
        SelectCell[1] = h;
    }*/
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
    
    for(let h = 9; h >= 0; h--){
        for(let w = 0; w <= 9; w++){
            let tag = document.createElement("div");
            tag.id = w + "_" + h;
            tag.className = getClassNameById(w,h);
            tag.innerHTML = getTextById(w,h);
            tag.addEventListener("click",ClickCell);
            tag.addEventListener("mousedown",setShadow);
            tag.addEventListener("mouseup",setShadow);
            tag.addEventListener("mouseleave", setShadow)
            GAMEDIV.appendChild(tag);
        }
    }
}

function initCheck(){
    /*let c = {
        width: 1,
        height: 1,
        king: false,
        color: false, //false - black, true - white
        empty: false,
        select: false
    }*/
    let initarray = [
        {w:1,h:3,c:1},
        {w:1,h:1,c:1},
        {w:2,h:2,c:1},
        {w:3,h:3,c:1},
        {w:3,h:1,c:1},
        {w:4,h:2,c:1},
        {w:5,h:3,c:1},
        {w:5,h:1,c:1},
        {w:6,h:2,c:1},
        {w:7,h:3,c:1},
        {w:7,h:1,c:1},
        {w:8,h:2,c:1},
        {w:1,h:7,c:2},
        {w:2,h:8,c:2},
        {w:2,h:6,c:2},
        {w:3,h:7,c:2},
        {w:4,h:8,c:2},
        {w:4,h:6,c:2},
        {w:5,h:7,c:2},
        {w:6,h:8,c:2},
        {w:6,h:6,c:2},
        {w:7,h:7,c:2},
        {w:8,h:8,c:2},
        {w:8,h:6,c:2},
        {w:1,h:5,c:0},
        {w:2,h:4,c:0},
        {w:3,h:5,c:0},
        {w:4,h:4,c:0},
        {w:5,h:5,c:0},
        {w:6,h:4,c:0},
        {w:7,h:5,c:0},
        {w:8,h:4,c:0},
    ]
    for (let i = 0; i < 32; i++){
        let _color = false;
        let _empty = true;
        if(initarray[i].c > 0){
            _empty = false;
            if(initarray[i].c == 1){
                _color = true;
            }
        }
        let c = new Object();
        
            c.width = initarray[i].w;
            c.height = initarray[i].h;
            c.king = false;
            c.color = _color;
            c.empty = _empty;
            c.select = false;
        
        CELLS[i] = c;
    }
    repaintPropsFromArr(CELLS);
    //let arrwhite = [[1,3],[1,1],[2,2],[3,3],[3,1],[4,2],[5,3],[5,1],[6,2],[7,3],[7,1],[8,2]];
    //let arrblack = [[1,7],[2,8],[2,6],[3,7],[4,8],[4,6],[5,7],[6,8],[6,6],[7,7],[8,8],[8,6]];
    //let arrclear = [[1,5],[2,4],[3,5],[4,4],[5,5],[6,4],[7,5],[8,4]];
    //addCheckFromArray(arrwhite,"white");
    //addCheckFromArray(arrblack,"black");
    //clearCheckFromArray(arrclear);
}

function repaintPropsFromArr(arr){
    for (let i = 0; i < 32; i++){
        let tag = getCellTag(arr[i].width, arr[i].height);
        tag.classList.remove("bc", "wc", "wcd", "bcd", "select");
        if(arr[i].select){
            tag.classList.add("select");
        }
        if(arr[i].empty){
            continue;
        }else{
            if(arr[i].color){
                if(arr[i].king){
                    tag.classList.add("wcd");
                }else{
                    tag.classList.add("wc");
                }
            }else{
                if(arr[i].king){
                    tag.classList.add("bcd");
                }else{
                    tag.classList.add("bc");
                }
            }            
        }
    }
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