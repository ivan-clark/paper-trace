export const DateFormatLong = ({ createdDate }) => {
  const createdAtDate = new Date(createdDate);
  const currentTime = new Date();

  const timeDifference = Math.floor((currentTime - createdAtDate) / (60 * 1000)); // difference in minutes

  let formattedTime = createdAtDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const hoursAgo = Math.floor(timeDifference / 60);

  if (timeDifference < 60) {
    formattedTime += ` (${timeDifference} minutes ago)`;
  } else if (timeDifference < 24 * 60) {
    formattedTime += ` (${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago)`;
  } else {
    formattedTime += ` (${createdAtDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`;
  }

  return formattedTime;
};

export default DateFormatLong;
