 function loadArchive(artistName, containerId, event) {
  const container = document.getElementById(containerId);
  const button = document.querySelector(`[onclick*="${artistName}"]`);

  const filenameMap = {
    '김하린': 'harin',
    '이도현': 'dohyun',
    '아야카모리': 'ayaka',
    '장우석': 'wooseok'
  };

  const fileName = filenameMap[artistName]; // 영어 파일명 추출
  if (!fileName) {
    alert('해당 작가의 아카이브 파일명이 존재하지 않습니다.');
    return;
  }

  // ✅ 열려 있으면 닫기 (토글)
  if (container.style.display === 'block') {
    container.style.display = 'none';
    container.innerHTML = '';
    button.classList.remove('active'); // 버튼 비활성화
    return;
  }

  // ✅ 열기
  fetch(`archive_${fileName}.html`)
    .then(response => {
      if (!response.ok) throw new Error('페이지를 불러올 수 없습니다.');
      return response.text();
    })
    .then(data => {
      // 모든 archiveContainer 숨기기 + 버튼 active 제거
      document.querySelectorAll('.archive-container').forEach(div => div.style.display = 'none');
      document.querySelectorAll('.button').forEach(btn => btn.classList.remove('active'));

      container.innerHTML = data;
      container.style.display = 'block';
      button.classList.add('active'); // 버튼 활성화
    })
    .catch(error => {
      alert(`오류 발생: ${error.message}`);
    });
}




$(document).ready(function () {

  var typingBool = false;
  var typingIdx = 0;
  var liIndex = 0;
  var liLength = $(".typing-txt>ul>li").length;

  // 타이핑될 텍스트를 가져온다 
  var typingTxt = $(".typing-txt>ul>li").eq(liIndex).text();
  //liIndex 인덱스로 구분해 한줄씩 가져옴

  typingTxt = typingTxt.split(""); // 한글자씩 잘라 배열로만든다

  if (typingBool == false) { // 타이핑이 진행되지 않았다면 
    typingBool = true;
    var tyInt = setInterval(typing, 100); // 반복동작 
  }

  function typing() {
    $(".typing ul li").removeClass("on");
    $(".typing ul li").eq(liIndex).addClass("on");
    //현재 타이핑되는 문장에만 커서 애니메이션을 넣어준다.

    if (typingIdx < typingTxt.length) { // 타이핑될 텍스트 길이만큼 반복 
      $(".typing ul li").eq(liIndex).append(typingTxt[typingIdx]); // 한글자씩 이어준다. 
      typingIdx++;
    } else { //한문장이끝나면
      if (liIndex < liLength - 1) {
        //다음문장으로  가기위해 인덱스를 1증가
        liIndex++;
        //다음문장을 타이핑하기위한 셋팅
        typingIdx = 0;
        typingBool = false;
        typingTxt = $(".typing-txt>ul>li").eq(liIndex).text();

        //다음문장 타이핑전 1초 쉰다
        clearInterval(tyInt);
        //타이핑종료

        setTimeout(function () {
          //1초후에 다시 타이핑 반복 시작
          tyInt = setInterval(typing, 100);
        }, 1000);
      } else if (liIndex == liLength - 1) {

        //마지막 문장까지 써지면 반복종료
        clearInterval(tyInt);

        //1초후
        setTimeout(function () {
          //사용했던 변수 초기화
          typingBool = false;
          liIndex = 0;
          typingIdx = -0;

          //첫번째 문장으로 셋팅
          typingTxt = $(".typing-txt>ul>li").eq(liIndex).text();
          //타이핑 결과 모두 지우기
          $(".typing ul li").html("")

          //반복시작
          tyInt = setInterval(typing, 100);
        }, 1000);


      }
    }
  }
});

function closeArchive() {
  // 모든 archive-container 닫기
  document.querySelectorAll('.archive-container').forEach(div => {
    div.style.display = 'none';
    div.innerHTML = '';
  });

  // 모든 View Archive 버튼 비활성화
  document.querySelectorAll('.button').forEach(btn => btn.classList.remove('active'));

  // .artists 섹션으로 스크롤 이동
  const artistsSection = document.querySelector('#artists');
  if (artistsSection) {
    artistsSection.scrollIntoView({ behavior: 'smooth' });
  }
}




// 
const carousel = document.querySelector('.carousel');
const images = carousel.querySelectorAll('img');
let current = 1; // 현재 중앙 이미지 (index 1)

function updatePositions() {
  const left = (current + 2) % 3;
  const center = current;
  const right = (current + 1) % 3;

  images[left].style.transform = 'translateX(calc(-50% - 300px)) rotateY(30deg) scale(0.9)';
  images[left].style.opacity = '1';
  images[left].style.zIndex = 1;

  images[center].style.transform = 'translateX(-50%) rotateY(0deg) scale(1.2)';
  images[center].style.opacity = '1';
  images[center].style.zIndex = 3;

  images[right].style.transform = 'translateX(calc(-50% + 300px)) rotateY(-30deg) scale(0.9)';
  images[right].style.opacity = '1';
  images[right].style.zIndex = 1;
}

// 초기 상태 적용
updatePositions();

// 호버 시 해당 이미지가 가운데로 오게
images.forEach((img, i) => {
  img.addEventListener('mouseenter', () => {
    current = i;
    updatePositions();
  });
});



document.querySelectorAll('.button').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const trail = document.createElement('div');
    trail.classList.add('button-trail');
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    document.body.appendChild(trail);

    setTimeout(() => trail.remove(), 500);
  });
});
