const stripeApi =
  "sk_test_51OFhTFEPwEDVOkZID6pJaLBw622WXm02CYoaaVqITgtL5iV1am5OoVrzUL2ycG0W1XTHT9LfHQsigxBu8IJ2yJl400RVo9vsDM";

const statusCheckout = async (session_id) => {
  const session = await stripeApi.checkout.sessions.retrieve(session_id);

  if (session) {
    const status = {
      payment_intent: session.payment_intent,
      payment_status: session.payment_status,
      amount: session.amount_total / 100,
      name: session.shipping_details.name,
      email: session.customer_email,
      phone: session.customer_details.phone,
      address: session.shipping_details.address,
    };
    return status;
  } else {
    throw new Error("an error has occurred in the query");
  }
};

module.exports = statusCheckout;
