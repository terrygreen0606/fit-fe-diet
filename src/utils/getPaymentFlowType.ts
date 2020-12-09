export const getPaymentFlowType = () => {
  let paymentFlow = null;

  const paymentFlowData = window.dataLayer?.find((data) => data.payment_flow);

  if (paymentFlowData) {
    paymentFlow = paymentFlowData.payment_flow?.toString();

    if (paymentFlow !== '1' || paymentFlow !== '3') {
      paymentFlow = null;
    }
  }

  return paymentFlow;
};
