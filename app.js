let lebarGrid = document.getElementById('lebar-grid');
let tinggiGrid = document.getElementById('tinggi-grid');
let createGrid = document.getElementById('create-grid');
let clearGrid = document.getElementById('clear-grid');
let eraseGrid = document.getElementById('erase-grid');
let paintGrid = document.getElementById('paint-grid');
let paintBox = document.getElementById('paint-box');
let colotGrid = document.getElementById('color-grid');
let lebarValue = document.getElementById('lebar-value');
let tinggiValue = document.getElementById('tinggi-value');

let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup",
    },
    touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend",
    }
};

let deviceType ="";

let draw = false;
let erase = false;

const isTouchDevice = () => {
    try {
        document.createEvent('TouchEvent');
        deviceType = 'touch';
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
}

isTouchDevice();

createGrid.addEventListener('click', ()=> {
    paintBox.innerHTML = "";
    let count = 0;
    for(let i = 0; i<tinggiGrid.value; i++) {
        count += 2;
        let div = document.createElement('div');
        div.classList.add('gridRow');

        for(let j = 0; j<lebarGrid.value; j++) {
            count += 2;
            let col = document.createElement('div');
            col.classList.add('gridCol');
            col.setAttribute("id", `gridCol${count}`);
            col.addEventListener(events[deviceType].down, ()=> {
                draw = true;
                if(erase) {
                    col.style.backgroundColor = "transparent";
                }else {
                    col.style.backgroundColor = colotGrid.value;
                }
            });

            col.addEventListener(events[deviceType].move, (e)=> {
                let elementId = document.elementFromPoint(
                    !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                    !isTouchDevice() ? e.clientY : e.touches[0].clientY,
                ).id;
                checker(elementId);
            });

            col.addEventListener(events[deviceType].up, ()=> {
                draw = false;
            });

            div.appendChild(col);
        }

        paintBox.appendChild(div);
    }
});

const checker = (elementId) => {
    let gridColumns = document.querySelectorAll('.gridCol');
    gridColumns.forEach((element)=> {
        if(elementId == element.id) {
            if(draw && !erase) {
                element.style.backgroundColor = colotGrid.value;
            } else if (draw && erase){
                element.style.backgroundColor = 'transparent';
            }
        }
    })
} 

clearGrid.addEventListener('click', ()=> {
    paintBox.innerHTML = "";
})

eraseGrid.addEventListener('click', ()=> {
    erase = true;
})

paintGrid.addEventListener('click', ()=> {
    erase = false;
})

lebarGrid.addEventListener('input', ()=> {
    lebarValue.innerHTML = lebarGrid.value < 9 ? `0${lebarGrid.value}` : lebarGrid.value;
})

tinggiGrid.addEventListener('input', ()=> {
    tinggiValue.innerHTML = tinggiGrid.value < 9 ? `${tinggiGrid.value}` : tinggiGrid.value;
})

window.onload = () => {
    tinggiGrid.value =0;
    lebarGrid.value = 0;
}

console.log('hai')