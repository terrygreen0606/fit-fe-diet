export const getPaymentFlowType = () => {
  let paymentFlow: '1' | '2' | '3' = '1';

  const paymentFlowData = window?.dataLayer?.find((data) => data.payment_flow);

  if (paymentFlowData) {
    const paymentFlowNew = paymentFlowData.payment_flow?.toString();

    switch (paymentFlowNew) {
      case '1':
      case '2':
      case '3':
      default:
        paymentFlow = '1';
    }
  }

  return paymentFlow;
};
