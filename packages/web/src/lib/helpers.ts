import { ManualFieldError } from "react-hook-form"
import dayjs, { Dayjs } from "dayjs"

export const snakeToCamel = (value: string) =>
  value.replace(/_(\w)/g, m => m[1].toUpperCase())

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const round = (value: number, places = 2) => {
  const exp = Math.pow(10, places)
  return Math.round(value * exp) / exp
}

export const sleep = (delay: number) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), delay)
  })
}

export const decimalCount = (value: number) => {
  if (value % 1 !== 0) return value.toString().split(".")[1].length
  return 0
}

export const getDays = (startDate: Dayjs, daysCount: number) => {
  return Array(daysCount)
    .fill(null)
    .map((_, v) => startDate.add(v, "day"))
}

export const isToday = (day: Dayjs) => {
  return dayjs(day).isSame(dayjs(), "day")
}

export const getMonths = (startDate: Dayjs, daysCount: number) => {
  // Include year to cater for scrolling further than 12
  const monthsByDay = Array(daysCount)
    .fill(null)
    .map(
      (_, v) =>
        startDate.add(v, "day").month() + "/" + startDate.add(v, "day").year(),
    )

  const uniqueMonths = monthsByDay.filter(function(value, index, array) {
    return array.indexOf(value) === index
  })

  return uniqueMonths.map(month => ({
    month: Number(month.split("/", 2)[0]),
    year: Number(month.split("/", 2)[1]),
  }))
}

export const formatTime = (time: number) => {
  if (time !== 0) {
    let formatted
    if (Math.floor(time / 60)) {
      formatted = Math.floor(time / 60) + "h "
      if (Math.floor(time % 60)) {
        formatted = formatted + Math.floor(time % 60) + "m"
      }
    } else if (Math.floor(time % 60)) {
      formatted = Math.floor(time % 60) + "m"
    }
    return formatted
  } else {
    return false
  }
}

export const hoursInMins = (estimatedTime?: string | null) => {
  if (estimatedTime) {
    const split = estimatedTime.split(":")
    const minutes = parseInt(split[0]) * 60
    return minutes + parseInt(split[1])
  } else {
    return 0
  }
}

// DAYJS set month is broken!!
export const monthNames = [
  "jan.",
  "feb.",
  "mar.",
  "apr.",
  "may.",
  "jun.",
  "jul.",
  "aug.",
  "sept.",
  "oct.",
  "nov.",
  "dec.",
]

export const isMobileDevice = () => {
  return (
    typeof window.orientation !== "undefined" ||
    navigator.userAgent.indexOf("IEMobile") !== -1
  )
}

export interface ValidationError {
  property: string
  constraints: { [key: string]: string }
}

export function formatValidations(
  errors: ValidationError[],
): ManualFieldError<any>[] {
  return errors.map(error => ({
    name: error.property,
    type: error.property,
    types: error.constraints,
  }))
}

export const formatFileName = (filename: string) => {
  const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-")
  return cleanFileName
}
