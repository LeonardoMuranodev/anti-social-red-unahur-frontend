# 🏛️ Justificación del Modelado NoSQL

En este documento se detallan las decisiones arquitectónicas tomadas para la migración del modelo relacional al modelo orientado a documentos en MongoDB.

## 1. Imágenes de las Publicaciones -> Incrustación (Embedding)
Optamos por incrustar las imágenes directamente dentro del documento de la publicación mediante un array de strings (URLs). Esto se debe a que existe una relación de pertenencia fuerte (1 a pocos) y las imágenes nunca se consultan de forma aislada, sino siempre acompañando al post. Esto evita consultas adicionales a la base de datos.

## 2. Comentarios de las Publicaciones -> Referencia (Referencing)
Utilizamos referencias para los comentarios (colección separada) debido a que la relación es de 1 a N y potencialmente ilimitada. Esto evita sobrepasar el límite de 16MB por documento de MongoDB en caso de posteos virales y facilita las consultas con filtros de fechas requeridos por el negocio.

## 3. Publicaciones y Etiquetas (Tags) -> Referencia mediante Arrays
Para la relación Muchos a Muchos entre Publicaciones y Etiquetas, aprovechamos el modelo documental usando un Array de referencias (ObjectIds) dentro de la Publicación. Esto elimina la necesidad de la tabla intermedia que existía en SQL, mejorando drásticamente la velocidad de lectura.

## 4. Seguidores y Seguidos (Follows) -> Referencia mediante Arrays
El sistema de followers se implementó utilizando Arrays de referencias dentro del documento del Usuario (listas de `seguidores` y `seguidos`). Esto nos permite obtener la red de contactos de una persona consultando un solo documento, eliminando los costosos `JOINs` que requería el modelo relacional.
