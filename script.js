// script for timelog
function downloadtable() {
    var node = document.getElementById('demo')
    domtoimage
        .toPng(node)
        .then(function (dataUrl) {
            var img = new Image()
            img.src = dataUrl
            downloadURI(dataUrl, 'records.png')
        })
        .catch(function (error) {
            console.error('oops, something went wrong', error)
        })
}
function downloadURI(uri, name) {
    var link = document.createElement('a')
    link.download = name
    link.href = uri
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    delete link
}

var date = document.getElementById('date')
var startTime = document.getElementById('start-time')
var endTime = document.getElementById('end-time')
var taskDescription = document.getElementById('task-description')
var table = document.getElementById('table2')
var selectedrow = null
var flag = false
var rowIndex = 0

display()

function addRecord() {
    flag = calculate()
    if (flag === -1) {
        return
    }
    let records = new Array()
    records = JSON.parse(localStorage.getItem('record'))
        ? JSON.parse(localStorage.getItem('record'))
        : []
    records.push({
        Id: indexOf(),
        Start_Time: document.getElementById('start-time').value,
        End_Time: document.getElementById('end-time').value,
        Minutes: flag,
        Task_Description: document.getElementById('task-description').value,
    })
    localStorage.setItem('record', JSON.stringify(records))

    //insert without local storage
    // let newRow = table.insertRow(table.rows.length)
    // let cell1 = newRow.insertCell(0)
    // let cell2 = newRow.insertCell(1)
    // let cell3 = newRow.insertCell(2)
    // let cell4 = newRow.insertCell(3)
    // let cell5 = newRow.insertCell(4)

    // cell1.innerHTML = startTime.value
    // cell2.innerHTML = endTime.value
    // cell3.innerHTML = flag
    // cell4.innerHTML = taskDescription.value
    // cell5.innerHTML =
    //     '<button  class="btn1" onclick="edit(this);">Edit</button> <button class="btn1" onclick="delete_record(this);">Delete</button>'
    // clear()
}

function indexOf() {
    var table = document.getElementById('table2')
    var tl = table.rows.length
    return tl - 1
}

function clear() {
    startTime.value = ''
    endTime.value = ''
    taskDescription.value = ''
}

function delete_record(r) {
    // delete without local storage
    // let i = r.parentNode.parentNode.rowIndex
    // document.getElementById('table2').deleteRow(i)
    if (confirm('Are you sure you want to delete this record ?')) {
        entries = JSON.parse(localStorage.getItem('record'))
        selectedrow = r.parentElement.parentElement
        rowIndex = selectedrow.cells[5].innerHTML
        for (let i = 0; i < entries.length; i++) {
            if (entries[i].Id == rowIndex) {
                entries.splice(i, 1)
                location.reload()
                break
            }
        }
        for (let i = rowIndex; i < entries.length; i++) {
            entries[i].Id = entries[i].Id - 1
        }
        localStorage.setItem('record', JSON.stringify(entries))
    }
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
    if (difference > 0 || difference == 0) {
        return Math.round(difference / 60000) + ' minutes'
    } else {
        alert(
            'Enter appropriate Start Time and End Time. \n\nNote: \nEnd Time cannot be less than Start Time!'
        )
        return -1
    }
}

function edit(r) {
    selectedrow = r.parentElement.parentElement
    document.getElementById('start-time').value = selectedrow.cells[0].innerHTML
    document.getElementById('end-time').value = selectedrow.cells[1].innerHTML
    document.getElementById('task-description').value =
        selectedrow.cells[3].innerHTML
    rowIndex = selectedrow.cells[5].innerHTML
}

function update() {
    flag = calculate()
    if (flag === -1) {
        return
    }
    records = JSON.parse(localStorage.getItem('record'))
    for (let i = 1; i < records.length; i++) {
        if (records[i].Id == rowIndex) {
            records[i].Start_Time = document.getElementById('start-time').value
            records[i].End_Time = document.getElementById('end-time').value
            records[i].Minutes = flag
            records[i].Task_Description =
                document.getElementById('task-description').value
        }
    }
    localStorage.setItem('record', JSON.stringify(records))
}

function add() {
    if (validate() == true) {
        if (selectedrow == null) {
            addRecord()
        } else {
            update()
        }

        clear()
        totalHM()
        location.reload()
    }
}

function load() {
    alert('Loaded...')
}

function validate() {
    var startTime1 = document.getElementById('start-time').value
    var endTime1 = document.getElementById('end-time').value
    var td1 = document.getElementById('task-description').value

    if (startTime1 === '') {
        alert('Enter Start time')
        return false
    } else if (endTime1 === '') {
        alert('Enter End time')
        return false
    } else if (td1 === '') {
        alert('Enter task Description')
        return false
    } else {
        return true
    }
}

function totalHM() {
    var table = document.getElementById('table2'),
        min = 0,
        hour

    for (var i = 1; i < table.rows.length; i++) {
        min = min + parseInt(table.rows[i].cells[2].innerHTML)
    }

    hour = min / 60
    document.getElementById('minutes').innerHTML = min
    document.getElementById('hours').innerHTML = hour
}

// function day() {
//     var x = document.getElementById('date').value
//     document.getElementById('day').innerHTML = x
// }

function display() {
    var table = document
        .getElementById('table2')
        .getElementsByTagName('tbody')[0]
    let allEntries = localStorage.getItem('record')
    if (allEntries == null) {
        entries = []
    } else {
        entries = JSON.parse(allEntries)
    }
    entries.forEach((item, index) => {
        var newRow = table.insertRow(table.length)

        cell1 = newRow.insertCell(0)
        cell1.innerHTML = entries[index].Start_Time
        cell2 = newRow.insertCell(1)
        cell2.innerHTML = entries[index].End_Time
        cell3 = newRow.insertCell(2)
        cell3.innerHTML = entries[index].Minutes
        cell4 = newRow.insertCell(3)
        cell4.innerHTML = entries[index].Task_Description
        cell5 = newRow.insertCell(4)
        cell5.innerHTML =
            '<button  class="btn1" onclick="edit(this);">Edit</button> <button class="btn1" onclick="delete_record(this);">Delete</button>'
        cell6 = newRow.insertCell(5)
        cell6.innerHTML = index
        cell6.style.display = 'none'
    })
    totalHM()
    // day()
}
