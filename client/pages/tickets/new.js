import { useState } from "react";
import useRequest from "../../hooks/use-request.hook";
import Router from "next/router";
const NewTicket = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/tickets",
    method: "post",
    body: {
      title,
      price: parseFloat(price),
    },
    onSuccess: () => Router.push("/"),
  });
  const onBlur = (e) => {
    const value = parseFloat(price);
    if (isNaN(value)) {
      return;
    }
    setPrice(value.toFixed(2));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    doRequest();
  };
  return (
    <div>
      <h1>Create Ticket</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            className="form-control"
            value={price}
            onBlur={onBlur}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        {errors}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
export default NewTicket;
