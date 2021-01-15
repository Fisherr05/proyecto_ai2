# proyecto_ai2
Este repositorio contiene el código desarrollado tanto en el backend como en el frontend de la funcionalidad "Nómina"

Para correr el backed se requiere de Spring Boot Suite, en el siguiente enlace lo pueden descargar:
  https://spring.io/tools
- Se decargará un archivo .jar, lo abren y se lanzará una pequeña ventana con una barra de progreso (dejen que se cierre solo).
- Deben ir a su carpeta de descargas y encontraran una carpeta cque comiensa con el combre "sts-*", lo abren y encontrarán un ejecutable con ícono verde, crea un acceso directo en   tu escritorio (todavía no lo abras).
- Descargar la aplicación lombok:
  https://projectlombok.org/download
- Lo abren y puede que les salte una ventana en la que tienen que dar a aceptar.
- Seleccionan "Specify location..." , buscan donde se encuentra la carpeta "sts-*" que anteriormente se creó y la selecionan, dan click en el boton "Select"
- Dan click en el botón "Install/Update" luego click en "Quit Installer"
- Asegurarse de que "mongo" y "mongod" ya estén en funcionamiento
- En la consola de "mongo" usar el siguiente comando para crear la base de datos: "use nominaDB" (Puedes escoger otro nombre pero debes cambiarlo tambié en el archivo      "application.yml" que se encuentra en "src\main\resources" ).
- Listo, ya pueden correr el proyecto desde el Spring Boot Suite
- Puedes acceder a la documentación de los servicios y verificar su funcionamiento en: http://localhost:8081/api-doc.html


Notas de la versión preliminar: 
- Aún no se ha resuelto el mapeo de tipos de datos para el uso de fechas entre Java y MongoDB.
- El campo id es String debido a que aún no se logra implementar que cuando sea de tipo int o long se autoincremente.

Si tienes algún problema por favor deja un comentario en la sección "Issues" o contáctame al correo: djfibepro@gmail.com 

