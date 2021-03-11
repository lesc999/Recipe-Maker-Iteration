import React from 'react';
import parse from 'html-react-parser';
import { Card, Accordion, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useInventory, useSetInventory } from '../contexts/InventoryContexts';

function RecipeDisplay(props) {
  const inventory = useInventory();
  console.log("instructions", props.recipe.instructions)
  if(!props.recipe.instructions){props.recipe.instructions = "Psh, figure it out."}

  // const dietLabels = [vegetarian, vegan, glutenFree, dairyFree].reduce((acc, ele, index) => {
  //   if (props[ele] === false) {
  //     acc.push(
  //       <ListGroup.Item
  //         key={`rddl${index}`}
  //         style={{ textTransform: 'capitalize', textDecorationLine: 'line-through' }}
  //       >
  //         {ele}
  //       </ListGroup.Item>
  //     );
  //   } else if (props[ele] === true) {
  //     acc.push(
  //       <ListGroup.Item key={`rddl${index}`} style={{ textTransform: 'capitalize' }}>
  //         {ele}
  //       </ListGroup.Item>
  //     );
  //   }
  //   return acc;
  // }, []);

  return (
    <div>
      <Accordion >
      <Card className="p-3" style={{ flex: 1 }}>
        <Card.Header>
          <strong>{props.recipe.title}</strong>
        </Card.Header>
        <Card.Img
          variant="top"
          src={props.recipe.image}
          className="mx-auto d-block"
          style={{ maxWidth: '150px' }}
          alt="Food Img"
        />
        <Accordion.Toggle as={Button} variant="link" eventKey={props.recipe.title}>
        Show Instructions
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={props.recipe.title}>
        <Card.Body>
          <Card.Text>
            <strong>Ingredients: </strong>
            {parse(props.recipe.ingredients)}
          </Card.Text>
          <Card.Text>
            <strong>Instructions: </strong>
            {parse(props.recipe.instructions)}
          </Card.Text>
        </Card.Body>
        </Accordion.Collapse>
        {/* <Card.Footer>
        <ListGroup horizontal>{dietLabels}</ListGroup>
      </Card.Footer> */}
      </Card>
      </Accordion>
    </div>
  );
}

export default RecipeDisplay;
