# 🌐 Trabajo Práctico 2: UnaHur Anti-Social Net - Interfaz de Usuario

**Universidad Nacional de Hurlingham (UNAHUR)** | Construcción de Interfaces de Usuario 

## 🎯 Objetivo

Desarrollar el FrontEnd en React para la red social "UnaHur Anti-Social Net", utilizando la API proporcionada por el TP de BackEnd. La aplicación debe permitir que las personas usuarias puedan navegar publicaciones, agregar comentarios, registrarse, iniciar sesión y crear sus propios posteos. Este trabajo incluye una simulación de login; no se requiere autenticación real ni JWT.

---

## 🛠️ Funcionalidades Requeridas

### 🔐 Inicio de Sesión (Login simulado)

* Permite iniciar sesión con un `nickName` y una contraseña fija "123456".


* **Al iniciar:**
* Se realiza un `GET /users` a la API para verificar si el usuario existe.


* La contraseña se valida localmente.


* Si es válido, se guarda el usuario en un contexto global (`useContext`) y se mantiene en `localStorage`.


* Las rutas protegidas solo serán accesibles si hay un usuario logueado.





### 📝 Registro de Usuario

* Formulario para crear un nuevo usuario.


* Verificar que los campos requeridos estén completos antes de enviar.


* Enviar `POST /users`.


* El backend validará que el `nickName` no exista.


* Si el servidor devuelve un error, el frontend debe mostrar el mensaje correspondiente.



### 🏠 Home (Página de Inicio)

* Feed de publicaciones recientes con: descripción, imágenes, etiquetas y cantidad de comentarios.


* Botón "Ver más" que dirige a `/post/:id`.


* El diseño del resto de la página es libre (banners, secciones, datos curiosos, etc.).



### 📄 Detalle de Publicación (`/post/:id`)

* Muestra descripción completa, imágenes y etiquetas.


* Lista de comentarios visibles.


* Formulario para agregar un comentario nuevo (`POST /comments`) mediante un componente controlado con `useState`.



### 👤 Perfil de Usuario (Vista protegida)

* Muestra el `nickName` del usuario actual y su lista de publicaciones.


* Cada post debe mostrar descripción, comentarios y botón "Ver más".


* Incluye botón para cerrar sesión (logout).



### ➕ Crear Nueva Publicación (Vista protegida)

* Formulario con: descripción obligatoria, URLs de imágenes (opcional) y selección de etiquetas obtenidas desde la API.


* **Funcionamiento:**
* Se hace un `POST /posts`.


* Si hay imágenes, se realiza un `POST /postimages` por cada una.


* Al finalizar, redirigir al perfil o mostrar confirmación.





---

## 💻 Requisitos Técnicos

| Tema | Aplicación |
| --- | --- |
| **TypeScript** | Proyecto creado con React + TypeScript |
| **useState, useEffect** | Manejo de estado y carga de datos |
| **useContext / React-router** | Gestión de sesión, rutas protegidas y navegación |
| **Fetch o axios** | Consumo de API REST |
| **CSS / Framework** | Diseño responsive libre (Bootstrap, Tailwind, etc.) |
| **localStorage** | Persistencia de sesión |
| **Validaciones** | Formularios con campos requeridos y feedback visual |

---

## 🔗 Endpoints de la API



| Método | Endpoint | Uso |
| --- | --- | --- |
| GET | `/users` | Lista completa de usuarios |
| GET | `/users/:id` | Obtener usuario por ID |
| POST | `/users` | Crear nuevo usuario |
| GET | `/posts` | Lista de publicaciones |
| GET | `/posts/:id` | Detalle de una publicación |
| GET | `/posts?userId=xxx` | Posts de un usuario específico |
| POST | `/posts` | Crear publicación |
| GET | `/tags` | Listado de etiquetas |
| GET | `/comments/post/:postId` | Comentarios visibles del post |
| POST | `/comments` | Crear comentario nuevo |
| GET | `/postimages/post/:postId` | Traer imágenes asociadas a un post |
| POST | `/postimages` | Asociar una imagen a un post |

---

## 🚀 Entrega

* Subir el código a GitHub (repositorio público).


* README.md con descripción, instrucciones para correr en local y URL de la API.


* Enviar mail a `lucas.figarola@unahur.edu.ar` con datos de integrantes y link al repo.



> 
> **Nota:** Si estás cursando solo la materia de interfaces, usa la API preparada en: [https://github.com/lucasfigarola/backend-api](https://github.com/lucasfigarola/backend-api).
> 
>