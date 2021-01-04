
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

//Registra un nuevo usuario con foto de perfil en la base de datos
export const RegisterUsuarioPP = async ({ usuario, password, email, name, profilePic }) => {

  var urlencoded = new URLSearchParams()
  urlencoded.append("profilePic", "http://localhost:3001/public/uploads/user.png")
  urlencoded.append("password", password)
  urlencoded.append("userName", usuario)
  urlencoded.append("name", name)
  urlencoded.append("email", email)
  urlencoded.append("seguidores", 0)
  urlencoded.append("seguidos", 0)

  const requestOptions = {
    method: 'Post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',

    },
    body: urlencoded
  };
  try {

    const addResponse = await (await fetch('http://localhost:3001/api/Usuarios', requestOptions)).json()
    localStorage.setItem('token', "Bearer " + addResponse.token)
    var urlencodedPic = new FormData()
    urlencodedPic.append("file", profilePic)


    const requestOptionsPic = {
      method: 'Post',
      headers: {
        'Authorization': localStorage.getItem('token')

      },
      body: urlencodedPic
    };

    const addProfilePic = await (await fetch('http://localhost:3001/api/UserPic', requestOptionsPic)).json()
    return addProfilePic

  } catch (error) {

    throw error

  }

}
//Registra un nuevo usuario sin foto de perfil en la base de datos
export const RegisterUsuario = async ({ usuario, password, email, name }) => {

  var urlencoded = new URLSearchParams()
  urlencoded.append("profilePic", "http://localhost:3001/public/uploads/user.png")
  urlencoded.append("password", password)
  urlencoded.append("userName", usuario)
  urlencoded.append("name", name)
  urlencoded.append("email", email)
  urlencoded.append("seguidores", 0)
  urlencoded.append("seguidos", 0)

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

