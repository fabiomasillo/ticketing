import React, { useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import Router from "next/router";
import useRequest from "../../hooks/use-request.hook";
const OrderShow = ({ currentUser, order }) => {
  const [timeLeft, setTimeLeft] = React.useState(0);
  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: { orderId: order.id },
    onSuccess: () => Router.push("/orders"),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msleft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msleft / 1000));
    };
    findTimeLeft();
    const timer = setInterval(findTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  if (timeLeft <= 0) {
    return <div>Order Expired</div>;
  }
  return (
    <div>
      <h1>{timeLeft} seconds until order expires</h1>
      <StripeCheckout
        token={({ id }) => {
          console.log(id);
          doRequest({ token: id });
        }}
        stripeKey="pk_test_51QL3WpAIlydG80wVoqvAXvOCg8ADCjbnTRGeXUQ1MZkNz5l9ADXRtnxGZgCjqe4sl1zD20HTLJBGsg9z5LJzTvUY00mPWxkRUK"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      ></StripeCheckout>
      {errors}
    </div>
  );
};

OrderShow.getInitialProps = async (ctx, client) => {
  const { orderId } = ctx.query;
  const { data } = await client.get(`/api/orders/${orderId}`);
  return { order: data };
};
export default OrderShow;
