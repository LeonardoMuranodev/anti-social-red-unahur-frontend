import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Spinner, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router"; 
import Post from "../components/Post";
import { AuthContextGlobal } from "../context/AuthContext";
import type { User } from "../interfaces/auth";
import NavigationBar from "../components/Navbar";
import { useFeed } from "../hooks/useFeed";

function Profile() {
  const { user, logout } = useContext(AuthContextGlobal);
  const navigate = useNavigate();
  const [profile, setProfile] = useState<User | null>(user);
  const { posts, isLoading, error, setCurrentFeed } = useFeed();

  useEffect(() => {
    setCurrentFeed("personal_feed");
  }, [setCurrentFeed]);

  const handleLogout = () => {
    logout();
    navigate("/welcome");
  };

  const listaSeguidores = user.seguidores || user?.seguidores || [];
  const listaSeguidos = user.seguidos || user?.seguidos || [];

  const seguidoresCount = listaSeguidores.length;
  const seguidosCount = listaSeguidos.length;

  return (
    <>
      <NavigationBar />
      <br/>
      <br/>
      <br/>
      <br/>
      <Container fluid className="profile-page py-4">
        <Row className="justify-content-center">
          <Col xs={12} lg={8} xl={7}>
            <Stack gap={4}>
              
              <section className="profile-header rounded p-4 bg-dark border border-secondary">
                <Row className="align-items-center g-4 mb-4">
                  <Col xs="auto">
                    <div className="profile-avatar" aria-hidden="true" style={{ width: '80px', height: '80px', fontSize: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#495057', borderRadius: '50%' }}>
                      {profile?.nickname?.charAt(0).toUpperCase() ?? "?"}
                    </div>
                  </Col>
                  <Col>
                    <p className="profile-header__label mb-1 text-muted">Perfil de usuario</p>
                    <h1 className="profile-header__nickname mb-3">@{profile?.nickname ?? "..."}</h1>

                    <div className="profile-stats d-flex flex-wrap gap-4 mb-3">
                      <div className="profile-stat">
                        <span className="profile-stat__value fw-bold fs-5 d-block">{posts.length}</span>
                        <span className="profile-stat__label text-muted small">Publicaciones</span>
                      </div>
                      <div className="profile-stat">
                        <span className="profile-stat__value fw-bold fs-5 d-block">{seguidoresCount}</span>
                        <span className="profile-stat__label text-muted small">Seguidores</span>
                      </div>
                      <div className="profile-stat">
                        <span className="profile-stat__value fw-bold fs-5 d-block">{seguidosCount}</span>
                        <span className="profile-stat__label text-muted small">Seguidos</span>
                      </div>
                    </div>

                    <div className="d-flex flex-wrap gap-2">
                      <Link to="/" className="btn btn-primary btn-sm px-3">Ir al feed</Link>
                      <Button variant="outline-light" size="sm" onClick={handleLogout} className="px-3">Cerrar sesión</Button>
                    </div>
                  </Col>
                </Row>

                <Row className="pt-3 border-top border-secondary">
                  <Col xs={12} md={6} className="mb-4 mb-md-0">
                    <h6 className="text-white-50 mb-3 text-uppercase small tracking-wide">Tus Seguidores</h6>
                    <Stack gap={2}>
                      {listaSeguidores.length === 0 ? (
                        <span className="text-muted small fst-italic">Aún no tenés seguidores.</span>
                      ) : (
                        listaSeguidores.map((seg: any, idx: number) => {
                          const nombre = typeof seg === 'string' ? seg : seg.nickname || 'Usuario';
                          return (
                            <div key={`seg-${idx}`} className="d-flex align-items-center gap-2 bg-secondary bg-opacity-25 p-2 rounded">
                              <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center text-white" style={{ width: '28px', height: '28px', fontSize: '12px' }}>
                                {nombre.charAt(0).toUpperCase()}
                              </div>
                              <span className="text-light fw-medium">@{nombre}</span>
                            </div>
                          )
                        })
                      )}
                    </Stack>
                  </Col>

                  <Col xs={12} md={6}>
                    <h6 className="text-white-50 mb-3 text-uppercase small tracking-wide">A quiénes seguís</h6>
                    <Stack gap={2}>
                      {listaSeguidos.length === 0 ? (
                        <span className="text-muted small fst-italic">No seguís a nadie todavía.</span>
                      ) : (
                        listaSeguidos.map((sub: any, idx: number) => {
                          const nombre = typeof sub === 'string' ? sub : sub.nickname || 'Usuario';
                          return (
                            <div key={`sub-${idx}`} className="d-flex align-items-center gap-2 bg-secondary bg-opacity-25 p-2 rounded">
                              <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white" style={{ width: '28px', height: '28px', fontSize: '12px' }}>
                                {nombre.charAt(0).toUpperCase()}
                              </div>
                              <span className="text-light fw-medium">@{nombre}</span>
                            </div>
                          )
                        })
                      )}
                    </Stack>
                  </Col>
                </Row>
              </section>

              <section>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="profile-section-title h4 mb-0 text-white">Mis publicaciones</h2>
                  {!isLoading && (
                    <span className="text-light opacity-75 small">{posts.length} en total</span>
                  )}
                </div>

                {isLoading && (
                  <div className="profile-loading text-center py-5">
                    <Spinner animation="border" variant="light" />
                    <p className="mt-3 mb-0 text-white">Cargando perfil...</p>
                  </div>
                )}

                {error && (
                  <div className="alert alert-danger" role="alert">{error}</div>
                )}

                {!isLoading && !error && posts.length === 0 && (
                  <div className="profile-empty rounded p-4 text-center bg-dark text-white border border-secondary">
                    <p className="mb-2 fw-semibold">Todavía no publicaste nada.</p>
                    <p className="mb-3 opacity-75 small">Cuando compartas algo en el feed, va a aparecer acá.</p>
                    <Link to="/" className="btn btn-primary btn-sm">Ir al feed</Link>
                  </div>
                )}

                {!isLoading && !error && posts.length > 0 && (
                  <Stack gap={3}>
                    {posts.map((post) => (
                      <Post key={post._id} post={post} commentCount={post.commentCount} />
                    ))}
                  </Stack>
                )}
              </section>
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Profile;