import { posts } from "./database.js";

//captura todo bloco de array
function render(array){
  const container = document.querySelector('.container__posts');
  for(let i = 0; i < array.length; i++){
    const element = array[i];
    const card = createPostElements(element);
    container.append(card);
  }
}

//cria o card que será chamado pelo Render e posteriormente visualizada na page
function createPostElements(object){
    const articleContainer = document.createElement('article');
    const containerProfile = document.createElement('div');
    const imgProfile = document.createElement('img');
    const divProfile = document.createElement('div');
    const name = document.createElement('h2');
    const work = document.createElement('p');
    const titlePost = document.createElement('h2');
    const description = document.createElement('p');
    const divButton = document.createElement('div');
    const button = document.createElement('button');
    const divLikes = document.createElement('div');
    const imgLikes = document.createElement('img');
    const smallLike = document.createElement('small');

    articleContainer.innerHTML = "";
    articleContainer.classList.add('posts__post');

    containerProfile.classList.add('container__profile');

    imgProfile.src = object.img;
    imgProfile.alt = object.user;
    imgProfile.classList.add('author__image', 'image__profile');

    divProfile.classList.add('post__profile');

    name.innerText = object.user; 
    name.classList.add('font-title-2');

    work.innerText = object.stack;
    work.classList.add('font-text-2', 'work__author'); 

    titlePost.innerText = object.title; 
    titlePost.classList.add('font-title-1');

    description.innerText = object.text;
    description.classList.add('font-text-1');

    divButton.classList.add('post__actions');
    button.classList.add('text--bold', 'open__post');
    button.innerText = 'Abrir Post';
    button.id = object.id;

    divLikes.classList.add('post__likes');
    
    imgLikes.src = 'src/assets/img/heart-gray.svg';
    imgLikes.classList.add('post__heart-icon');
    
    smallLike.classList.add('post__like-count');
    smallLike.innerText = object.likes;
    
    divButton.append(button, divLikes);
    articleContainer.append(containerProfile, titlePost, description, divButton);
    
    containerProfile.append(imgProfile, divProfile);
    divProfile.append(name, work);
    divLikes.append(imgLikes, smallLike);
    
    return articleContainer;
   
}

//cria card para personalizado para o Modal
function modalCard(object){
    const containerProfile = document.createElement('div');
    const divContainer = document.createElement('div');
    const imgProfile = document.createElement('img');
    const divProfile = document.createElement('div');
    const name = document.createElement('h2');
    const work = document.createElement('p');
    const titlePost = document.createElement('h2');
    const description = document.createElement('p');
    const closeButton = document.createElement('span');

    containerProfile.innerHTML = '';
    containerProfile.classList.add('container__modal');

    divContainer.classList.add('container__profile')

    imgProfile.src = object.img;
    imgProfile.alt = object.user;
    imgProfile.classList.add('author__image', 'image__profile');

    divProfile.classList.add('post__profile');

    name.innerText = object.user; 
    name.classList.add('font-title-2');

    work.innerText = object.stack;
    work.classList.add('font-text-2', 'work__author'); 

    titlePost.innerText = object.title; 
    titlePost.classList.add('font-title-1');

    description.innerText = object.text;
    description.classList.add('.font-text-1-modal');

    closeButton.innerText = 'X';
    closeButton.classList.add('modal__close')

    containerProfile.append(divContainer, titlePost, description, closeButton);
    divContainer.append(imgProfile, divProfile);
    divProfile.append(name, work);

    return containerProfile;

}

//cria um modal que interage com os posts
function handleModal(array) {
  const buttons = document.querySelectorAll(".open__post");
  const modalController = document.querySelector(".modal__controller");
  
  let profile = {};

  // Abrir modal
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    button.addEventListener("click", function(event) {
      modalController.innerHTML = '';

      for(let profileId = 0; profileId < array.length; profileId++){
        if (array[profileId].id == event.target.id){
          profile = array[profileId];
        }
      }
      const card = modalCard(profile);
      modalController.appendChild(card);
      modalController.showModal();

    });
  }

  //fechar modal
  function closeBtn(){
    const modalController = document.querySelector('.modal__controller');

    modalController.addEventListener('click', (e)=>{
     if(e.target.classList.contains('modal__close')){
      modalController.close();
     }
    });
  }
  closeBtn();
  

  //fechar modal pelo background
  function closeModalForBackground(){
    const modalController = document.querySelector('.modal__controller');
    modalController.addEventListener('click', function(e){
      if(e.target.classList.contains('modal__controller')){
        modalController.close();
      }
    });
  }
  closeModalForBackground();
}

//chamada das funções
render(posts);
handleModal(posts);

