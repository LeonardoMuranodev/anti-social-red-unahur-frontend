import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Spinner, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import Post from "../components/Post";
import { AuthContextGlobal } from "../context/AuthContext";
import type { Post as PostData } from "../interfaces/post";
import type { User } from "../interfaces/auth";
import {
  getComentariosCount,
  getPublicaciones,
} from "../services/postServices";
import { getUserById } from "../services/userServices";

interface PostWithComments extends PostData {
  commentCount: number;
}

function Profile() {
  const { user, logout } = useContext(AuthContextGlobal);
  const navigate = useNavigate();

  const [profile, setProfile] = useState<User | null>(user);
  const [posts, setPosts] = useState<PostWithComments[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.id) return;

    const loadProfile = async () => {
      setLoading(true);
      setError("");

      try {
        const [userData, allPosts] = await Promise.all([
          getUserById(user.id),
          getPublicaciones(),
        ]);

        setProfile(userData);

        const userPosts = allPosts.filter(
          (post) => post.user_nickname === userData.nickname,
        );

        const postsWithComments = await Promise.all(
          userPosts.map(async (post) => ({
            ...post,
            commentCount: await getComentariosCount(post._id),
          })),
        );

        setPosts(postsWithComments);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar el perfil",
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user?.id, user?.nickname]);

  const handleLogout = () => {
    logout();
    navigate("/welcome");
  };

  const seguidoresCount = profile?.seguidores?.length ?? 0;
  const seguidosCount = profile?.seguidos?.length ?? 0;

  return (
    <Container fluid className="profile-page py-4">
      <Row className="justify-content-center">
        <Col xs={12} lg={8} xl={7}>
          <Stack gap={4}>
            <section className="profile-header rounded p-4">
              <Row className="align-items-center g-4">
                <Col xs="auto">
                  <div className="profile-avatar" aria-hidden="true">
                    {profile?.nickname?.charAt(0).toUpperCase() ?? "?"}
                  </div>
                </Col>
                <Col>
                  <p className="profile-header__label mb-1">
                    Perfil de usuario
                  </p>
                  <h1 className="profile-header__nickname mb-3">
                    @{profile?.nickname ?? "..."}
                  </h1>

                  <div className="profile-stats d-flex flex-wrap gap-4 mb-3">
                    <div className="profile-stat">
                      <span className="profile-stat__value">
                        {posts.length}
                      </span>
                      <span className="profile-stat__label">Publicaciones</span>
                    </div>
                    <div className="profile-stat">
                      <span className="profile-stat__value">
                        {seguidoresCount}
                      </span>
                      <span className="profile-stat__label">Seguidores</span>
                    </div>
                    <div className="profile-stat">
                      <span className="profile-stat__value">
                        {seguidosCount}
                      </span>
                      <span className="profile-stat__label">Seguidos</span>
                    </div>
                  </div>

                  <div className="d-flex flex-wrap gap-2">
                    <Link to="/" className="btn btn-primary btn-sm">
                      Ir al feed
                    </Link>
                    <Button
                      variant="outline-light"
                      size="sm"
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </Button>
                  </div>
                </Col>
              </Row>
            </section>

            <section>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="profile-section-title h4 mb-0">
                  Mis publicaciones
                </h2>
                {!loading && (
                  <span className="text-light opacity-75">
                    {posts.length} en total
                  </span>
                )}
              </div>

              {loading && (
                <div className="profile-loading text-center py-5">
                  <Spinner animation="border" variant="light" />
                  <p className="mt-3 mb-0">Cargando perfil...</p>
                </div>
              )}

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {!loading && !error && posts.length === 0 && (
                <div className="profile-empty rounded p-4 text-center">
                  <p className="mb-2 fw-semibold">
                    Todavía no publicaste nada.
                  </p>
                  <p className="mb-3 opacity-75">
                    Cuando compartas algo en el feed, va a aparecer acá.
                  </p>
                  <Link to="/" className="btn btn-primary btn-sm">
                    Ir al feed
                  </Link>
                </div>
              )}

              {!loading && !error && posts.length > 0 && (
                <Stack gap={3}>
                  {posts.map((post) => (
                    <Post
                      key={post._id}
                      post={post}
                      commentCount={post.commentCount}
                    />
                  ))}
                </Stack>
              )}
            </section>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
