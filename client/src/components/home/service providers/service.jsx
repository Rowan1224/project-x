import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { ThemeContext } from '../../../contexts/ThemeContext';

const Service = (props) => {
  // Themes
  const { isLightTheme, theme } = useContext(ThemeContext);
  const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
  const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
  const border = isLightTheme ? theme.light.border : theme.dark.border;
  const currency_text = isLightTheme ? theme.light.currency_text : theme.dark.currency_text;
  const type = isLightTheme ? theme.light.type : theme.dark.type;

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
          <Card.Title>{props.ServiceName}</Card.Title>
          <h5 className={currency_text}>Tk 790</h5>
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
