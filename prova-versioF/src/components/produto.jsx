import React from "react";
import Card from 'react-bootstrap/Card';

function CardProduto({ title, description, imgSrc }) {
  return (
    <Card className="bg-dark text-white">
      <Card.Img src={imgSrc} alt="Card image" className="bg-opacity-75  " />
      <Card.ImgOverlay>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
}

export default CardProduto;