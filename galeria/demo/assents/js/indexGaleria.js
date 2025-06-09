// Carrega imagens ao iniciar
fetch('http://localhost:8080/api/galeria',{
  method: 'GET',
headers: {
  'Content-Type' : 'application/json'
},
})

  .then(res => res.json())
  .then(data => mostrarImagens(data))
  .catch(error => console.error('Erro ao carregar imagens:', error));

// Exibe as imagens na galeria
function mostrarImagens(imagens) {
  const container = document.getElementById('containerImagens');
  container.innerHTML = '';

  imagens.forEach(img => {
    const div = document.createElement('div');
    div.className = 'bg-white p-2 shadow rounded flex flex-col items-center';

    div.innerHTML = `
      <img src="${img.url}" alt="Imagem" class="w-full h-48 object-cover rounded mb-2">
      <button onclick="editarImagem(${img.id}, '${img.url}')" class="bg-yellow-400 px-2 py-1 rounded mb-1">Editar</button>
      <button onclick="removerImagem(${img.id})" class="bg-red-500 text-white px-2 py-1 rounded">Remover</button>
    `;
    container.appendChild(div);
  });
}

// Adiciona nova imagem
function Adicionar() {
  event.preventDefault();
  const url = document.getElementById('urlImagem').value.trim();

  if (!url) {
    Swal.fire('Erro', 'Informe a URL da imagem.', 'error');
    return;
  }

  fetch('http://localhost:8080/api/galeria', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  })
    .then(response => response.json())
    .then(imagens => {
      mostrarImagens([imagens]);
      document.getElementById('urlImagem').value = '';
    })
    .catch(err => console.error('Erro ao adicionar imagem:', err));
}

// Edita imagem existente
function editarImagem(id, urlAtual) {
  Swal.fire({
    title: 'Editar Imagem',
    input: 'text',
    inputLabel: 'URL da nova imagem',
    inputValue: urlAtual,
    showCancelButton: true,
    confirmButtonText: 'Salvar'
  }).then(result => {
    if (result.isConfirmed && result.value.trim() !== '') {
      fetch(`http://localhost:8080/api/galeria/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: result.value.trim() })
      })
        .then(response => {
            if(!response.ok) throw new Error ("Erro ao editar imagem.");
            return response.json();
        })
        .then(() => {
            Swal.fire ('Sucesso' , 'Imagem Atualizada' , 'success');
            location.reload();
        })
        .catch(error => {
            Swal.fire('Erro' , error.message, 'error');
        });
    }
  });
}

// Remove imagem
function removerImagem(id) {
  Swal.fire({
    title: 'Tem certeza que deseja excluir?',
    text: 'Você deseja realmente remover esta imagem?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, remover',
    cancelButtonText: 'Cancelar'
  }).then(result => {
    if (result.isConfirmed) {
      fetch(`http://localhost:8080/api/galeria/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
    .then(response => {
        if(!response.ok) throw new Error ("Erro ao remover irmagem.");
        Swal.fire('Removido', 'A imagem foi removida com sucesso', 'success');
        location.reload();
    });
    }
  });
}
