const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const createCheckOutSession = async (req, res) => {
  try {
    // Create a checkout session with Stripe
    // buổi học là 1 tuần 2-6 buổi (1 buổi : 15$)
    //tính tổng buổi học đăng kí + tiên course: 200$
    // tháng x 100% quý 95% năm là 90%
    // const prices = await stripe.prices.list({
    //   lookup_keys: [req.body.lookup_key],
    //   expand: ['data.product'],
    // });
    const { line_items, idStudent, memberShip, classInWeek, validMembership } = req.body;
    const session = await stripe.checkout.sessions.create({
      // billing_address_collection: "auto",
      line_items: line_items,
      // [
      //   {
      //     price_data: {
      //       currency: "usd",
      //       product_data: {
      //         name: "a",
      //       },
      //       unit_amount: 1000,
      //     },
      //     quantity: 1,
      //   },
      // ],
      payment_method_types: ["card"],
      mode: "payment",
      // success_url: `${process.env.HOST}order/success?idStudent=${idStudent}&memberShip=${memberShip}&classInWeek=${classInWeek}&validMembership=${validMembership}&session_id={CHECKOUT_SESSION_ID}`,
      // cancel_url: `${process.env.HOST}order/cancel?session_id={CHECKOUT_SESSION_ID}`,
      success_url: `https://ola-edu-sevrver.herokuapp.com/order/success?idStudent=${idStudent}&memberShip=${memberShip}&classInWeek=${classInWeek}&validMembership=${validMembership}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://ola-edu-sevrver.herokuapp.com/order/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });

    // res.redirect(303, session.url);
    res.status(200).send({url: session.url});
  } catch (e) {
    // If there is an error send it to the client
    res.status(500).json({ error: e.message });
  }
};
module.exports = {
  createCheckOutSession,
};
