
// Obtiene los datos del usuario loggeado desde la api
export const getUserLogged = async () => {

  const requestOptions = {

    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': localStorage.getItem('token')

    },
  };

  try {

    const user = await fetch('http://localhost:3001/api/usuario', requestOptions)
    return user.json()

  } catch (error) {

    throw error

  }
}

//Obtiene la pagina de home para alguien no loggeado o sin seguidos
export const loadHomePageNotLogged = async () => {
  try {

    const publicaciones = await fetch('http://localhost:3001/api/publicaciones')
    return publicaciones.json()

  } catch (error) {

    throw error
  }
}

//Obtiene una lista de los seguidos que tiene el usuario loggeado
export const loadSeguidos = async ({ nombreUsuario }) => {
  try {

    const seguidos = await fetch('http://localhost:3001/api/seguidores/' + nombreUsuario)
    return seguidos.json()

  } catch (error) {

    throw error

  }
}

//Obtiene la homePage para alguien loggeado y que tenga seguidos
export const loadHomePageLogged = ({ seguidos, publicaciones }) => {

  let publicacionesSeguidos = []

  seguidos.map(seg => {

    publicaciones.map(publicacion => {

      if (seg.seguido === publicacion.creador) {
        publicacionesSeguidos.push(publicacion);
      }

    })
  })

  return publicacionesSeguidos

}

//Registra un nuevo usuario en la base de datos
export const addUsuario = async ({ form }) => {

  let usuario = {

    profilePic: form.profilePic.value,
    password: form.password.value,
    userName: form.userName.value,
    name: form.name.value,
    email: form.email.value,
    seguidores: form.seguidores.value,
    seguidos: form.seguidos.value

  }

  var urlencoded = new URLSearchParams()
  urlencoded.append("profilePic", usuario.profilePic)
  urlencoded.append("password", usuario.password)
  urlencoded.append("userName", usuario.userName)
  urlencoded.append("name", usuario.name)
  urlencoded.append("email", usuario.email)
  urlencoded.append("seguidores", usuario.seguidores)
  urlencoded.append("seguidos", usuario.seguidos)

  const requestOptions = {
    method: 'Post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',

    },
    body: urlencoded
  };

  try {

    const addResponse = await fetch('http://localhost:3001/api/Usuarios', requestOptions).json()
    localStorage.setItem('token', "Bearer " + addResponse.token)
    return addResponse

  } catch (error) {

    throw error

  }
}

//Loggea a un usuario dentro de la aplicacion
export const loginUsuario = async ({ usuario, password }) => {

  var urlencoded = new URLSearchParams()
  urlencoded.append("userName", usuario)
  urlencoded.append("password", password)

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',

    },
    body: urlencoded
  }

  try {
    const loginResponse = await (await fetch('http://localhost:3001/api/Usuario', requestOptions)).json()


    localStorage.setItem('token', "Bearer " + loginResponse.token)

    return loginResponse

  } catch (error) {

    throw error

  }
}


//Add  una publicacion a la base de datos
export const addPublicacion = async ({ form, userName }) => {

  var urlencoded = new URLSearchParams()
  urlencoded.append("titulo", form.titulo.value)
  urlencoded.append("contenido", "deMomentoVacio")
  urlencoded.append("creador", userName)
  urlencoded.append("Descripcion", form.descripcion.value)
  urlencoded.append("meGusta", 0)
  urlencoded.append("noMeGusta", 0)

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': localStorage.getItem('token')
    },
    body: urlencoded
  };

  try {

    const addPublicacionResponse = await fetch('http://localhost:3001/api/Publicaciones', requestOptions)
    return addPublicacionResponse.json()

  } catch (error) {

    throw error

  }
}

