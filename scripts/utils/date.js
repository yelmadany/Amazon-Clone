import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function getDeliveryDate(option, returnString = "dddd, MMMM D") {
  let date = dayjs();
  date = date.add(option.deliveryDays, 'day');
  return date.format(returnString);
}

export function getOrderPlacedDate(returnString = "MMMM D") {
  let date = dayjs();
  return date.format(returnString);
}