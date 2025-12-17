const container=document.querySelector('.container')
const LoginLink=document.querySelector('.SignInLink')
const RegisterLink=document.querySelector('.SignUpLink')
RegisterLink.addEventListener('click',()=>{
    container.classList.add('active');
})
LoginLink.addEventListener('click',()=>{
    container.classList.remove('active');
})
const loginBtn = document.getElementById("clickable");

loginBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const username = document.querySelector(".Login input[type='text']").value;
    const password = document.querySelector(".Login input[type='password']").value;

    if (username === "admin" && password === "1234") {
        window.location.href = "biy-daalt.html";
    } else {
        alert("Нэвтрэх нэр эсвэл нууц үг буруу байна!");
    }
});
