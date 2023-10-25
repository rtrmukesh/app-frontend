

class LoginService{

    static login(data,cb){

        fetch("https://8a6b-106-51-74-137.ngrok-free.app/v1/user/loginByPassword", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            // Authorization: sessionToken,
        },
        body: data,
        }).then((response) => response.json()).then(async (res)=>{
            return cb(res)
        })

    }
}

export default LoginService;