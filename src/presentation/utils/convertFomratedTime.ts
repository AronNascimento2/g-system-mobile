export const convertToFormattedTime = (backgroundTimeMillis: string) => {
  const backgroundTime = new Date(parseInt(backgroundTimeMillis, 10));
  const adjustedTime = new Date(backgroundTime.getTime() - 3 * 60 * 60 * 1000);

  if (adjustedTime.getDate() !== backgroundTime.getDate()) {
    return 'Error: Adjusted date is out of bounds';
  }

  const timeZoneOffset = adjustedTime.getTimezoneOffset();
  const timeZoneOffsetHours = timeZoneOffset / 60;

  const formattedTime = adjustedTime
    .toISOString()
    .replace(
      'Z',
      `${timeZoneOffsetHours < 0 ? '+' : '-'}${String(
        Math.abs(timeZoneOffsetHours),
      ).padStart(2, '0')}:00`,
    );

  return formattedTime;
};
