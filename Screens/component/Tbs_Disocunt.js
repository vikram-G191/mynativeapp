// export const calculateDiscountedFare = (date, baseFare) => {
//   if (!date || isNaN(new Date(date))) return baseFare;
//   const day = new Date(date).getDay();
//   const isWeekend = day === 0 || day === 6;
//   const discount = isWeekend ? 0.01 : 0.02;
//   return baseFare - baseFare * discount;
// };
export const calculateDiscountedFare = (date, baseFare, dis_price) => {
    if (!date || isNaN(new Date(date))) return baseFare;
    const day = new Date(date).getDay();
    // const isWeekend = day === 0 || day === 6;
    // const discount = isWeekend ? 0.01 : 0.02;
    // after discuss set 4% at 1-3-25
    const discount = Number(dis_price) / 100;
    // console.log(dis_price,"discountdiscount");
    
    return Math?.round(baseFare - baseFare * discount);
  };
  