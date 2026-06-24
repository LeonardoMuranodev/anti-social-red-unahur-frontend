import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Welcome() {
  return (
    <Container fluid>
      <Row>
        <Col>
         <h1>
            Acá nadie se salva.
         </h1>
         <p>
            en antiSocial decidimos ir contra la corriente con nuestra filosofía "worse is better":<br/>
            nada de "likes" ni de "métricas", Acá nos peleamos todos entre todos.
         </p>
         <h2>
            ¿te parece horrible?
         </h2>
         <button>Vení y decilo de frente</button>
        </Col>
        <Col sm={4} className='d-none d-sm-block'>
            fotito de un basurero en llamas
        </Col>
      </Row>
      <br/>
      <Row>
        <Col sm={4}>
         captura de un post
        </Col>
        <Col>
        <h2>
            Sin anuncios ni seguimiento
        </h2>
        <p>
            ninguna empresa en su sano juicio va a querer vincular su nombre con nosotros.
        </p>
        <h2>
            Sin Algoritmos
        </h2>
        <p>
            nuestras controversias son 100% naturales
        </p>
        <h2>
            Sin subscripciones
        </h2>
        <p>
            Nuestro modelo de negocio de ultima generación nos permite mantener el sitio siempre online el 30% de las veces.
        </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>
            Nuestros ideales
          </h1>
          <h2>Worse Is better</h2>
          <h3>lo peor de lo peor, solo para vos.</h3>
          <p>Todos los demás sitios se jactan de su moderación, de ser un "espacio seguro". Nosotros le dimos la vuelta: es todos contra todos.</p>

          <h2>Tus datos, tu problema</h2>
          <p>Para nosotros la privacidad es lo más importante, por eso no compartimos ni vamos a compartir los datos que subís con empresas de terceros. Todo se queda acá, y si no te gusta andate a facebook.</p>

          <h2>¿Grok? ¿quien te conoce?</h2>
          <p>Garantizamos que todos nuestros usuarios son humanos, toxicidad 100% orgánica libre de gluten.</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>antiSocial es un producto de softWorse Co., una compañia de software que esta harta de las boludeces que hacen las otras redes. Ningún billonario (ni trillonario) va a comprarnos y hacer lo que se le cante con nuestros productos, arruinándolos en el proceso. No nos hacemos responsables por lo que hagas y dejes de hacer en nuestro sitio.</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>¿Listo para mandar todo a la #$&*%?</h1>
          <button>Unirse al bardo</button>
        </Col>
      </Row>
      <Row>footer</Row>
    </Container>
  )
}

export default Welcome
