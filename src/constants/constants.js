
export const BASKET_INIT = "basket_init";
export const BASKET_ADD = "basket_add";
export const BASKET_REMOVE = "basket_remove";


export const STRIPE_CONNECT = "stripe_connect";
export const STRIPE_CREDENTIALS_ADD = "stripe_credentials_add";
export const STRIPE_CREDENTIALS_REMOVE = "stripe_credentials_remove";

export const paymentFields = {
  fullname: 'Arda Zaman',
  email: 'contact@ardazaman.dev',
  phone: '+905426255555',
  billing: {
    line_1: '111 Pine St suite 1815',
    line_2: 'San Francisco, CA',
    city: 'San Francisco',
    state: 'California',
    postal_code: '94111',
    country: 'US'
  },
  shipping: {
    line_1: 'Beytepe Mahallesi, Hacettepe Teknokent',
    line_2: '6. Ar-Ge C Blok No:56',
    city: 'Çankaya',
    state: 'Ankara',
    postal_code: '06800',
    country: 'TR'
  }
}