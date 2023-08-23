const textareas = document.querySelectorAll('.textarea');

//     // Ajustar automáticamente la altura del textarea cuando cambie su contenido
//     textareas.forEach(textarea=>{
//       textarea.addEventListener('input', () => {
//         autoResizeTextarea(textareas);
//       });
//     })

//     // Función para ajustar la altura del textarea
//     function autoResizeTextarea(textareas) {
//       textareas.forEach(textarea => {
//         if(!textarea.value){
//           textarea.style.height = '100px';
//         }else{
//           textarea.style.height = 'auto'; // Restaurar la altura original
//           textarea.style.height = textarea.scrollHeight + 'px'; // Ajustar la altura según el contenido
//         }
//       });
//     }

//     // Ajustar la altura del textarea cuando se carga la página
//     autoResizeTextarea(textareas);

//     window.addEventListener('resize', ()=> autoResizeTextarea(textareas));

// DIV TEXTAREA
textareas.forEach(textarea => {
    textarea.addEventListener('focus', () => {
      if (textarea.textContent === 'Add a comment...') {
        textarea.textContent = '';
        textarea.classList.remove('add-comment');
      }
    });

    textarea.addEventListener('blur', () => {
      if (textarea.textContent === '') {
        textarea.textContent = 'Add a comment...';
        textarea.classList.add('add-comment');
      }
    });
  });

// DATA

async function loadData(){
    try{
        const response  = await fetch('data.json');
        const data = await response.json();

        let comments = data.comments;
        let currentUser = data.currentUser;
        getComments(comments, currentUser);
        console.log(currentUser);
        console.log(comments);
        getReply(currentUser, container);

    }catch (error){
        console.log('Error loading JSON: ', error);
    }
}

loadData();

const container = document.querySelector('.container');

function getComments(comments, currentUser){
    comments.forEach(comment => {
        const commentContainer = document.createElement('div');
        commentContainer.classList.add('comment');
        // COMMENT-TOP
        const commentTop = document.createElement('div');
        commentTop.classList.add('comment-top');
        const imgAvatar = document.createElement('img');
        imgAvatar.src = comment.user.image.png;
        imgAvatar.alt = comment.user.username;
        const username = document.createElement('h2');
        username.textContent = comment.user.username;
        const timeComment = document.createElement('span');
        timeComment.textContent = comment.createdAt;
        commentTop.append(imgAvatar,username);
        if(comment.user.username === currentUser.username){
          const identifUser = document.createElement('span');
          identifUser.classList.add('identif-user');
          identifUser.textContent = 'you';
          commentTop.append(identifUser);
        }
          commentTop.append(timeComment);
        // DIV-TEXTAREA
        const textareaContainer = document.createElement('div');
        textareaContainer.classList.add('textarea');
        textareaContainer.textContent = comment.content;
        // COMMENT-BOTTOM
        const commentBottom = document.createElement('div');
        commentBottom.classList.add('comment-bottom');
        const commentScore = document.createElement('div');
        commentScore.classList.add('comment-score');
        const commentScorePlus = document.createElement('div');
        commentScorePlus.classList.add('comment-score__plus');
        const svgPlus = '<svg width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/></svg>';
        const commentScoreP = document.createElement('p');
        commentScoreP.textContent = comment.score;
        const commentScoreMinus = document.createElement('div');
        commentScoreMinus.classList.add('comment-score__minus');
        const svgMinus = '<svg width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/></svg>';
        commentScorePlus.innerHTML = svgPlus;
        commentScoreMinus.innerHTML = svgMinus;
        commentScore.append(commentScorePlus,commentScoreP, commentScoreMinus);
        commentBottom.append(commentScore);
        if(comment.user.username === currentUser.username){
          // DELETE
          const btnsUser = document.createElement('div');
          btnsUser.classList.add('btns-user');
          const commentDelete = document.createElement('div');
          commentDelete.classList.add('comment-delete');
          const svgDelete = '<svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>';
          const pDelete = document.createElement('p');
          pDelete.textContent = 'Delete';
          commentDelete.innerHTML = svgDelete;
          // EDIT
          const commentEdit = document.createElement('div');
          commentEdit.classList.add('comment-edit');
          const svgEdit = '<svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg>';
          const pEdit = document.createElement('p');
          pEdit.textContent = 'Edit';
          commentEdit.innerHTML = svgEdit;
          commentDelete.append(pDelete);
          commentEdit.append(pEdit);
          btnsUser.append(commentDelete, commentEdit);
          commentBottom.append(btnsUser);
        }else{
          const commentReply = document.createElement('div');
          commentReply.classList.add('comment-reply');
          const svgReply = '<svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>';
          const commentReplyP = document.createElement('p');
          commentReplyP.textContent = 'Reply';
          commentReply.innerHTML = svgReply;
          commentReply.appendChild(commentReplyP);
          commentReply.addEventListener('click', ()=>{
            getReply(currentUser,commentContainer);
          })
          commentBottom.append(commentReply);
        }

        commentContainer.append(commentTop,textareaContainer,commentBottom);
        if(comment.replyingTo){
          const commentReplyContainer = document.createElement('div');
          commentReplyContainer.classList.add('commentReply-container');
          const commentReply = document.createElement('div');
          commentReply.classList.add('commentReply');
          commentReply.appendChild(commentContainer);
          commentReplyContainer.appendChild(commentReply);
          container.appendChild(commentReplyContainer);
        }else{
          container.appendChild(commentContainer);
        }

        console.log(commentContainer);
        if(comment.replies){
          if(comment.replies.length > 0){
            getComments(comment.replies, currentUser);
          }
        }
    })
}

function getReply(currentUser, containerReply){
  console.log(currentUser.image.png);
  const replyContainer = document.createElement('div');
  replyContainer.classList.add('reply');
  const textarea = document.createElement('div');
  textarea.classList.add('textarea');
  textarea.setAttribute('contenteditable', 'true');
  const replyUser = document.createElement('div');
  replyUser.classList.add('reply-user');
  const imgUser = document.createElement('img');
  imgUser.src = currentUser.image.png;
  const sendButton = document.createElement('button');
  sendButton.textContent = 'SEND';
  const replyButton = document.createElement('button');
  replyButton.textContent = 'REPLY';
  replyButton.classList.add('inactive');
  replyUser.append(imgUser,sendButton,replyButton);
  replyContainer.append(textarea,replyUser);
  if(containerReply ===container){
    containerReply.appendChild(replyContainer);
  }else{
    sendButton.classList.add('inactive');
    replyButton.classList.remove('inactive')
    containerReply.insertAdjacentElement('afterend', replyContainer);
  }
}