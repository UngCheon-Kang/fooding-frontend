const tabButtons = document.querySelectorAll(".tab-btn");
const personalForm = document.getElementById("personal-form");
const businessForm = document.getElementById("business-form");

// 탭 전환
tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const type = btn.getAttribute("data-type");

    if (type === "personal") {
      personalForm.classList.remove("hidden");
      businessForm.classList.add("hidden");
    } else {
      personalForm.classList.add("hidden");
      businessForm.classList.remove("hidden");
    }
  });
});

// axios 회원가입 요청
personalForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // 입력값 추출
  const name = personalForm.querySelector('input[placeholder="이름"]').value;
  const email = personalForm.querySelector('input[placeholder="이메일 주소"]').value;
  const phone = personalForm.querySelector('input[placeholder="연락처"]').value;
  const password = personalForm.querySelector('input[placeholder="비밀번호"]').value;
  const confirmPassword = personalForm.querySelector('input[placeholder="비밀번호 확인"]').value;
  const agreeChecked = personalForm.querySelector('input[type="checkbox"]').checked;

  // 유효성 검사
  if (!name || !email || !phone || !password || !confirmPassword) {
    alert("모든 필드를 입력해주세요.");
    return;
  }

  if (password !== confirmPassword) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  if (!agreeChecked) {
    alert("이용약관 및 개인정보 처리방침에 동의해주세요.");
    return;
  }

  // 임시 주소 (추후 지역 정보 받을 수 있게 확장 가능)
  const address = "기본주소";

  // axios 요청
  axios.post("http://localhost:8080/users/register", {
    name: name,
    password: password,
    email: email,
    phone: phone,
    address: address
  })
    .then(function (response) {
      alert("회원가입 성공! " + response.data.name + "님 환영합니다!");
      window.location.href = "fooding_login.html";
    })
    .catch(function (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입 실패: " + (error.response?.data?.message || "서버 오류"));
    });
});
