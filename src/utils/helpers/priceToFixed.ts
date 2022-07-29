const priceToFixed = (price: string): string => {
  return `$${parseFloat(price).toFixed(2)}`;
};

export default priceToFixed;
