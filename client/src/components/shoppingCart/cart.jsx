import React from "react";
import Counter from "../generic/counter";
import { Container, Table } from "react-bootstrap";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import Icon from "@material-ui/core/Icon";
import { useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import { CartContext } from "../../contexts/CartContext";

const Cart = (props) => {
  const { items } = useContext(CartContext);
  let skey = 0;

  return (
    <Container>
      <section className="jumbotron text-center p-5">
        <div className="container">
          <h3 className="jumbotron-heading">Your Cart</h3>
        </div>
      </section>
      <Table striped hover className="shadow">
        <thead>
          <tr>
            <th scope="col"> </th>
            <th scope="col">Product</th>
            <th scope="col" className="text-center">
              Quantity
            </th>
            <th scope="col" className="text-right">
              Price
            </th>
            <th scope="col"> </th>
          </tr>
        </thead>
        <tbody>
          { items.map(item => {
            skey++;
            return(
              <tr key={ uuidv4() }>
                <td style={{ verticalAlign: "middle" }}>
                  <img
                    src={`https://picsum.photos/id/${Math.floor(
                      Math.random() * 1000
                    )}/800`}
                    alt="product_image"
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td style={{ verticalAlign: "middle" }}>{ item.product }</td>
                <td style={{ verticalAlign: "middle" }} className="text-center">
                  <Counter skey={ skey } />
                </td>
                <td style={{ verticalAlign: "middle" }} className="text-right">
                  Tk { item.price }
                </td>
                <td style={{ verticalAlign: "middle" }} className="text-right">
                  <button className="btn btn-sm btn-danger">
                    <DeleteTwoToneIcon />
                  </button>
                </td>
              </tr>
            )
          }) }
        </tbody>
      </Table>
      <div className="row text-center bg-light border mx-auto p-3 shadow">
        <div className="col-sm-12 col-md-4 py-3 mx-auto">
          <div className="mb-2">Grand Total</div>
          <div className="h2 font-weight-light">$234,234</div>
        </div>

        <div className="col-sm-12 col-md-4 py-3 mx-auto">
          <div className="mb-2">Discount</div>
          <div className="h2 font-weight-light">10%</div>
        </div>

        <div className="col-sm-12 col-md-4 py-3 mx-auto">
          <div className="mb-2">Sub - Total amount</div>
          <div className="h2 font-weight-light">$32,432</div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm-12 mb-2 col-md-6">
          <button className="btn btn-block btn-info">
            <Icon
              style={{ verticalAlign: "middle", fontSize: "18px" }}
              className="mr-2 mb-1"
            >
              add_shopping_cart
            </Icon>
            Continue Shopping
          </button>
        </div>
        <div className="col-sm-12 col-md-6 mb-2 text-right">
          <button className="btn btn-block btn-success">
            <Icon
              style={{ verticalAlign: "middle", fontSize: "18px" }}
              className="mr-2 mb-1"
            >
              check
            </Icon>
            Checkout
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Cart;