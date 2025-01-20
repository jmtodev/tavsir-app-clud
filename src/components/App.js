import React from "react";
import { Switch, Route } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import {
  HomePage,
  SamplePage,
  NoFoundPage,
  NotFoundPage,
  MenuPage,
  MenuDetailPage,
  OrderPage,
  CheckoutPage,
  PaymentPage,
  PaymentConfirmPage,
  ChatPage,
  MyOrderPage,
  MyOrderListPage,
  OrderDetailPage,
  HistoryPage,
  SendReceiptPage,
  AbsenHutPage,
  DirectFloPage,
  ShowRecipt,
} from "components";
import { GoogleTagManager } from "containers";

// https://github.com/diegohaz/arc/wiki/Styling
import theme from "./themes/default";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Rubik', sans-serif;
  }
`;
const App = () => {
  return (
    <div>
      <GlobalStyle />
      <GoogleTagManager />
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/sample-page" component={SamplePage} exact />
          <Route path="/not-found" component={NoFoundPage} exact />
          <Route path="/menu" component={MenuPage} exact />
          <Route path="/menu-detail" component={MenuDetailPage} exact />
          <Route path="/cart" component={OrderPage} exact />
          <Route path="/checkout" component={CheckoutPage} exact />
          <Route path="/payment" component={PaymentPage} exact />
          <Route path="/payment-confirm" component={PaymentConfirmPage} exact />
          <Route path="/chat" component={ChatPage} exact />
          <Route path="/my-order" component={MyOrderPage} exact />
          <Route path="/my-order-list" component={MyOrderListPage} exact />
          <Route path="/order-detail" component={OrderDetailPage} exact />
          <Route path="/order-history" component={HistoryPage} exact />
          <Route path="/send-receipt" component={SendReceiptPage} exact />
          <Route path="/absen-hut" component={AbsenHutPage} exact />
          <Route path="/order-flo" component={DirectFloPage} />
          <Route path="/direct-flo" component={DirectFloPage} />
          <Route path="/show-receipt" component={ShowRecipt} />

          <Route component={NotFoundPage} />
        </Switch>
      </ThemeProvider>
    </div>
  );
};

export default App;
