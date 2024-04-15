function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // handle midnight
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    var timeString = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    document.getElementById('clock').textContent = timeString;

    setTimeout(updateClock, 1000);
} //this function is for update the time from the system to browser.

updateClock();

document.getElementById('setAlarm').addEventListener('click', function() {
    var hour = document.getElementById('alarmHour').value;
    var minute = document.getElementById('alarmMinute').value;
    var second = document.getElementById('alarmSecond').value;
    var ampm = document.getElementById('alarmAMPM').value;

    var alarmTime = new Date();
    alarmTime.setHours(parseInt(hour) + (ampm === 'PM' ? 12 : 0));
    alarmTime.setMinutes(parseInt(minute));
    alarmTime.setSeconds(parseInt(second));

    var alarmItem = document.createElement('li');
    alarmItem.className = 'list-group-item';
    alarmItem.textContent = 'Alarm set for ' + hour + ':' + minute + ':' + second + ' ' + ampm;

    var deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm ml-2';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        alarmItem.remove();
        clearTimeout(alarmTimeout); // Clear the alarm timeout when deleting an alarm
    });

    alarmItem.appendChild(deleteButton);
    document.getElementById('alarmsList').appendChild(alarmItem);

    var current = new Date();
    var timeToAlarm = alarmTime - current;

    var alarmTimeout = setTimeout(function() {
        if (!alarmItem.deleted) {
            alert('Alarm!');
        }
    }, timeToAlarm);

    // Store the timeout reference within the alarmItem for easy access during deletion
    alarmItem.alarmTimeout = alarmTimeout;
});