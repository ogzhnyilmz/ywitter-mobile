const ywits = JSON.parse(localStorage.getItem("ywits")) || [];
const ywitList = document.querySelector(".ywitList");
const ywitInput = document.querySelector("#ywitInput");
const charCounter = document.querySelector('#charCounter');
const newYwitBtn = document.querySelector("#newYwitBtn");
const newYwitForm = document.querySelector("#newYwitForm");

newYwitBtn.addEventListener("click", function (e) {
    newYwitBtn.style.display = "none";
    newYwitForm.style.display = "block";
    ywitInput.style.display = "block"; 
    charCounter.style.display = "block";
    ywitInput.focus(); 
  });

newYwitForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const currentLength = ywitInput.value.length;
    charCounter.textContent = `${currentLength}/250`;
    let newId = 1;
    if (ywits[ywits.length - 1]) {
        newId = ywits[ywits.length - 1].id + 1;
    }

    const newYwit = {
        id: newId,
        title: ywitInput.value,
        isLiked: false,
        likeCount: 0
    };
    ywits.push(newYwit);
    charCounter.textContent = `0/250`;
    localStorage.setItem("ywits", JSON.stringify(ywits));
    e.target.reset();
    newYwitBtn.style.display = "block";
    newYwitForm.style.display = "none";
    charCounter.style.display = "none";
    render();
});

ywitInput.addEventListener('input', function() {
    const currentLength = ywitInput.value.length;
    charCounter.textContent = `${currentLength}/250`;
});

function render() {
    ywitList.innerHTML = "";
    for (let i = 0; i < ywits.length; i++) {
        const ywit = ywits[i];
        const list = createList(i, ywit.id, ywit.title, ywit.isLiked, ywit.likeCount);
        ywitList.innerHTML += list;
    }
    bindElements();
}

function bindElements() {
    const deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach((deleteBtn) => {
        deleteBtn.addEventListener("click", handleDeleteClick);
    });

    const likeBtns = document.querySelectorAll(".heart-btn");
    likeBtns.forEach((likeBtn) => {
        likeBtn.addEventListener("click", handleLikeClick);
    });
}

function handleDeleteClick(event) {
    event.preventDefault();
    const id = event.target.closest(`.delete-btn`).dataset.id;
    deleteYwit(id);
}

function deleteYwit(id) {
    const ywitIndex = ywits.findIndex((ywit) => ywit.id == id);
    if (ywitIndex !== -1) {
        ywits.splice(ywitIndex, 1);
        localStorage.setItem("ywits", JSON.stringify(ywits));
        render();
    }
}

function handleLikeClick(event) {
    event.preventDefault();
    const id = event.target.closest(`.heart-btn`).dataset.id;
    isLike(id);
}

function isLike(id) {
    const ywit = ywits.find(ywit => ywit.id == id);
    if (ywit) {
        ywit.isLiked = !ywit.isLiked;
        if (ywit.isLiked) {
            ywit.likeCount = (ywit.likeCount || 0) + 1;
        } else {
            ywit.likeCount = (ywit.likeCount || 0) - 1; 
        }
        localStorage.setItem("ywits", JSON.stringify(ywits));
        render(); 
    }
}

function createList(index, id, title, isLiked, likeCount) {
    const heartClass = isLiked ? 'liked' : ''; 
    return `
        <div id="ywit-list" class="ywit-list">
            <div class="rect">${title}</div>
            <div class="ywit-icons">
            <a href="#"><img src="assets/img/Comment stroke icon.png" alt=""></a>
            <a href="#"><img src="assets/img/Retweet stroke icon.png" alt=""></a>
            <a href="#"><img src="assets/img/Heart stroke icon.png" alt="" class="heart-btn ${heartClass}" data-id="${id}"></a>
            <span class="like-count">${likeCount}</span>  <!-- Like counter -->
            <a href="#"><img src="assets/img/Share stroke icon.png" alt=""></a>
            </div>
            <a href="#" class="delete-btn" data-id="${id}"><img src="assets/img/delete.png" alt=""></a>
        </div>
    `;
}

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const clockElement = document.getElementById('clock');
    clockElement.textContent = `${hours}:${minutes}`;
}

setInterval(updateClock, 1000);
updateClock();

render();
