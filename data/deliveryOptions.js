export const DeliveryOptions = [
  {
    name: "Free Shipping",
    id: "1",
    deliveryDays: 7,
    priceCents: 0
  },
  {
    name: "$4.99 - Standard Shipping",
    id: "2",
    deliveryDays: 3,
    priceCents: 499
  },
  {
    name: "$9.99 - Express Shipping",
    id: "3",
    deliveryDays: 1,
    priceCents: 999
  }
]

export function findItemInDeliveryOptions(id) {
  let i = 0;
  for (i; i < DeliveryOptions.length; i++) if (DeliveryOptions[i].id === id) break;

  if (i === DeliveryOptions.length) {
    return "";
  }
  return DeliveryOptions[i];
}
