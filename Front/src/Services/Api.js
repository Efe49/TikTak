
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
// Obtiene los datos de un usuario desde la api
export const getUser = async ({ userName }) => {

  const requestOptions = {

    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',

    },
  };

  try {

    const user = await fetch(`http://localhost:3001/api/Usuarios/${userName}`, requestOptions)
    return user.json()

  } catch (error) {

    throw error

  }
}
// Obtiene los datos de una publicacion desde la api
export const getPublicacion = async ({ _id }) => {

  const requestOptions = {

    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',

    },
  };

  try {

    const publi = await fetch(`http://localhost:3001/api/Publicaciones/${_id}`, requestOptions)
    return publi.json()

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
//Obtiene las publicaciones de un usuario
export const loadPublicacionesUser = async ({ userName }) => {
  const publicaciones = await loadHomePageNotLogged()
  let publicacionesUser = []


  // eslint-disable-next-line array-callback-return
  publicaciones.map(publicacion => {

    if (userName === publicacion.creador) {
      publicacionesUser.push(publicacion);
    }

  })


  return publicacionesUser

}
//Registra un nuevo usuario con foto de perfil en la base de datos
export const RegisterUsuarioPP = async ({ usuario, password, email, name, profilePic }) => {

  var urlencoded = new URLSearchParams()
  urlencoded.append("profilePic", profilePic)
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
/* export const addPublicacion = async ({ titulo, descripcion, video }) => {

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

} */
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
//Loggea a un usuario dentro de la aplicacion
export const follow = async ({ userLogged, userFollow }) => {

  var urlencoded = new URLSearchParams()
  urlencoded.append("seguido", userFollow)
  urlencoded.append("seguidor", userLogged)

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': localStorage.getItem('token')
    },
    body: urlencoded
  }

  try {
    const followResponse = await (await fetch('http://localhost:3001/api/Seguidores', requestOptions)).json()
    var urlencodedU1 = new URLSearchParams()
    urlencodedU1.append("seguido", userFollow)
    urlencodedU1.append("seguidor", userLogged)

    const requestOptionsU1 = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('token')
      },
      body: urlencodedU1
    }

    await fetch('http://localhost:3001/api/Usuarios/${userFollow}', requestOptionsU1)

    return followResponse

  } catch (error) {

    throw error

  }
}

//Deja de seguir a un usuario
export const unFollow = async ({ userLogged, userUnfollow }) => {

  var urlencoded = new URLSearchParams()
  urlencoded.append("seguido", userUnfollow)
  urlencoded.append("seguidor", userLogged)

  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': localStorage.getItem('token')
    },
    body: urlencoded
  }

  try {
    const unFollowResponse = await (await fetch(`http://localhost:3001/api/Seguidores/${userLogged}`, requestOptions)).json()
    return unFollowResponse

  } catch (error) {

    throw error

  }
}


//Add  una publicacion a la base de datos
export const addPublicacion = async ({ titulo, descripcion, contenido, userName }) => {




  try {
    var urlencodedPic = new FormData()
    urlencodedPic.append("file", contenido)


    const requestOptionsPic = {
      method: 'Post',
      headers: {
        'Authorization': localStorage.getItem('token'),

      },
      body: urlencodedPic
    };

    await fetch('http://localhost:3001/api/ContentPost', requestOptionsPic).then((result) => result.json()).then(async (message) => {

      const content = message
      var urlencoded = new URLSearchParams()
      urlencoded.append("titulo", titulo)
      urlencoded.append("contenido", content.message)
      urlencoded.append("creador", userName)
      urlencoded.append("Descripcion", descripcion)
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
      const publicacion = await fetch('http://localhost:3001/api/Publicaciones', requestOptions)
      return publicacion
    })




  } catch (error) {

    throw error

  }
}

export const deletePublicacion = async ({ identificadorPost }) => {

  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': localStorage.getItem('token')
    },

  };
  try {


    const data = await fetch('http://localhost:3001/api/Publicaciones/' + identificadorPost, requestOptions)

    console.log(data)


  } catch (error) {
    throw error
  }



}

