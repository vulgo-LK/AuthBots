const config = {
  urls: {
    apilogin: '/api/login',
    apiusers: '/usuarios',
    painel: '/painel',
    login: '/',
  },
};

document.getElementById('logoutButton').addEventListener('click', function () {
  localStorage.removeItem('token');
  window.location.href = '/';
});

if (!localStorage.getItem('token')) {
  window.location.href = config.urls.login;
}

document.getElementById('file-input').addEventListener('change', function () {
  const fileInput = this;
  const file = fileInput.files[0];

  if (file) {
    readFileContent(file);
  } else {
    alert('Selecione um arquivo antes de continuar.');
  }
});

function readFileContent(file) {
  const reader = new FileReader();

  reader.onload = async function (e) {
    const userContent = e.target.result;

    try {
      const response = await fetch('/read-auth');
      if (response.ok) {
        const authContent = await response.text();

        const combinedContent = userContent + '\n\n' + authContent;

        displayFileContent();
        enableDownloadLink(combinedContent);
        showDownloadNotification();
      } else {
        console.error('Erro ao obter conteúdo do arquivo auth.js do servidor.');
      }
    } catch (error) {
      console.error('Erro ao realizar solicitação ao servidor:', error);
    }
  };

  reader.readAsText(file);
}

function displayFileContent(content) {
  const fileContentElement = document.getElementById('file-content');
  fileContentElement.textContent = content;
}

function enableDownloadLink(content) {
  const downloadLink = document.getElementById('download-link');
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  downloadLink.href = url;
  downloadLink.style.display = 'block';
}

function showDownloadNotification() {
  const notification = document.createElement('div');
  notification.textContent = 'O arquivo está pronto para download!';
  notification.classList.add('download-notification');

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('show');
  }, 10);

  setTimeout(() => {
    notification.classList.remove('show');

    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 5000); // 5000 milissegundos (5 segundos)
}

document.addEventListener('DOMContentLoaded', function () {
  const menuIcon = document.querySelector('.menu-icon');
  const navList = document.querySelector('.nav-list');

  menuIcon.addEventListener('click', function () {
    navList.classList.toggle('show');
  });
});
