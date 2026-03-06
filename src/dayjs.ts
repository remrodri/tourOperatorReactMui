// src/dayjs.ts
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// ✅ plugins requeridos por MUI X
dayjs.extend(utc);
dayjs.extend(timezone);

// (opcional) usa la zona local del usuario
// dayjs.tz.setDefault(dayjs.tz.guess());

export default dayjs;