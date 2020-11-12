export const getCardFieldFormat = (errorFieldKey: string) => {
  let fieldKey = errorFieldKey;

  switch (errorFieldKey) {
    case 'card.year':
      fieldKey = 'cardMonthYear';
      break;

    case 'card.number':
      fieldKey = 'cardNumber';
      break;

    case 'card.month':
      fieldKey = 'cardMonthYear';
      break;

    case 'card.cvv':
      fieldKey = 'cardCvv';
      break;

    case 'card.doc_id':
      fieldKey = 'docId';
      break;

    case 'contacts.phone':
      fieldKey = 'phone';
      break;

    case 'contacts.payer_name':
      fieldKey = 'payerName';
      break;

    default:
      fieldKey = errorFieldKey;
  }

  return fieldKey;
};
