# proyecto_ai2
Este repositorio contiene el código desarrollado tanto en el backend como en el frontend de la funcionalidad "Nómina"

# Configuración
## Herramientas del Backend
Para correr el backed se requiere de Spring Tool Suite [`Spring Tool Suite`](https://spring.io/tools)
<a href="https://ibb.co/tBFDRk2"><img src="https://i.ibb.co/Y2whgYd/image.png" alt="spt-page" border="0"></a><br>
- Se decargará un archivo .jar <br>
<a href="https://ibb.co/T25hr7B"><img src="https://i.ibb.co/r0JyvzG/image.png" alt="spt-jar" border="0"></a><br>
- Lo abren y se lanzará una pequeña ventana con una barra de progreso (dejen que se cierre solo). <br>
<a href="https://ibb.co/MpszTq9"><img src="https://i.ibb.co/S0PkTqJ/image.png" alt="spt-progreso" border="0"></a><br>
- Aparecerá una carpeta nombre "sts-*" <br>
<a href="https://ibb.co/X3WY9X7"><img src="https://i.ibb.co/LJ0NMSx/image.png" alt="spt-carpeta" border="0"></a><br>
- La abren y encontrarán un ejecutable con ícono verde <br>
<a href="https://ibb.co/3fqmgpg"><img src="https://i.ibb.co/TKSM949/image.png" alt="spt-exe" border="0"></a><br>
- Crea un acceso directo en tu escritorio (todavía no lo abras). <br>
<a href="https://ibb.co/WD7rD8f"><img src="https://i.ibb.co/3fVxf6c/image.png" alt="spt-shortcut" border="0"></a><br>
- Descargar la aplicación [`lombok`](https://projectlombok.org/download) <br>
- Lo abren y puede que les salte una ventana en la que tienen que dar a aceptar. <br>
<a href="https://ibb.co/7gqRNcy"><img src="https://i.ibb.co/HNjxpvg/image.png" alt="lombok-installer" border="0"></a><br>
- Seleccionan "Specify location..." , buscan donde se encuentra la carpeta "sts-*" que anteriormente se creó y la selecionan, dan click en el boton "Select" <br>
<a href="https://ibb.co/PNL6wGZ"><img src="https://i.ibb.co/xDk7JqS/image.png" alt="lombok-select" border="0"></a><br>
- Dan click en el botón "Install/Update" luego click en "Quit Installer" <br>
<a href="https://ibb.co/XSBQbf3"><img src="https://i.ibb.co/Wg9h6NP/image.png" alt="lombok-quit" border="0"></a><br>
- Asegurarse de que "mongo" y "mongod" ya estén en funcionamiento <br>
<a href="https://ibb.co/QnWHvhN"><img src="https://i.ibb.co/d6Np4X2/image.png" alt="mongod-launch" border="0"></a>
<a href="https://ibb.co/hmXQJsQ"><img src="https://i.ibb.co/W2D84n8/image.png" alt="mongo-launch" border="0"></a>
- En la consola de "mongo" usar el siguiente comando para crear la base de datos:
```bash
use nominaDB
```
Puedes escoger otro nombre pero debes cambiarlo también en el archivo "application.yml" que se encuentra en "src\main\resources".<br><br>
**NOTA: La aplicación funciona con una base de datos vacía previamente creada, las tablas se crean automáticamente en esa base la primera vez que se ejecute el proyecto**
- Listo, ya pueden correr el proyecto desde el Spring Tool Suite
- Puedes acceder a la documentación de los servicios y verificar su funcionamiento en: http://localhost:8081/api-doc.html <br>
<a href="https://ibb.co/C0hzC7F"><img src="https://i.ibb.co/mz6GZq7/image.png" alt="swagger-ui" border="0"></a>

## Notas de la versión preliminar: 
- Aún no se ha resuelto el mapeo de tipos de datos para el uso de fechas entre Java y MongoDB.
- El campo id es String debido a que aún no se logra implementar que cuando sea de tipo int o long se autoincremente.

Si tienes algún problema por favor deja un comentario en la sección "Issues" o contáctame al correo: djfibepro@gmail.com 

