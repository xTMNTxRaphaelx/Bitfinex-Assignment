import NetInfo from '@react-native-community/netinfo';

export const app = {
  state: {
    ws: null,
    isOnline: false,
    ticker: {},
    trades: {},
    books: {},
    symbol: 'tBTCUSD'
  }, // initial state
  reducers: {
    setConnection(state, payload) {
      state['isOnline'] = payload;
      return state;
    },
    setWS(state, payload) {
      state['ws'] = payload;
      return state;
    },
    saveSymbol(state, payload) {
      state['symbol'] = payload;
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
      state['trades'][state.symbol] = [
        ...payload.result,
        ...(state['trades'][state.symbol] || [])
      ];
      return state;
    },
    addOrderBook(state, payload) {
      state['books'][state.symbol] = [
        ...payload.result,
        ...(state['books'][state.symbol] || [])
      ];
      return state;
    }
  },
  effects: dispatch => ({
    initWS(payload, rootState) {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          const ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
          const subscribtions = {};
          ws.onopen = function() {
            dispatch.app.setWS(ws);
            dispatch.app.setConnection(true);
            dispatch.app.initSymbol();
          };
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
                dispatch.app.addTickerData({ result: res[1] });
              } else if (channelType === 'trades') {
                dispatch.app.addTradeData({
                  result: res.length === 3 ? [res[2]] : res[1]
                });
              } else if (channelType === 'books') {
                dispatch.app.addOrderBook({ result: res[1] });
              }
              // console.log(res);
            }
          };
          ws.onclose = function(e) {
            dispatch.app.setConnection(false);
            setTimeout(function() {
              dispatch.app.initWS();
            }, 5000);
          };
          ws.onerror = function(err) {
            ws.close();
          };
        }
      });
    },
    setSymbol(payload, rootState) {
      dispatch.app.unsubscribe();
      dispatch.app.saveSymbol(payload);
      dispatch.app.initSymbol();
    },
    initSymbol() {
      dispatch.app.subscribe();
    },
    unsubscribe(payload, rootState) {
      const {
        app: { ws, symbol }
      } = rootState;
      if (!symbol) return;
      let msg = JSON.stringify({
        event: 'unsubscribe',
        channel: 'ticker',
        symbol
      });
      ws.send(msg);
      let msg2 = JSON.stringify({
        event: 'unsubscribe',
        channel: 'trades',
        symbol
      });
      ws.send(msg2);
      let msg3 = JSON.stringify({
        event: 'unsubscribe',
        channel: 'book',
        symbol
      });
      ws.send(msg3);
    },
    subscribe(payload, rootState) {
      const {
        app: { ws, symbol }
      } = rootState;
      let msg = JSON.stringify({
        event: 'subscribe',
        channel: 'ticker',
        symbol
      });
      ws.send(msg);
      let msg2 = JSON.stringify({
        event: 'subscribe',
        channel: 'trades',
        symbol
      });
      ws.send(msg2);
      let msg3 = JSON.stringify({
        event: 'subscribe',
        channel: 'book',
        symbol
      });
      ws.send(msg3);
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
