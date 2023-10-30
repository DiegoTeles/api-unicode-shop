import { format, lastDayOfMonth, isBefore, isToday } from 'date-fns';

export function formatExpDate(inputDate: string) {
  const [month, year]: any = inputDate.split('/');

  const dateFormatRegex = /^(0[1-9]|1[0-2])\/(20[2-9][0-9])$/;

  if (!dateFormatRegex.test(inputDate)) {
    return {
      isValid: false,
      message: 'Formato de data inválido. Use o formato "MM/YYYY".',
    };
  }

  const fullDate = new Date(year, month - 1);

  const lastDay = lastDayOfMonth(fullDate);

  if (isBefore(lastDay, new Date()) || isToday(lastDay)) {
    return {
      isValid: false,
      message: 'A data não pode ser menor que a data atual.',
    };
  }

  const formattedDate = format(lastDay, 'yyyy-MM-dd');

  return {
    isValid: true,
    message: 'Data verificada e válida',
    date: formattedDate,
  };
}
