const config = {
  urls: {
    apilogin: '/api/login',
    apiusers: '/usuarios',
    painel: '/painel',
    login: '/login',
  },
};

function validToken(token) {
  return new Promise((resolve, reject) => {
    fetch(config.urls.apiusers, {
      headers: {
        authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((error) => console.error('Erro ao obter usuários:', error));
  });
}

document
  .getElementById('loginForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    fetch(config.urls.apilogin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem('token', data.token);
          window.location.href = config.urls.painel;
        } else {
          alert('Credenciais inválidas. Tente novamente.');
        }
      })
      .catch((error) => {
        console.error('Erro:', error);
        alert('Erro ao fazer login. Por favor, tente novamente mais tarde.');
      });
  });

let token = localStorage.getItem('token');

if (token) {
  let valid = validToken(token);

  if (valid) {
    window.location.href = config.urls.painel;
  } else {
    localStorage.removeItem('token');
  }
}
