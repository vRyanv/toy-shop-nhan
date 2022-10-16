$(document).ready(function (){
    const appLogin = {
        eventListener: function (){
            $('#login_form').submit(function (e){
                e.preventDefault()
                appLogin.handleLogin()
            })
        },
        animation: function (){
        },
        handleLogin: function (){
            let username = $('#username').val()
            let password = $('#password').val()
            if(username !== '' && password !== '')
            {
                $.ajax({
                    url:'/',
                    type: 'POST',
                    beforeSend: appLogin.animation(),
                    data: {username, password},
                    success: function (data){
                        if(data.status === 200){
                            if(data.role === '0'){
                                location.href = '/home'
                            } else if(data.role === '1') {
                                location.href = '/dashboard-admin'
                            } else {
                                location.href = '/dashboard-senior'
                            }
                        } else {
                            appLogin.animation()
                            $('.error-login').show()
                        }
                    },
                    error: function (){
                        appLogin.animation()
                        alert('error')
                    }
                })
            }
            else {
                $('.error-login').html("please enter username and password")
                $('.error-login').show()
            }
        },
        run: function (){
            this.eventListener()
        }
    }
    appLogin.run()
})

