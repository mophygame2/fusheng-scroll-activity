export function onRequest() {
  const now = new Date();
  const taipeiParts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const part = (type) => taipeiParts.find((item) => item.type === type)?.value || "00";
  const date = `${part("year")}-${part("month")}-${part("day")}`;
  const time = `${part("hour")}:${part("minute")}:${part("second")}`;

  return Response.json({
    datetime: `${date}T${time}+08:00`,
    date,
    time,
    timezone: "Asia/Taipei",
    source: "cloudflare-pages",
  }, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
