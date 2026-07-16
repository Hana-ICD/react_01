
export async function addToCart(count, quanty) {  
  await new Promise(resolve => setTimeout(resolve, 1000)); // add delay time to => delay transtion
  if(quanty > 5) {
    return {error: 'Quantity not available'};
  }
  else if(isNaN(quanty)) {
    throw new Error('Quantity must be a number');
  }
  return {count: count + quanty};
}

export async function rmCart(count) {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {count: Math.max(0, count-1)};
  // return Math.max(0, count-1);
}