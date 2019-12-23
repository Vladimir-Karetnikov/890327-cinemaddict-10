import moment from 'moment';

export const getFilmDuration = (runTime) => {
  const runTimeInMs = runTime * 60 * 1000;
  const momentDuration = moment.duration(runTimeInMs);
  return `${momentDuration.hours()}h ${momentDuration.minutes()}m`;
};
