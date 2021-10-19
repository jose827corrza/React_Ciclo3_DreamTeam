import React, { useState, useEffect } from "react";

import { Container, Row, Col, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ContratotForm from "../components/ContratotForm";

const CrearContrato = () => {
  const history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: 0,
    url: "",
    categoria: "",
    disponible: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      //const response = await api.categorias.list();
      //setCategorias(response);
      console.log("hola")
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    setNewProduct({ ...newProduct, [event.target.name]: event.target.value });
  };

  const handleClick = async () => {
    console.log("hola")
   // const apiResponse = await api.products.create(newProduct);
   // if (apiResponse.err) {
   //   setError(apiResponse.err.message);
   //   console.log(apiResponse.err);
    //} else {
    //  setSuccess(apiResponse);
    //  setProductos([...productos, newProduct]);
    //  //history.push("/");
   // }
  };

  return (
    <React.Fragment>
      <h1 className="text-center mt-5 mb-5">Crear contrato</h1>
      <Container>
        <Row className="d-flex justify-content-center align-items-center">
          <Col xs={6}>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <ContratotForm
              handleChange={handleChange}
              handleClick={handleClick}
              categorias={categorias}
              formValue={newProduct}
            />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default CrearContrato;
