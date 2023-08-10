import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import 'dayjs/locale/pt-br';

dayjs.extend(isSameOrBefore);
dayjs.locale('pt-br');

export function generateAndFormatDates(startDates, endDates) {
  const formattedDates = [];

  for (let i = 0; i < startDates.length; i++) {
    const startDate = dayjs(startDates[i]);
    const endDate = dayjs(endDates[i]);

    const dateRange = [];
    let currentDate = startDate;

    while (currentDate.isSameOrBefore(endDate, 'day')) {
      let formattedDate = currentDate.format('dddd, DD/MM').replace('-feira', '');
      formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
      dateRange.push(formattedDate);
      currentDate = currentDate.add(1, 'day');
    }

    formattedDates.push(dateRange);
  }

  return formattedDates;
}
