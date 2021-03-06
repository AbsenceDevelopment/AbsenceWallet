export const UPDATE_INITIAL = 'UPDATE_INITIAL';
export const ETH_PRICE_UPDATE = 'ETH_PRICE_UPDATE';
export const CURRENCY_UPDATE = 'CURRENCY_UPDATE';

export const updateInitial = data => ({
    type: UPDATE_INITIAL,
    data
})
export const ethPrice = data => ({
  type: ETH_PRICE_UPDATE,
  data
})

export const selectCurrency = data => ({
  type: CURRENCY_UPDATE,
  data
})
