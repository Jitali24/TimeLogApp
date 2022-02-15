// script for timelog
var startTime = document.getElementById('start-time')
var endTime = document.getElementById('end-time')
var taskDescription = document.getElementById('task-description')
var table = document.getElementById('table2')
var selectedrow = null

function addRecord() {
    if (validate() == true) {
        let newRow = table.insertRow(table.rows.length)
        let cell1 = newRow.insertCell(0)
        let cell2 = newRow.insertCell(1)
        let cell3 = newRow.insertCell(2)
        let cell4 = newRow.insertCell(3)
        let cell5 = newRow.insertCell(4)

        cell1.innerHTML = startTime.value
        cell2.innerHTML = endTime.value
        cell3.innerHTML = calculate()
        cell4.innerHTML = taskDescription.value
        cell5.innerHTML =
            '<button  class="btn1" onclick="edit(this);">Edit</button> <button class="btn1" onclick="delete_record(this);">Delete</button>'
        clear()
    }
}

function clear() {
    startTime.value = ''
    endTime.value = ''
    taskDescription.value = ''
}

function delete_record(r) {
    let i = r.parentNode.parentNode.rowIndex
    document.getElementById('table2').deleteRow(i)
}

function calculate() {
    var today = new Date().toJSON().slice(0, 10).replace(/-/g, '/')
    var startTime = new Date(
        today + ' ' + document.getElementById('start-time').value
    )
    var endTime = new Date(
        today + ' ' + document.getElementById('end-time').value
    )

    var difference = endTime.getTime() - startTime.getTime()
    return Math.round(difference / 60000) + ' minutes'
}

function edit(r) {
    selectedrow = r.parentElement.parentElement
    document.getElementById('start-time').value = selectedrow.cells[0].innerHTML
    document.getElementById('end-time').value = selectedrow.cells[1].innerHTML
    document.getElementById('task-description').value =
        selectedrow.cells[3].innerHTML
}

// //12hour
// var time = new Date()
// console.log(
//     time.toLocaleString('en-US', {
//         hour: 'numeric',
//         minute: 'numeric',
//         hour12: true,
//     })
// )

function update() {
    selectedrow.cells[0].innerHTML = document.getElementById('start-time').value
    selectedrow.cells[1].innerHTML = document.getElementById('end-time').value
    selectedrow.cells[3].innerHTML =
        document.getElementById('task-description').value
    clear()
    selectedrow = null
}

function add() {
    if (selectedrow == null) {
        addRecord()
    } else {
        if (validate() == true) {
            update()
        }
    }
}

function load() {
    alert('Loaded...')
}

function validate() {
    let startTime1 = document.getElementById('start-time')
    let endTime1 = document.getElementById('end-time')
    let taskDescription1 = document.getElementById('task-description')

    console.log(startTime1)

    if (startTime1 == '' || startTime1 == null || startTime1 == undefined) {
        alert('Please enter appropriate Start Time.')
        return false
    } else if (endTime1 == '' || endTime1 == null || endTime1 == undefined) {
        alert('Please enter appropriate Start Time.')
        return false
    } else if (
        taskDescription1 == '' ||
        taskDescription1 == null ||
        taskDescription1 == undefined
    ) {
        alert('Please enter appropriate Start Time.')
        return false
    } else {
        return true
    }
}
