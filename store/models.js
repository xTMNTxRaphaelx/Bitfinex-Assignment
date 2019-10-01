export const app = {
  state: {
    ticker: {},
    symbol: 'tBTCUSD'
  }, // initial state
  reducers: {
    addTickerData(state, payload) {
      state['ticker'][state.symbol] = payload.result;
      return state;
    }
  },
  effects: dispatch => ({
    async getTickerData(payload, rootState) {
      const req = await fetch(
        `https://api-pub.bitfinex.com/v2/ticker/${rootState.app.symbol}`
      );
      const res = await req.json();
      dispatch.app.addTickerData({ result: res });
    }
  })
};
