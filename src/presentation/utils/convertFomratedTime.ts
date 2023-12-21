export const convertToFormattedTime = backgroundTimeMillis => {
  const backgroundTime = new Date(parseInt(backgroundTimeMillis, 10));
  backgroundTime.setHours(backgroundTime.getHours() - 3);

  const timeZoneOffset = backgroundTime.getTimezoneOffset();
  const timeZoneOffsetHours = timeZoneOffset / 60;

  const formattedTime = backgroundTime
    .toISOString()
    .replace(
      'Z',
      `${timeZoneOffsetHours < 0 ? '+' : '-'}${String(
        Math.abs(timeZoneOffsetHours),
      ).padStart(2, '0')}:00`,
    );

  return formattedTime;
};
