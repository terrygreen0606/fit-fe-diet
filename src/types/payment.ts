type creditCardParams = {
  number: string;
  year: string;
  month: string;
  cvv: string;
  type?: string;
};

type payContactsType = {
  phone: string;
  payer_name: string;
  email?: string;
  zip?: string;
  country?: string;
};

export type creditCardPayParams = {
  article_id: string;
  currency: string;
  card: creditCardParams;
  contacts: payContactsType;
  browser_info?: string;
};
