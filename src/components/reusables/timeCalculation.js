export const calculateTime = (timeString) => {

    const date = new Date(timeString);

    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedTime = date.toLocaleString('en-US', timeOptions);

    return formattedTime;

}

export function addMinutesToTime(timeString, minutesToAdd) {
    const [time, period] = timeString.split(' ');
    let [hours, minutes] = time.split(':');
    
    if (period === 'PM' && hours !== '12') {
      hours = String(Number(hours) + 12);
    }
    
    const totalMinutes = Number(minutes) + minutesToAdd;
    
    // Carryover of hours and adjusting the AM/PM indicator
    hours = String(Number(hours) + Math.floor(totalMinutes / 60));
    minutes = String(totalMinutes % 60).padStart(2, '0');
    
    const formattedHours = (Number(hours) % 12) || 12;
    const periodIndicator = (Number(hours) < 12 || Number(hours) === 24) ? 'AM' : 'PM';
    
    const newTimeString = `${formattedHours}:${minutes} ${periodIndicator}`;
    
    return newTimeString;
  }
  
  

export function getFinishTime(timeString,hair,beard,services){
    switch(services){
        case "0":
            return addMinutesToISOString(timeString,hair);
        case "1":
            return addMinutesToISOString(timeString,beard);
        case "2":
            return addMinutesToISOString(timeString,(beard+hair));
        default :
            return timeString;
    }

}

 export function addMinutesToISOString(isoString, minutesToAdd){
    const date = new Date(isoString);
  if (isNaN(date)) {
    return ;
  }

  if (typeof minutesToAdd !== 'number' || isNaN(minutesToAdd)){
    return ;
  }

  date.setMinutes(date.getMinutes() + minutesToAdd);

  const updatedISOString = date.toISOString();

  return updatedISOString;
  }

  export function getMinuteDifference(isoString1, isoString2) {
    const date1 = new Date(isoString1);
    const date2 = new Date(isoString2);
    const differenceInMilliseconds = (date2 - date1);
    const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));
    return differenceInMinutes;
  }
  
  console.log()
  
  
  