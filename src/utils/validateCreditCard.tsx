const AmexCardnumber = inputtxt => { // 15
  const cardno = /^(?:3[47][0-9]{13})$/;
  return cardno.test(inputtxt);
};

const VisaCardnumber = inputtxt => { // 16 | 13
  const cardno = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  return cardno.test(inputtxt);
};

const MasterCardnumber = inputtxt => { // 16
  const cardno = /^(?:5[1-5][0-9]{14})$/;
  return cardno.test(inputtxt);
};

const DiscoverCardnumber = inputtxt => { // 15 | 16
  const cardno = /^(:?6011|5[0-9][0-9])[0-9]{12}$/;
  return cardno.test(inputtxt);
};

const DinerClubCardnumber = inputtxt => { // 14
  const cardno = /^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/;
  return cardno.test(inputtxt);
};

const JCBCardnumber = inputtxt => { // 15 | 16
  const cardno = /^(?:(?:2131|1800|35\d{3})\d{11})$/;
  return cardno.test(inputtxt);
};

export const IsValidCreditCardNumber = cardNumber => {
  let cardType = null;

  if (VisaCardnumber(cardNumber)) {
    cardType = "visa";
  } else if (MasterCardnumber(cardNumber)) {
    cardType = "mastercard";
  } else if (AmexCardnumber(cardNumber)) {
    cardType = "americanexpress";
  } else if (DiscoverCardnumber(cardNumber)) {
    cardType = "discover";
  } else if (DinerClubCardnumber(cardNumber)) {
    cardType = "dinerclub";
  } else if (JCBCardnumber(cardNumber)) {
    cardType = "jcb";
  }

  return cardType;
};
