# Cypress Real-World App - Guía de Pruebas

\*\* subir docker compose up

Username: Heath93 (o Katharina_Bernier)

Password: s3cret

💬 **Nota de los mantenedores**
Esta aplicación es puramente para fines de demostración y educativos. Su configuración y estructura se asemejan a las de las aplicaciones típicas del mundo real, pero no es un sistema de producción completo. Utiliza esta aplicación para aprender, experimentar, cacharrear y practicar pruebas de aplicaciones con Cypress.
¡Felices pruebas!

---

#### Características

🛠 Construido con [React](https://reactjs.org), [XState](https://xstate.js.org), [Express](https://expressjs.com), [lowdb](https://github.com/typicode/lowdb), [Material-UI](https://material-ui.com) y [TypeScript](https://typescriptlang.org)  
⚡️ Cero dependencias de base de datos  
🚀 Aplicación full-stack [Express](https://expressjs.com)/[React](https://reactjs.org) con características y pruebas del mundo real  
👮‍♂️ Autenticación local  
🔥 Sembrado de base de datos con pruebas de extremo a extremo (End-to-end)  
💻 CI/CD + [Cypress Cloud](https://cloud.cypress.io/projects/7s5okt/runs)

#### Primeros pasos

La aplicación Cypress Real-World App (RWA) es una aplicación full-stack Express/React respaldada por una base de datos JSON local ([lowdb](https://github.com/typicode/lowdb)).

La aplicación viene empaquetada con [datos de ejemplo](./data/database.json) (data/database.json) que contienen todo lo que necesitas para comenzar a usar la aplicación y ejecutar pruebas de forma inmediata.

🚩 **Nota**
Puedes iniciar sesión en la aplicación con cualquiera de los [usuarios de ejemplo de la aplicación](./data/database.json#L2). La contraseña predeterminada para todos los usuarios es `s3cret`. Los usuarios de ejemplo se pueden ver ejecutando `yarn list:dev:users`.

##### Prerrequisitos

Este proyecto requiere tener instalado [Node.js](https://nodejs.org/en/) en tu máquina. Consulta el archivo [.node-version](./.node-version) para conocer la versión exacta.

También se requiere [Yarn Classic](https://classic.yarnpkg.com/). Una vez que tengas instalado [Node.js](https://nodejs.org/en/), ejecuta lo siguiente para instalar el módulo npm [yarn](https://www.npmjs.com/package/yarn) (Classic - versión 1) de forma global.

Si tienes habilitada la función experimental [Corepack](https://nodejs.org/dist/latest/docs/api/corepack.html) de Node.js, debes omitir el paso `npm install yarn@1 -g` para instalar Yarn Classic globalmente. El proyecto RWA está configurado localmente para que Corepack use Yarn Classic (versión 1).

###### Yarn Modern

**Este proyecto no es compatible con** **[Yarn Modern](https://yarnpkg.com/)** **(versión 2 y posterior).**

##### Instalación

Para clonar el repositorio en tu sistema local e instalar las dependencias, ejecuta los siguientes comandos:

_(Nota: Los comandos específicos de clonación e instalación no se encuentran explícitamente detallados en el archivo original)_

###### Los usuarios de Mac con chips de la serie M deberán anteponer `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true`.

##### Ejecutar la aplicación

🚩 **Nota**
La aplicación se ejecutará en el puerto 3000 (frontend) y 3001 (API backend) de forma predeterminada. Asegúrate de que no haya otras aplicaciones o servicios ejecutándose en ambos puertos. Si deseas cambiar los puertos predeterminados, puedes hacerlo modificando las variables `PORT` y `VITE_BACKEND_PORT` en el archivo `.env`. Sin embargo, asegúrate de no confirmar en Git los números de puerto modificados en `.env`, ya que los entornos de CI todavía esperan que la aplicación se ejecute en los puertos predeterminados.

##### Iniciar Cypress

🚩 **Nota**
Si has cambiado los puertos predeterminados, debes actualizar el archivo de configuración de Cypress (`cypress.config.ts`) localmente. Hay tres propiedades que debes actualizar en `cypress.config.ts`: `e2e.baseUrl`, `expose.apiUrl`, y `expose.codeCoverage.url`. El número de puerto en `e2e.baseUrl` corresponde a la variable `PORT` en el archivo `.env`. Del mismo modo, el número de puerto en `expose.apiUrl` y `expose.codeCoverage.url` corresponde a `VITE_BACKEND_PORT`. Por ejemplo, si has cambiado `PORT` a `13000` y `VITE_BACKEND_PORT` a `13001` en el archivo `.env`, tu `cypress.config.ts` debería verse similar al siguiente fragmento:

_(Nota: El fragmento de código de configuración de ejemplo no se detalla en el archivo original)_

Evita confirmar el archivo `cypress.config.ts` modificado en Git, ya que los entornos de CI todavía esperan que la aplicación se ejecute en los puertos predeterminados.

#### Pruebas

| Tipo      | Ubicación                                |
| --------- | ---------------------------------------- |
| api       | [cypress/tests/api](./cypress/tests/api) |
| ui        | [cypress/tests/ui](./cypress/tests/ui)   |
| component | [src/(junto al componente)](./src)       |
| unit      | [src/**tests**](./src/__tests__)         |

#### Base de datos

- La base de datos JSON local se encuentra en [data/database.json](./data/database.json) y se gestiona con [lowdb](https://github.com/typicode/lowdb).
- La base de datos se [vuelve a sembrar](./data/database-seed.json) cada vez que se inicia la aplicación (a través de `yarn dev`). El sembrado de la base de datos se realiza entre cada [prueba de Cypress de extremo a extremo (End-to-End)](./cypress/tests).
- Las actualizaciones a través del frontend de React se envían al servidor [Express](https://expressjs.com) y se gestionan mediante un conjunto de [utilidades de base de datos](backend/database.ts).
- Genera una nueva base de datos usando `yarn db:seed`.
- Se proporciona un [sembrado de base de datos vacío](./data/empty-seed.json) junto con un script (`yarn start:empty`) para ver la aplicación sin datos.

#### Scripts de NPM adicionales

| Script         | Descripción                                                                                                                                                                                         |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dev            | Inicia el backend en modo de observación (watch mode) y el frontend                                                                                                                                 |
| dev:coverage   | Inicia el backend en modo de observación y el frontend con la cobertura de código instrumentada habilitada                                                                                          |
| dev:auth0      | Inicia el backend en modo de observación y el frontend; [Utiliza Auth0 para la autenticación](#auth0) > [Leer Guía](http://on.cypress.io/auth0)                                                     |
| dev:okta       | Inicia el backend en modo de observación y el frontend; [Utiliza Okta para la autenticación](#okta) > [Leer Guía](http://on.cypress.io/okta)                                                        |
| dev:cognito    | Inicia el backend en modo de observación y el frontend; [Utiliza Cognito para la autenticación](#amazon-cognito) > [Leer Guía](http://on.cypress.io/amazon-cognito)                                 |
| dev:google     | Inicia el backend en modo de observación y el frontend; [Utiliza Google para la autenticación](#google) > [Leer Guía](https://docs.cypress.io/guides/testing-strategies/google-authentication.html) |
| start          | Inicia el backend y el frontend                                                                                                                                                                     |
| types          | Valida los tipos                                                                                                                                                                                    |
| db:seed        | Genera semillas frescas de base de datos para archivos json en /data                                                                                                                                |
| start:empty    | Inicia el backend, el frontend y Cypress con el sembrado de base de datos vacío                                                                                                                     |
| tsnode         | Comando ts-node personalizado para evadir las restricciones de react-scripts                                                                                                                        |
| list:dev:users | Proporciona el id y el nombre de usuario de los usuarios en la base de datos de desarrollo                                                                                                          |

Para una lista completa de scripts consulta [package.json](./package.json)

#### Reporte de cobertura de código

La aplicación Cypress Real-World App utiliza el complemento [@cypress/code-coverage](https://github.com/cypress-io/code-coverage) para generar informes de cobertura de código para el frontend y el backend de la aplicación.

Para generar un informe de cobertura de código:

1. Inicia el servidor de desarrollo con la cobertura habilitada ejecutando `yarn dev:coverage`.
2. Ejecuta `yarn cypress:run --env coverage=true` y espera a que se complete la ejecución de la prueba.
3. Una vez completada la ejecución de la prueba, puedes ver el informe en `coverage/index.html`.

#### Proveedores de autenticación de terceros

El soporte para la autenticación de terceros está disponible en la aplicación para demostrar los conceptos de inicio de sesión con un proveedor externo.

La aplicación contiene diferentes puntos de entrada para cada proveedor. Hay un archivo **index** separado para cada proveedor, y para usar uno, debes reemplazar el archivo **index.tsx** actual con el deseado. Se admiten los siguientes proveedores:

- [Auth0](#auth0) (index.auth0.tsx)
- [Okta](#okta) (index.okta.tsx)
- [Amazon Cognito](#amazon-cognito) (index.cognito.tsx)
- [Google](#google) (index.google.tsx)

##### Auth0

Las pruebas de [Auth0](https://auth0.com/) se han reescrito para aprovechar nuestros comandos [cy.session](https://docs.cypress.io/api/commands/session) y [cy.origin](https://docs.cypress.io/api/commands/origin).

Los prerrequisitos incluyen una cuenta de Auth0 y un Tenant configurado para su uso con una SPA. Las variables de entorno de Auth0 deben colocarse en el archivo [.env](./.env). Para obtener más detalles, consulta [Configuración de la aplicación Auth0](http://on.cypress.io/auth0#Auth0-Application-Setup) y [Configuración de credenciales de la aplicación Auth0 en Cypress](http://on.cypress.io/auth0#Setting-Auth0-app-credentials-in-Cypress).

Para iniciar la aplicación con Auth0, reemplaza el archivo **src/index.tsx** actual con el archivo **src/index.auth0.tsx** e inicia la aplicación con `yarn dev:auth0` y ejecuta Cypress con `yarn cypress:open`.

La única especificación (spec) que pasará en esta rama será la [especificación de auth0](./cypress/tests/ui-auth-providers/auth0.spec.ts); todas las demás fallarán. Ten en cuenta que tu usuario de prueba deberá autorizar tu aplicación de Auth0 antes de que las pruebas pasen.

##### Okta

Se ha escrito una [guía detallada sobre la adaptación de la RWA](http://on.cypress.io/okta) para usar [Okta](https://okta.com) y explicar el comando programático utilizado para las pruebas de Cypress.

Los prerrequisitos incluyen una cuenta de [Okta](https://okta.com) y una [aplicación configurada para su uso con una SPA](https://developer.okta.com/docs/guides/sign-into-spa/react/create-okta-application/). Las variables de entorno de [Okta](https://okta.com) deben colocarse en el archivo [.env](./.env).

Para iniciar la aplicación con Okta, reemplaza el archivo **src/index.tsx** actual con el archivo **src/index.okta.tsx** e inicia la aplicación con `yarn dev:okta` y ejecuta Cypress con `yarn cypress:open`.

La **única especificación que pasará en esta rama** será la [especificación de okta](./cypress/tests/ui-auth-providers/okta.spec.ts); todas las demás fallarán.

##### Amazon Cognito

Se ha escrito una [guía detallada sobre la adaptación de la RWA](http://on.cypress.io/amazon-cognito) para usar [Amazon Cognito](https://aws.amazon.com/cognito) como la solución de autenticación y explicar el comando programático utilizado para las pruebas de Cypress.

Los prerrequisitos incluyen una cuenta de [Amazon Cognito](https://aws.amazon.com/cognito). Las variables de entorno de [Amazon Cognito](https://aws.amazon.com/cognito) son proporcionadas por la [CLI de AWS Amplify](https://amplify.aws).

- Se requiere un grupo de usuarios (user pool; no se utiliza el grupo de identidad aquí)
  - El grupo de usuarios debe tener un dominio de interfaz de usuario alojado (hosted UI) configurado, el cual debe:
    - permitir URLs de retorno y de cierre de sesión de `http://localhost:3000/`,
    - permitir el tipo de concesión implícita de OAuth (implicit grant OAuth),
    - permitir estos alcances (scopes) de OpenID Connect:
      - aws.cognito.signin.user.admin
      - email
      - openid
  - El grupo de usuarios debe tener un cliente de aplicación (app client) configurado, con:
    - el flujo de autenticación habilitado `ALLOW_USER_PASSWORD_AUTH`, únicamente para la modalidad de inicio de sesión programático de la prueba.
    - La modalidad de prueba con `cy.origin()` solo requiere el flujo de autenticación `ALLOW_USER_SRP_AUTH`, y no requiere `ALLOW_USER_PASSWORD_AUTH`.
  - El grupo de usuarios debe tener un usuario correspondiente a las variables de entorno de `AWS_COGNITO` mencionadas a continuación, y el estado de confirmación del usuario debe ser "Confirmado" (Confirmed). Si está en "Forzar restablecimiento de contraseña" (Force Reset Password), utiliza un navegador para iniciar sesión una vez en `http://localhost:3000` mientras se ejecuta `yarn dev:cognito` para restablecer su contraseña.

Los controles de prueba están en algunos lugares:

- El archivo `.env` tiene `VITE_AUTH_TOKEN_NAME` y variables que comienzan con `AWS_COGNITO`. Ten cuidado de no confirmar ningún secreto.
- Tanto `scripts/mock-aws-exports.js` como `scripts/mock-aws-exports-es5.js` deben tener los mismos datos; solo difieren sus declaraciones de exportación. Estos archivos se pueden editar manualmente o exportar desde la CLI de Amplify.
- `cypress.config.ts` tiene `cognito_programmatic_login` para controlar la modalidad de la prueba.

Para iniciar la aplicación con Cognito, reemplaza el archivo **src/index.tsx** actual con el archivo **src/index.cognito.tsx** e inicia la aplicación con `yarn dev:cognito` y ejecuta Cypress con `yarn cypress:open`. Es posible que se deba haber ejecutado `yarn dev` una vez antes.

La **única especificación que pasará en esta rama** será la [especificación de cognito](./cypress/tests/ui-auth-providers/cognito.spec.ts); todas las demás fallarán.

##### Google

Se ha escrito una [guía detallada sobre la adaptación de la RWA](https://docs.cypress.io/guides/testing-strategies/google-authentication.html) para usar [Google](https://google.com) como solución de autenticación y explicar el comando programático utilizado para las pruebas de Cypress.

Los prerrequisitos incluyen una cuenta de [Google](https://google.com). Las variables de entorno de [Google](https://google.com) deben colocarse en el archivo [.env](./.env).

Para iniciar la aplicación con Google, reemplaza el archivo **src/index.tsx** actual con el archivo **src/index.google.tsx** e inicia la aplicación con `yarn dev:google` y ejecuta Cypress con `yarn cypress:open`.

La **única especificación que pasará** cuando se ejecute con `yarn dev:google` será la [especificación de google](./cypress/tests/ui-auth-providers/google.spec.ts); todas las demás fallarán.

#### Licencia

Este proyecto está licenciado bajo los términos de la [licencia MIT](/LICENSE).

#### Colaboradores ✨

Gracias a estas maravillosas personas ([clave de emojis](https://allcontributors.org/docs/en/emoji-key)):
Este proyecto sigue la especificación [all-contributors](https://github.com/all-contributors/all-contributors). ¡¡Cualquier tipo de contribución es bienvenida!!
