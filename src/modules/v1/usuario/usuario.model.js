import { pool } from "../../../db.js";

/**
 ** Ver todos los usuarios
 *
 */
export const getUsuarios = async () => {
  try {
    const query = "SELECT * FROM usuario";
    let params = [];

    const [rows] = await pool.query(query, params);

    let response = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      response.push({
        id: row.usuId,
        nombre: row.usuNombre,
        apellido: row.usuApellido,
        dni: row.usuDni,
        telefono: row.usuTelefono,
        nroTramite: row.usuNroTramite,
        mail: row.usuMail,
        validado: row.usuValidado,
        activo: row.usuActivo,
      });
    }

    return response;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 ** Ver un usuario por ID
 *
 */
export const getUsuario = async (usuarioId) => {
  try {
    const query = "SELECT * FROM usuario WHERE usuId = ?";
    let params = [usuarioId];

    const [rows] = await pool.query(query, params);

    let response = null;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      response = {
        id: row.usuId,
        nombre: row.usuNombre,
        apellido: row.usuApellido,
        dni: row.usuDni,
        telefono: row.usuTelefono,
        nroTramite: row.usuNroTramite,
        mail: row.usuMail,
        validado: row.usuValidado,
        activo: row.usuActivo,
      };
    }

    return response;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 ** Crea un nuevo usuario
 *
 *i @param usuario: objeto con los datos necesarios del usuario - especificado mas abajo
 */
export const insertUsuario = async (usuario) => {
  /** 
    {
        "nombre": "julian",             //* nombre del usuario
        "apellido": "torossian",        //* apellido del usuario
        "dni": 99999999,                //* apellido del usuario
        "telefono": "99999999",         //* apellido del usuario
        "nroTramite": "12345678901",    //* apellido del usuario
        "mail": "mail@mail.com",        //* mail del usuario
        "password": 123,                //* contraseña del usuario
    }
    **/

  try {
    const query =
      "INSERT INTO usuario(usuNombre, usuApellido, usuDni, usuTelefono, usuNroTramite, usuMail, usuPass) VALUES (?, ?, ?, ?, ?, ?, ?)";
    let params = [
      usuario.nombre,
      usuario.apellido,
      usuario.dni,
      usuario.telefono,
      usuario.nroTramite,
      usuario.mail,
      usuario.password,
    ];
    const [rows] = await pool.query(query, params);
    const [id] = await pool.query("SELECT LAST_INSERT_ID() AS id", []);

    let usuarioN = {
      id: id[0].id,
      ...usuario,
    };

    return usuarioN;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 ** Crea un nuevo usuario
 *
 *i @param usuario: objeto con los datos necesarios del usuario - especificado mas abajo
 */
export const updateUsuario = async (usuario) => {
  /** 
    {
        "id": 1                         //* id de usuario
        "nombre": "julian",             //* nombre del usuario
        "apellido": "torossian",        //* apellido del usuario
        "dni": 99999999,                //* apellido del usuario
        "telefono": "99999999",         //* apellido del usuario
        "nroTramite": "12345678901",    //* apellido del usuario
        "mail": "mail@mail.com",        //* mail del usuario
        "password": 123,                //* contraseña del usuario
    }
    **/

  try {
    const query =
      "UPDATE usuario SET usuNombre = ?, usuApellido = ?, usuDni = ?, usuTelefono = ?, usuNroTramite = ?, usuMail =?, usuPass = ? WHERE usuId = ?";
    let params = [
      usuario.nombre,
      usuario.apellido,
      usuario.dni,
      usuario.telefono,
      usuario.nroTramite,
      usuario.mail,
      usuario.password,
      usuario.id,
    ];

    const [rows] = await pool.query(query, params);

    return usuario;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 ** Eliminar un nuevo usuario
 *
 *i @param usuarioId: id del usuario a eliminar
 */
export const deleteUsuario = async (usuarioId) => {
  try {
    const query = "DELETE FROM usuario WHERE usuId = ?";
    let params = [usuarioId];

    const [rows] = await pool.query(query, params);
    return 1;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 ** Corrobora que existe el usuario para el inicio de sesion
 *
 *i @param mail: mail del usuario
 *i @param password: contraseña del usuario
 */
export const existeUsuario = async (mail, password) => {
  try {
    let query =
      "SELECT usuId FROM usuario WHERE (usuMail = ? AND usuPass = ?) AND usuActivo = true";
    let params = [mail, password];
    const [rows] = await pool.query(query, params);

    if (rows[0]) {
      return rows[0].usuId;
    }
    return 0;
  } catch (err) {
    throw new Error(err);
  }
};

export const cambiarContrasena = async (usuario) => {
  /** 
    {
        "id": 1                         //* id de usuario
        "password": 123,                //* contraseña del usuario
    }
    **/

  try {
    console.log(usuario);
    const query = "UPDATE usuario SET usuPass = ? WHERE usuId = ?";
    let params = [usuario.password, usuario.id];

    const [rows] = await pool.query(query, params);

    return usuario;
  } catch (err) {
    throw new Error(err);
  }
};

export const getHistorialAlertasEmitidas = async (aleUsuario) => {
  try {
    const query =
      "SELECT *, ST_Longitude(aleUbi) AS longitude, ST_Latitude(aleUbi) AS latitude  FROM alerta WHERE aleUsuario = ?";
    let params = [aleUsuario];

    const [rows] = await pool.query(query, params);

    let response = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      // console.log(row);
      response.push({
        id: row.aleId,
        usuario: row.aleUsuario,
        ubicacion: {
          latitud: row.latitude,
          longitud: row.longitude,
        },
        estado: row.aleEstado,
        fechaEmision: row.aleFchEmision,
        fechaCierre: row.aleFchCierre,
        cerrada: row.aleCerrada,
      });
    }

    return response;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const getHistorialAlertasAcudidas = async (usuarioId) => {
  try {
    // ir a alerta -> ver sus asistentes -> ver si el usuario esta entre ellos

    const query =
      'SELECT *, ST_Longitude(aleUbi) AS longitude, ST_Latitude(aleUbi) AS latitude \
                       FROM alerta AS al \
                       INNER JOIN asistente AS a ON al.aleId = a.asisAlerta  \
                       WHERE a.asisUsuario = ? AND \
                       a.asisEstado = "A"';
    let params = [usuarioId];

    const [rows] = await pool.query(query, params);

    let response = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      response.push({
        id: row.aleId,
        usuario: row.aleUsuario,
        ubicacion: {
          latitud: row.latitude,
          longitud: row.longitude,
        },
        estado: row.aleEstado,
        fechaEmision: row.aleFchEmision,
        fechaCierre: row.aleFchCierre,
        cerrada: row.aleCerrada,
      });

    }

    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export const agregarPreferencias = async (usuPrefUsuario, usuPrefCodigo) => {
  try {
    // console.log(usuario);
    const query =
      "INSERT INTO usuario_preferencias(usuPrefUsuario, usuPrefCodigo) VALUES ( ?, ?)";
    let params = [usuPrefUsuario, usuPrefCodigo];

    const [rows] = await pool.query(query, params);

    return usuPrefCodigo;
  } catch (err) {
    throw new Error(err);
  }
};

export const setTokenNotificacion = async (usuario) => {
  /** 
    {
        "id": 1                         //* id de usuario
        "token": "token",               //* nuevo token
    */
  try {
    const query = "INSERT INTO usuNotiToken VALUES (?,?)";
    let params = [usuario.id, usuario.token];
    const [rows] = await pool.query(query, params);
    return rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

export const getTokenNotificacion = async (usuarioId) => {
  try {
    const query = "SELECT usuNotiToken AS token FROM usuario WHERE usuId = ?";
    let params = [usuarioId];
    const [rows] = await pool.query(query, params);
    return rows[0].token;
  } catch (err) {
    throw new Error(err);
  }
};

export const borrarPreferencias = async (usuPrefUsuario, usuPrefCodigo) => {
  /** 
    {
        "id": 1                         //* id de usuario
        "password": 123,                //* contraseña del usuario
    }
    **/

  try {
    // console.log(usuario);
    const query =
      "DELETE FROM usuario_preferencias WHERE usuPrefUsuario = ? AND usuPrefCodigo = ?";
    let params = [usuPrefUsuario, usuPrefCodigo];

    const [rows] = await pool.query(query, params);

    return usuPrefCodigo;
  } catch (err) {
    throw new Error(err);
  }
};

