let today = new Date();
const date = new Date();

function printCalendar() {
    const firstDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const tbCalendar = document.getElementById("calendar");
    const tbCalendarYM = document.getElementById("tbCalendarYM");
    
    tbCalendarYM.innerHTML = `${today.getFullYear()}년 ${ today.getMonth() + 1}월`;

    while(tbCalendar.rows.length > 2) {
        tbCalendar.deleteRow(tbCalendar.rows.length - 1);
    }

    let row = null;
    row = tbCalendar.insertRow();
    let cnt = 0;
    for(i = 0; i < firstDate.getDay(); i++){
        cell = row.insertCell();
        cnt = cnt + 1;
    }
    for(i = 1; i <= lastDate.getDate(); i++){
        cell = row.insertCell();
        cell.innerText = i;
        cnt = cnt + 1;
        if(cnt % 7 === 1){
            cell.bgColor = "red";
            cell.innerText =  i;
        }
        if(cnt % 7 === 0){
            cell.bgColor = "blue";
            cell.innerText =  i;
            row = calendar.insertRow();
        }
        if(today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth() && i === date.getDate()){
            cell.bgColor = "green";
        }
    }
    
}

function prevCalendar() {
    today = new Date(today.getFullYear(), today.getMonth() -1, today.getDate());
    printCalendar();
}

function nextCalendar() {
    today = new Date(today.getFullYear(), today.getMonth() +1, today.getDate());
    printCalendar();
}

function init() {
    printCalendar();
}

init();