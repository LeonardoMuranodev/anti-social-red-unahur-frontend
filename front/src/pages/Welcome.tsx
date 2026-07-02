import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dumpster from '../assets/hero.png';
import { Button } from 'react-bootstrap';
import Footer from "../components/Footer";
import NavigationBar from '../components/Navbar';
import { Link } from 'react-router';
import AuthModal from '../components/AuthModal';
export default function Welcome() {

  return (
    <>
      <Container fluid className='landing-container'>
        <Row className='justify-content-center'>
          <Col sm={5} className='landing-image d-none d-sm-block'>
              <img src={Dumpster} width='100%' className='img-fluid object-fit-contain' alt={Dumpster}/>
          </Col>
          <Col sm={7} className='landing-text'>
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
           <AuthModal text="veni y decilo de frente"/>
          </Col>
        </Row>

        <br/>

        <Row>
          <Col className='landing-text'>
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
                Los posts que ves y compartís van por cuenta tuya, nunca vamos a mostrarte nada que no quieras ver.
            </p>
            <h2>
                Sin subscripciones
            </h2>
            <p>
                Nuestro modelo de negocio de última generación nos permite mantener nuestro sitio online de forma 100% gratuita para siempre*.
            </p>
          </Col>
          <Col sm={5} className='landing-image'>
           captura de un post
          </Col>
        </Row>

        <br/>

        <Row>
          <Col className='landing-text'>
            <h1>
              Nuestros ideales
            </h1>
            <h2>Worse Is better</h2>
            <h3>lo peor de lo peor, solo para vos.</h3>
            <p>Todos los demás sitios se jactan de su moderación, de ser un "espacio seguro". Nosotros le dimos la vuelta: es todos contra todos.</p>

            <h2>Tus datos, tu problema</h2>
            <p>Para nosotros la privacidad es lo más importante, por eso no compartimos ni vamos a compartir los datos que subís con empresas de terceros. Todo se queda acá, y si no te gusta andate a facebook.</p>

            <h2>¿Grok? ¿quien te conoce?</h2>
            <p>Garantizamos que todos nuestros usuarios son humanos, toxicidad 100% orgánica libre de bots**.</p>
          </Col>
        </Row>

        <br/>

        <Row>
          <Col className='landing-text'>
            <h1>Y a todo esto... ¿quien sos vos?</h1>
            <p>antiSocial es un producto de softWorse Co., una compañia de software que esta harta de las boludeces que hacen las otras redes. Ningún billonario (ni trillonario) va a comprarnos y hacer lo que se le cante con nuestros productos, arruinándolos en el proceso. No nos hacemos responsables por lo que hagas y dejes de hacer en nuestro sitio.</p>
          </Col>
        </Row>

        <br/>

        <Row>
          <Col className='landing-text'>
            <h1>¿Listo para mandar todo a la #$&*%?</h1>
            <AuthModal text="Unirse al bardo"/>
          </Col>
        </Row>

        <br/>

        <Row>
          <p className='fs-6'>
            *O por lo menos hasta que el pasante se de cuenta de que registramos los servidores a su nombre.<br/>
            **No nos hacemos responsables de verificar si un usuario es o no un bot. Si Skynet quiere hacerse una cuenta, es libre de hacerlo.
          </p>
        </Row>
      </Container>
      <Footer/>
    </>
  );
}