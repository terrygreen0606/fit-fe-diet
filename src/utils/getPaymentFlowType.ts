import { PaymentFlowType } from 'types';

export const getPaymentFlowType = (): PaymentFlowType => {
  let paymentFlow: PaymentFlowType = '1';
  const paymentFlowData = window?.dataLayer?.find((data) => data.payment_flow);

  if (paymentFlowData) {
    const paymentFlowNew = paymentFlowData.payment_flow?.toString();

    switch (paymentFlowNew) {
      case '1':
      case '2':
      case '3':
        paymentFlow = paymentFlowNew;
        break;
      default:
    }
  }

  return paymentFlow;
};
