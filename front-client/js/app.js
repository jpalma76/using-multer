const form =document.querySelector("form");

form.addEventListener("submit", e => {
    e.preventDefault();
    const nicknameValue = e.currentTarget.nickname.value;
    const avatarFile = e.currentTarget.avatar.files[0];
    let postData = new FormData();
    postData.append("nickname", nicknameValue)
    postData.append("avatar", avatarFile)

    fetch("http://localhost:3000/guardarComoApi", {
        mode: 'no-cors',
        method: "POST",
        body: postData
    })
        .then(response => response.json)
        .then(data => {
            console.log(nicknameValue, avatarFile.name)
        })
})