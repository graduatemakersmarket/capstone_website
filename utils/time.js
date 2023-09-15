/*************************************************************************************************/
/* Compute a future timestamp (in hours)
/*************************************************************************************************/
const createExpirationDate = (hours) => {
  const time = new Date();
  time.setHours(time.getHours() + hours);
  return time.toISOString().replace('T', ' ').substring(0, 19);
};

/*************************************************************************************************/
/* Compute the time (in minutes) from a unix timestamp
/*************************************************************************************************/
const getDifferenceMinutes = (unixTimestamp) => {
  const timestamp = new Date(unixTimestamp * 1000);
  const current = new Date();
  return Math.floor((timestamp - current) / 60000);
};

/*************************************************************************************************/
/* Compute the local time
/*************************************************************************************************/
const getCurrentTimestamp = () => {
  const time = new Date();
  const local = new Date(time.getTime() - (time.getTimezoneOffset() * 60000));
  return local.toISOString().replace('T', ' ').substring(0, 19);
};

module.exports = {
  createExpirationDate,
  getDifferenceMinutes,
  getCurrentTimestamp,
};
