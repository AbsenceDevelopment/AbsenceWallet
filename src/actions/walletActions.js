export const ADD_WALLET = 'ADD_WALLET';
export const UPDATE_WALLET = 'UPDATE_WALLET';
export const SELECT_WALLET = 'SELECT_WALLET';

export const addWallet = data => ({
    type: ADD_WALLET,
    data
})

export const selectWallet = data => ({
    type: SELECT_WALLET,
    data
})

export const updateWallet = data => ({
    type: UPDATE_WALLET,
    data
})
