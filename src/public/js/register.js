$(document).ready(function () {
    const appRegister = {
        eventListener: function () {
            $('#register-form').submit(function (e) {
                e.preventDefault()
                appRegister.handleRegister()
            })
        },
        animation: function () {

        },
        handleRegister: function () {
            let username = $('#username').val()
            let password = $('#password').val()
            let confirmpassword = $('#confirmpassword').val()
            if (username !== '' && password !== '' ) {
                if (password === confirmpassword) {
                    $.ajax({
                        url: '/register',
                        type: 'post',
                        beforeSend: appRegister.animation(),
                        data: {username, password},
                        success: function (data) {
                            if (data.status === 200) {
                               $('.error-register').html("register success")
                                $('.error-register').css('color','green')
                                $('.error-register').show()
                            } else {
                                appRegister.animation()
                                $('.error-register').html("this user name was exist")
                                $('.error-register').show()
                            }
                        },
                        error: function () {
                            appRegister.animation()
                            alert('error')
                        }
                    })
                } else {
                    $('.error-register').html("password and confirm password not match")
                    $('.error-register').show()
                }
            }
            else {
                $('.error-register').html("please enter username and password")
                $('.error-register').show()
            }
        },
        run: function () {
            this.eventListener()
        }
    }
    appRegister.run()
})

