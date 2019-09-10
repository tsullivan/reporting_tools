import moment from 'moment';

export function nextRun(): Date {
  return new Date(moment(moment() + 11000)); // 11 seconds from now
}
