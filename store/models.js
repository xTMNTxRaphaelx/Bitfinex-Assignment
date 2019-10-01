export const app = {
  state: {
    ws: null,
    ticker: {},
    trades: {},
    books: {},
    subscribtions: {},
    symbol: 'tBTCUSD'
  }, // initial state
  reducers: {
    setWS(state, payload) {
      state['ws'] = payload;
      return state;
    },
    setSubscribtion(state, { chanID, channel }) {
      state['subscribtions'][chanID] = channel;
      return state;
    },
    addTickerData(state, payload) {
      state['ticker'][state.symbol] = [
        ...payload.result,
        ...(state['ticker'][state.symbol] || [])
      ];
      return state;
    },
    addTradeData(state, payload) {
      state['trades'][state.symbol] = payload.result;
      return state;
    },
    addOrderBook(state, payload) {
      state['books'][state.symbol] = payload.result;
      return state;
    }
  },
  effects: dispatch => ({
    initWS(payload, rootState) {
      const ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
      const subscribtions = {};
      ws.onmessage = e => {
        const res = JSON.parse(e.data);
        if (res.event === 'subscribed') {
          const chanID = res.chanId;
          const channel = res.channel;
          subscribtions[chanID] = channel;
        } else {
          const chanID = res[0];
          const channelType = subscribtions[chanID];
          if (channelType === 'ticker') {
            dispatch.app.addTickerData({ result: res });
          } else if (channelType === 'trades') {
            dispatch.app.addTradeData({
              result: res.length === 3 ? res[2] : res[1]
            });
          } else if (channelType === 'books') {
            dispatch.app.addOrderBook({ result: res[1] });
          }
          // console.log(res);
        }
      };
      dispatch.app.setWS(ws);
    },
    initSymbol() {
      // dispatch.app.getTickerData();
      // dispatch.app.getTradeData();
      // dispatch.app.getOrderBook();
      dispatch.app.subscribeToSymbol();
    },
    subscribeToSymbol(payload, rootState) {
      const {
        app: { ws }
      } = rootState;
      // let msg = JSON.stringify({
      //   event: 'subscribe',
      //   channel: 'ticker',
      //   symbol: 'tBTCUSD'
      // });
      // ws.send(msg);
      let msg2 = JSON.stringify({
        event: 'subscribe',
        channel: 'trades',
        symbol: 'tBTCUSD'
      });
      ws.send(msg2);
      // rootState.ws && rootState.ws.on('open', () => rootState.ws.send(msg));
      // rootState.ws && rootState.ws.on('open', () => rootState.ws.send(msg2));
    },
    // async getSymbols() {
    //   const req = await fetch(`https://api-pub.bitfinex.com/v2/symbols`);
    //   const res = await req.json();
    //   dispatch.app.addTickerData({ result: res });
    // },
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
    },
    async getOrderBook(payload, rootState) {
      const req = await fetch(
        `https://api-pub.bitfinex.com/v2/book/${rootState.app.symbol}/P0`
      );
      const res = await req.json();
      dispatch.app.addOrderBook({ result: res });
    }
  })
};
