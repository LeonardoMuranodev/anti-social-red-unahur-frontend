# 🚫 Red Anti-Social API

> **Trabajo Práctico 2 - Bases de Datos NoSQL** > Universidad Nacional de Hurlingham (UNAHUR)

Una API RESTful desarrollada en Node.js para gestionar una red "anti-social". El sistema permite a los usuarios interactuar mediante publicaciones, comentarios, etiquetas y un sistema completo de seguimiento (followers/following).

### 👥 Integrantes:
* Dylan Correa
* Agustin Fernandes
* Leonardo Murano
* Tomas Rosales
* Matias de la Rosa

---

## 🚀 Tecnologías Utilizadas
* **Backend:** Node.js, Express.js
* **ODM:** Mongoose
* **Bases de Datos:** MongoDB, Redis (Caché)
* **Infraestructura:** Docker, Docker Compose
* **Documentación:** Swagger UI

---

## ⚙️ Instalación y Configuración Local

1. **Clonar el repositorio:**
   ```bash
      git clone [https://github.com/EP-UnaHur-2026C1/anti-social-relational-tp-npm_install_milagro.git](https://github.com/EP-UnaHur-2026C1/anti-social-relational-tp-npm_install_milagro.git)
      cd tp-anti-social-red
   ```

2. **Instalar las dependencias:**
   ```bash
      npm install
   ```

3. **Configurar las variables de entorno:**
Crear un archivo `.env` en la raíz del proyecto basándose en la siguiente estructura:
   ```env
   PORT=3000
   MONGO_URI=mongodb://admin:admin1234@127.0.0.1:27017/socialred?authSource=admin
   REDIS_URI=redis://127.0.0.1:6379

   ```

4. **Levantar los servicios de Base de Datos (Docker):**
Asegúrate de tener Docker corriendo e inicia los contenedores de MongoDB, Mongo Express y Redis:
   ```bash
   docker compose up -d

   ```

5. **Ejecutar el servidor en modo desarrollo:**
   ```bash
   npm run dev
   ```

---

## 📚 Documentación de la API (Swagger)

La API cuenta con documentación interactiva generada con Swagger. Una vez que el servidor esté corriendo, puedes acceder a la interfaz gráfica y probar los endpoints desde tu navegador:

👉 **[http://localhost:3000/docs](https://www.google.com/search?q=http://localhost:3000/docs)**

*(Nota: También puedes acceder al panel de administración de la base de datos a través de Mongo Express en `http://localhost:8081`)*

---

## 🧪 Colección de Pruebas (Postman)

Para facilitar la corrección y prueba de todos los flujos del sistema (CRUD completo, follows, etc.), se incluye una colección de pruebas estructurada.

* **Archivo de la colección:** `colecciones-de-pruebas.json` (Ubicado en la carpeta `/test`).
* **Instrucciones:** Importar el archivo JSON en Postman o Insomnia para tener acceso a todos los endpoints pre-configurados con sus respectivos payloads (body).

---

## 💾 Arquitectura y Modelado NoSQL

A diferencia del enfoque relacional utilizado en la primera iteración del proyecto, este sistema ha sido rediseñado utilizando un modelo orientado a documentos con **MongoDB**.

Hemos analizado cada relación del sistema para decidir estratégicamente cuándo utilizar patrones de **Incrustación (Embedding)** y cuándo utilizar **Referencias (Referencing)**, optimizando así el rendimiento de las consultas y la integridad de los datos.

👉 **[Ver justificación detallada del Modelado NoSQL](./docs/MODELADO-NOSQL.md)**

---
## 🖥️ Consigna del TP

👉 **[Ver consigna del TP](./docs/CONSIGNA.md)**