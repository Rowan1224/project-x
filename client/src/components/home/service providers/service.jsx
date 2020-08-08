import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { ThemeContext } from '../../../contexts/ThemeContext';

const Service = (props) => {
  // Themes
  const { isLightTheme, theme } = useContext(ThemeContext);
  const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
  const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
  const border = isLightTheme ? theme.light.border : theme.dark.border;
  const custom_text = isLightTheme ? theme.light.custom_text : theme.dark.custom_text;
  const currency_text = isLightTheme ? theme.light.currency_text : theme.dark.currency_text;
  const type = isLightTheme ? theme.light.type : theme.dark.type;

  // console.log(props.serviceInfo);

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
          <Card.Title>{props.serviceInfo.product_id}</Card.Title>
          <h5 className={currency_text}>Tk {props.serviceInfo.price}</h5>
          <h6 className={custom_text}>Qty: {props.serviceInfo.delivery_limit}</h6>
          <Card.Text className="text-center">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab enim
            dolores et error accusamus tenetur nemo totam provident. Provident
            sit asperiores veritatis dolor iure, enim alias? Ea id praesentium
            reiciendis?
          </Card.Text>
          <Button variant={type}>Add to cart</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Service;
