export function calcDiscountedPrice(price, discount) {
  if (!discount) return price;

  const discountAmount = (price * discount) / 100;
  const finalPrice = price - discountAmount;

  /*   console.log(price);
  console.log(discount);
  console.log(discountAmount);
  console.log(finalPrice); */
  return finalPrice;
}
