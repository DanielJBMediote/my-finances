import { format } from "date-fns";


export function formatDateByLang(data: Date, formatStr = "MM/dd/yyyy") {
  return format(data, formatStr)
}