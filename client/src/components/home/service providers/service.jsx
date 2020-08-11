import React, { useContext, useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { ThemeContext } from '../../../contexts/ThemeContext';

const Service = (props) => {
  const [productDetails, setProductDetails] = useState({});

  // componentDidMount
  useEffect(() => {
    const API_URL = "/getProductDetails/";

    const loadData = async () => {
      const productID = {
        "product_id": props.serviceInfo.product_id
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productID),
      });

      const data = await response.json();

      setProductDetails(data.products[0]);
    };
    loadData();
  }, [props.serviceInfo.product_id]);

  const price = Math.floor(props.serviceInfo.price+(props.serviceInfo.price*productDetails.vat)/100);

  // Themes
  const { isLightTheme, theme } = useContext(ThemeContext);
  const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
  const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
  const border = isLightTheme ? theme.light.border : theme.dark.border;
  const custom_text = isLightTheme ? theme.light.custom_text : theme.dark.custom_text;
  const currency_text = isLightTheme ? theme.light.currency_text : theme.dark.currency_text;
  const type = isLightTheme ? theme.light.type : theme.dark.type;

  // console.log(productDetails);

  return (
    <div className='col-xl-4 col-md-6 col-sm-12 mb-4 text-center'>
      <Card className={"shadow" + ui + border}>
        <div className="inner">
          <Card.Img
            variant="top"
            src={`https://picsum.photos/id/${Math.floor(
              Math.random() * 1000
            )}/800`}
            onError={(e)=>{e.target.onerror = null; e.target.src="/img/Default.png"}}
            alt="card image"
          />
        </div>
        <Card.Body className={syntax}>
          <Card.Title>{productDetails.product_name}</Card.Title>
          <h5 className={currency_text}>Tk {price}</h5>
          <p className={custom_text}>(Including vat)</p>
          <Card.Text>
            Vat: {productDetails.vat}% <br />
            Quantity: {productDetails.measure} <br />
            Company Name: {productDetails.company_name}
          </Card.Text>
          <Button variant={type}>Add to cart</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Service;
