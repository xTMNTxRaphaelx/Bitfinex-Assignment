export const app = {
  state: {
    ticker: {},
    trade: {},
    symbol: 'tBTCUSD'
  }, // initial state
  reducers: {
    addTickerData(state, payload) {
      state['ticker'][state.symbol] = payload.result;
      return state;
    },
    addTradeData(state, payload) {
      state['trade'][state.symbol] = payload.result;
      return state;
    }
  },
  effects: dispatch => ({
    initSymbol() {
      dispatch.app.getTickerData();
      dispatch.app.getTradeData();
    },
    async getTickerData(payload, rootState) {
      const req = await fetch(
        `https://api-pub.bitfinex.com/v2/ticker/${rootState.app.symbol}`
      );
      const res = await req.json();
      dispatch.app.addTickerData({ result: res });
    },
    async getTradeData(payload, rootState) {
      const req = await fetch(
        `https://api-pub.bitfinex.com/v2/trades/${rootState.app.symbol}/hist`
      );
      const res = await req.json();
      dispatch.app.addTradeData({ result: res });
    }
  })
};
