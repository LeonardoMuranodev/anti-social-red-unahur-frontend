¡Excelente idea! Un buen `README` es la cara de tu proyecto. Dado que ahora tienes un sistema integrado con Docker, Frontend y Backend, la sección de **"Instalación"** es la que más necesita un cambio radical para que tu profesor no tenga que instalar nada manualmente.

Aquí tienes el nuevo `README.md` estructurado y completo:

---

# 🚫 Anti-Social Red - Full Stack Application

> **Trabajo Práctico 2 - Bases de Datos NoSQL** > Universidad Nacional de Hurlingham (UNAHUR)

Sistema Full-Stack de una red "anti-social" desarrollado con una arquitectura orientada a microservicios orquestada por Docker. El sistema permite gestionar publicaciones, comentarios, etiquetas y un sistema de seguimiento, utilizando MongoDB para la persistencia y Redis para la optimización de consultas.

### 👥 Integrantes:

* Dylan Correa, Agustin Fernandes, Leonardo Murano, Tomas Rosales, Matias de la Rosa

---

## 🛠️ Stack Tecnológico

* **Frontend:** React, Vite, TypeScript
* **Backend:** Node.js, Express.js
* **Bases de Datos:** MongoDB (NoSQL), Redis (Caché)
* **Infraestructura:** Docker, Docker Compose
* **Documentación:** Swagger UI

---

## 🚀 Instalación y Despliegue (Docker)

Gracias a la orquestación con Docker Compose, levantar todo el entorno es extremadamente sencillo. No necesitas instalar Node.js, MongoDB ni Redis en tu máquina local.

1. **Clonar el repositorio:**
```bash
git clone https://github.com/LeonardoMuranodev/anti-social-red-unahur-frontend.git
cd tp-anti-social-2

```


2. **Levantar todos los servicios:**
Asegúrate de tener **Docker Desktop** abierto y ejecuta:
```bash
docker compose up --build

```


3. **Acceso a la aplicación:**
Una vez que los contenedores estén corriendo, la aplicación estará disponible en:
* **Frontend:** [http://localhost:5173](http://localhost:5173)
* **API Backend:** [http://localhost:3000](http://localhost:3000)
* **Documentación Swagger:** [http://localhost:3000/docs](http://localhost:3000/docs)
* **Mongo Express (DB Admin):** [http://localhost:8081](http://localhost:8081)



---

## 📚 Documentación y Consignas

| Documento | Enlace |
| --- | --- |
| **Consigna TP (Backend/General)** | [Ver Consigna](./docs/CONSIGNA-BACKEND.md) |
| **Consigna Frontend** | [Enlace a Consigna Frontend](./docs/CONSIGNA-FRONTEND.md) |
| **Modelado NoSQL** | [Justificación del Modelado](./docs/MODELADO-NOSQL.md) |

---

## 💾 Arquitectura y Modelado

Este sistema utiliza un modelo orientado a documentos. Hemos implementado patrones de **Incrustación (Embedding)** para datos que se consultan juntos y **Referencias (Referencing)** para mantener la normalización donde es necesario, logrando un balance entre rendimiento y escalabilidad.

---

## 🧪 Pruebas

Se incluyen herramientas para verificar el funcionamiento del sistema:

* **Postman:** Importar el archivo `/backend/test/colecciones-de-pruebas.json` en Postman para probar todos los endpoints del sistema.
* **Mongo Express:** Accede a [http://localhost:8081](http://localhost:8081) para visualizar, insertar o editar documentos en tiempo real en tu base de datos.

---

### Notas de desarrollo

* El entorno está configurado automáticamente mediante `docker-compose.yml`.
* Los datos de la base de datos de Redis son persistidos en la carpeta local `./redis_data`.

---