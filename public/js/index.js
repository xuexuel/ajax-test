
let uploadBtnElement = document.querySelector('.uploadBtn');
let uploadFileElement = document.querySelector('#uploadFile');
let taskBodyElement = document.querySelector('.task_body');
let photosListElement = document.querySelector('.photos-list');


function loadPhotos() {
  ajax({
    method: 'get',
    url: '/getPhotos',
    success(data) {
      data = JSON.parse(data);
      data.forEach(d => {
        let li = document.createElement('li');
        let img = new Image();
        img.src = '/public/upload/' + d.name;
        li.append(img);
        photosListElement.appendChild(li);
      })
    }
  })
}
loadPhotos();
uploadBtnElement.onclick = function () {
  uploadFileElement.click();
}

uploadFileElement.onchange = function () {
  for (let file of this.files) {
    uploadFile({
      file
    });
  }
}

function uploadFile(data) {
  let li = document.createElement('li');
  li.innerHTML = `
    <span>${data.file.name}</span>
    <div class="task-progress-status">
      上传中...
    </div>
    <div class="progress"></div>
  `
  taskBodyElement.appendChild(li);
  let taskProgressStatusElement = document.querySelectorAll('.task-progress-status');
  let progressElement = document.querySelector('.progress');
  console.log(data.file);
  let contentListElement = document.querySelector('.content-list');

  ajax({
    method: 'post',
    url: '/upload',
    data,
    success(data) {
      let li = document.createElement('li');
      let img = new Image();
      img.src = data;
      li.append(img);
      photosListElement.appendChild(li);
      taskProgressStatusElement[taskProgressStatusElement.length - 1].innerHTML = '上传完成';
    },
    onprogress(ev) {
      // console.log('ev', ev);
      progressElement.style.width = (ev.loaded / ev.total) * 100 + '%';
    }
  })
}