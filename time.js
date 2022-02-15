function activate() {
    document.head.insertAdjacentHTML(
        'beforeend',
        `
		<style>
			.time-picker {
				width:185px;
                position: absolute;
				display: inline-block;
				background: #e0dfd9;
				border-radius: 0px;
                border: 1px solid black;
                padding:2px 33px;
                
			}

			.time-picker__select {
				-webkit-appearance: none;
				-moz-appearance: none;
				appearance: none;
				outline: none;
				text-align: center;
				border: 1px solid white;
				border-radius: 5px;				
                padding: 1px 5px;
				background: #ffffff;
				cursor: pointer;
				font-family: 'Heebo', sans-serif;
			}
		</style>
	`
    )

    document.querySelectorAll('.time-pickable').forEach((timePickable) => {
        let activePicker = null

        timePickable.addEventListener('focus', () => {
            if (activePicker) return

            activePicker = show(timePickable)

            const onClickAway = ({ target }) => {
                if (
                    target === activePicker ||
                    target === timePickable ||
                    activePicker.contains(target)
                ) {
                    return
                }

                document.removeEventListener('mousedown', onClickAway)
                document.body.removeChild(activePicker)
                activePicker = null
            }

            document.addEventListener('mousedown', onClickAway)
        })
    })
}

function show(timePickable) {
    const picker = buildPicker(timePickable)
    const { bottom: top, left } = timePickable.getBoundingClientRect()

    picker.style.top = `${top}px`
    picker.style.left = `${left}px`

    document.body.appendChild(picker)

    return picker
}

function buildPicker(timePickable) {
    const picker = document.createElement('div')
    const hourOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
        numberToOption
    )
    const minuteOptions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(
        numberToOption
    )

    picker.classList.add('time-picker')
    picker.innerHTML = `
		<select class="time-picker__select">
			${hourOptions.join('')}
		</select>
		:
		<select class="time-picker__select">
			${minuteOptions.join('')}
		</select>
		<select class="time-picker__select">
			<option value="AM">AM</option>
			<option value="PM">PM</option>
		</select>
	`

    const selects = getSelectsFromPicker(picker)

    selects.hour.addEventListener(
        'change',
        () => (timePickable.value = getTimeStringFromPicker(picker))
    )
    selects.minute.addEventListener(
        'change',
        () => (timePickable.value = getTimeStringFromPicker(picker))
    )
    selects.meridiem.addEventListener(
        'change',
        () => (timePickable.value = getTimeStringFromPicker(picker))
    )

    if (timePickable.value) {
        const { hour, minute, meridiem } =
            getTimePartsFromPickable(timePickable)

        selects.hour.value = hour
        selects.minute.value = minute
        selects.meridiem.value = meridiem
    }

    return picker
}

function getTimePartsFromPickable(timePickable) {
    const pattern = /^(\d+):(\d+) (am|pm)$/
    const [hour, minute, meridiem] = Array.from(
        timePickable.value.match(pattern)
    ).splice(1)

    return {
        hour,
        minute,
        meridiem,
    }
}

function getSelectsFromPicker(timePicker) {
    const [hour, minute, meridiem] = timePicker.querySelectorAll(
        '.time-picker__select'
    )

    return {
        hour,
        minute,
        meridiem,
    }
}

function getTimeStringFromPicker(timePicker) {
    const selects = getSelectsFromPicker(timePicker)

    return `${selects.hour.value}:${selects.minute.value} ${selects.meridiem.value}`
}

function numberToOption(number) {
    const padded = number.toString().padStart(2, '0')

    return `<option value="${padded}">${padded}</option>`
}

activate()
