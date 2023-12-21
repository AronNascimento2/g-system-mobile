export const convertToFormattedTime = backgroundTimeMillis => {
  const backgroundTime = new Date(parseInt(backgroundTimeMillis, 10)); // Convertendo para objeto Date
  backgroundTime.setHours(backgroundTime.getHours() - 3); // Subtrai 3 horas do horário

  const timeZoneOffset = backgroundTime.getTimezoneOffset(); // Obtém o offset do fuso horário
  const timeZoneOffsetHours = timeZoneOffset / 60; // Converte o offset para horas

  const formattedTime = backgroundTime
    .toISOString() // Formata o tempo no formato ISO 8601
    .replace(
      'Z',
      `${timeZoneOffsetHours < 0 ? '+' : '-'}${String(
        Math.abs(timeZoneOffsetHours),
      ).padStart(2, '0')}:00`,
    );

  return formattedTime;
};
