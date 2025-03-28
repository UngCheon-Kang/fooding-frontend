const tabButtons = document.querySelectorAll('.tab-btn');
const loginForm = document.getElementById('login-form');

// 탭 버튼 전환 (개인 / 사업자)
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const type = btn.getAttribute('data-type');
    console.log(`선택된 로그인 유형: ${type}`);
    // 향후 역할별 분기 처리 가능
  });
});

// 로그인 제출
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert("이메일과 비밀번호를 모두 입력해주세요.");
    return;
  }

  axios.post("http://localhost:8080/users/login", {
    email: email,
    password: password
  })
    .then(function (response) {
      alert(`${response.data.name}님 환영합니다!`);
      // 로그인 후 페이지 이동
      window.location.href = "main.html"; // 추후 메인 페이지로 교체
    })
    .catch(function (error) {
      console.error("로그인 실패:", error);
      alert("로그인 실패: " + (error.response?.data?.message || "서버 오류"));
    });
});
