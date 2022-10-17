$(document).ready(function (){
    const appStaff = {
        staffId: null,
        eventListener: function (){
            $('.btn-edit-staff').click(function (){
                appStaff.getStaffInfo($(this).data('staff-id'))
            })

            $('#btn_new_staff').click(function (){
                appStaff.renderNewStaff()
            })

            $('#staff_form').submit(function (e){
                e.preventDefault()

                if($('#btn_add_staff').html() === 'Add'){
                    let staff = {
                        username: $('#txt_username').val(),
                        password: $('#txt_pass').val(),
                        confirmPass: $('#txt_confirm_pass').val(),
                        fullName: $('#txt_staff_name').val(),
                        shopId: $('#sb_shop').val(),
                    }
                    if(staff.password === staff.confirmPass){
                        appStaff.newStaff(staff)
                    } else {
                        $('#error_confirm_pass').css('display', 'block')
                    }
                } else {
                    let staff = {
                        shopId: $('#sb_shop').val(),
                    }
                    appStaff.updateStaff(staff)
                }
            })

            $('#txt_username').click(function (){
                $('#error_confirm_pass').css('display', 'none')
            })

            $('#txt_confirm_pass').click(function (){
                $('#error_confirm_pass').css('display', 'none')
            })
        },
        getStaffInfo: function (staffId){
            $.ajax({
                url: '/staff/edit/'+staffId,
                type: 'GET',
                beforeSend: appStaff.animation(),
                success: function (data){
                    if(data.status === 200){
                        appStaff.renderStaffForm(data.staff)
                    } else {
                        appStaff.animation()
                        alert('something wrong! ' + data.notification )
                    }
                },
                error: function (){
                    alert('something wrong!')
                    appStaff.animation()
                }
            })
        },
        renderStaffForm: function (staff){
            $('.title-staff-form').html('Edit Staff')
            $('#txt_staff_name').val(staff.name)
            $('#txt_staff_name').attr('readonly', true)
            $('label[for=txt_username], input#txt_username ').hide();
            $('label[for=txt_username], input#txt_username ').parent().hide()
            $('label[for=txt_pass], input#txt_pass ').hide();
            $('label[for=txt_pass], input#txt_pass ').parent().hide()
            $('label[for=txt_confirm_pass], input#txt_confirm_pass ').hide();
            $('label[for=txt_confirm_pass], input#txt_confirm_pass ').parent().hide()
            $('#btn_add_staff').html('Update')
            $('#sb_shop').val(staff.shop_id)
            appStaff.animation()
            $('#btn_open_edit_form').click()
        },
        renderNewStaff: function (){
            $('.title-staff-form').html('Add Staff')
            $('#txt_staff_name').val('')
            $('#txt_staff_name').attr('readonly', false)
            $('label[for=txt_username], input#txt_username ').show();
            $('label[for=txt_username], input#txt_username ').parent().show()
            $('label[for=txt_pass], input#txt_pass ').show();
            $('label[for=txt_pass], input#txt_pass ').parent().show()
            $('label[for=txt_confirm_pass], input#txt_confirm_pass ').show();
            $('label[for=txt_confirm_pass], input#txt_confirm_pass ').parent().show()
            $('#btn_add_staff').html('Add')
            $('#sb_shop').val('')
        },
        updateStaff: function (){
            $.ajax({
                url:'/staff/edit',
                type: 'PUT',
                data: {staff},
                beforeSend: appStaff.animation(),
                success: function (data){
                    if(data.status === 200){
                        location.href = '/staff'
                    } else {
                        appStaff.animation()
                        alert('something wrong! ' + data.notification)
                    }
                },
                error: function (){
                    appStaff.animation()
                    alert('something wrong!')
                }

            })
        },
        deleteStaff: function (){

        },
        newStaff: function (staff){
            $.ajax({
                url:'/staff/new',
                type: 'POST',
                data: {staff},
                beforeSend: appStaff.animation(),
                success: function (data){
                    if(data.status === 200){
                        location.href = '/staff'
                    } else {
                        appStaff.animation()
                        $('#error_username').css('display', 'block!important')
                    }
                },
                error: function (){
                    appStaff.animation()
                    alert('something wrong!')
                }

            })
        },
        animation: function (){
            if($('.overplay-animation').css('display') == 'none')
            {
                $('.overplay-animation').css('display', 'block')
            }
            else
            {
                $('.overplay-animation').css('display', 'none')
            }
        },
        run: function (){
            appStaff.eventListener()
        }
    }

    appStaff.run()
})