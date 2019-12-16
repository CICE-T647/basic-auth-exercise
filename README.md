# Basic Login.


## Introducción. 

En este ejercicio, crearemos un proyecto en el que se implementarán los proceso de autorizacion y autenticación que tiene una aplicación real. 


## Iteración 1 - Sign Up

Tendremos que crear una ruta  `/signup` para que nuestros usuarios puedan registrarse. Los usuarios deberán proporcionar la siguiente información: 

- **Username**: Tendrá que ser único y requerido.  
- **Password**: Deberá ser encriptada usando bcrypt / bcryptjs (dependiendo de tu sistema operativo). Tendrá que ser requerida.
- **name**: Nombre requerido del usuario. 
- **role**: deberá tener 2 opciones: `"USER_ROLE"` y `"ADMIN_ROLE"`. Por defecto será USER_ROLE, pero, si se especifica, podrá ser ADMIN_ROLE.

Para completar esta Iteración, deberás crear el modelo con mongoose. 

Además deberá comprobarse que:

- Los campos no estén vacíos. 
- El username no esté repetido en la base de datos. 

## Iteración 2 - Login
Una vez el usuario se ha registrado, tiene que ser capaz de loggearse en la aplicación. Crea un endpoint `/login` Una vez creado el login se deberá crear una sesión con `express-session` y `connect-mongo`

De nuevo se deberán implementar las validaciones para los campos vacíos. 

## Iteración 3 - Logout. 

El usuario tendrá que poderse desconectarse y cerrar la sesión. 
Crea un endpoint `/logout`que permite ejecutar esta funcionalidad. 


## Iteración 4. 

Crea dos rutas adicionales que necesiten de una sesión activa para poder acceder a ellos. 

    - El primer endpoint `/user`será accesible por todos los usuarios, independientemente de su role, siempre y cuando esté registrado y loggeado. 
    - El segundo enpoint `/admin`solo será accesible por aquellos con role: __ADMIN_ROLE__



## Bonus - Fortaleza de la contraseña.

Crea una validación que establezca que la contraseña debe tener ciertos requisitos. 

Puedes usar la librería de npm `zxcvbn`: https://www.npmjs.com/package/zxcvbn


