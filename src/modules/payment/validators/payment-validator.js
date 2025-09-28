function validatePayment(data) {
  if (!data.card_number || !/^[0-9]{13,19}$/.test(data.card_number)) {
    throw new Error("INVALID CARD NUMBER");
  }

  if (!data.card_name || typeof data.card_name !== "string" || data.card_name.length > 100) {
    throw new Error("INVALID CARD NAME");
  }

  if (!data.expiration_date || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiration_date)) {
    throw new Error("INVALID EXPIRATION DATE");
  }

  if (!data.cvv || !/^[0-9]{3,4}$/.test(data.cvv)) {
    throw new Error("INVALID CVV");
  }
}

module.exports = { validatePayment };
