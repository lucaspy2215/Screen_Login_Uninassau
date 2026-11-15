// "Ana Maria" -> "AM"
export const formatInitials = (name: string) =>
  name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

// "2026-11-16" -> "16/11"
export const formatDayMonth = (date: string) =>
  date.split("-").reverse().slice(0, 2).join("/");

// "2026-11-16" -> "seg"
export const formatWeekday = (date: string) =>
  new Date(`${date}T00:00:00`)
    .toLocaleDateString("pt-BR", { weekday: "short" })
    .replace(".", "");