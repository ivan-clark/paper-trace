export const DateFormatLong = ({ createdDate }) => {
  const createdAtDate = new Date(createdDate);
  const currentTime = new Date();

  const timeDifference = Math.floor((currentTime - createdAtDate) / (60 * 1000)); // difference in minutes

  let formattedTime = " ";
  const hoursAgo = Math.floor(timeDifference / 60);

  if (timeDifference < 60) {
    formattedTime += `(${timeDifference} minutes ago)`;
  } else if (timeDifference < 24 * 60) {
    formattedTime += `(${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago)`;
  } else {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedDateTime = createdAtDate.toLocaleString('en-US', options); // Format date and time together
    formattedTime = `${formattedDateTime}`;
  }

  return formattedTime;
};

export default DateFormatLong;
