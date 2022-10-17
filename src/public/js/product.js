$(document).ready(function (){
    const appPro = {
        proId: null,
        eventListener: function (){
            $('#pro_form').submit(function (e){
                e.preventDefault()
                if($('#btn_add_pro').html() === 'Add'){
                    appPro.addPro(this)
                } else {
                    appPro.updatePro(this)
                }
            })

            $('.btn-delete-pro').click(function (){

            })

            $('.btn-edit-pro').click(function (){

            })

            $('#btn_open_dialog_image').click(function (){
                $('#pro_img').click()
            })

            $('#pro_img').change(function (){
                appPro.previewImage()
            })
        },
        addPro:function (product){
            if($('#pro_img').val() === ''){
                $('#lb_img').html('Image*')
                $('#lb_img').css('color', 'red')
            } else {
                var proForm = new FormData(product)
                $.ajax({
                    url: '/product/new',
                    type: 'POST',
                    data: proForm,
                    cache:false,
                    contentType: false,
                    processData: false,
                    beforeSend: appPro.animation(),
                    success: function (data){
                        if(data.status === 200){
                            location.href = '/dashboard-admin'
                        } else {
                            appPro.animation()
                            alert('something wrong! ' + data.notification)
                        }
                    },
                    error: function (){
                        appPro.animation()
                        alert('something wrong !')
                    }
                })
            }
        },
        getProInfo: function (){

        },
        updatePro: function (){

        },
        deletePro: function (){

        },
        searchPro: function (){

        },
        renderProList: function (){

        },
        renderProUpdateForm: function (){

        },
        renderProNewForm: function (){

        },
        previewImage: function (){
            document.getElementById("img_preview").src = '/images/demo-image.jpg';
            var imageReader = new FileReader();
            imageReader.readAsDataURL(document.getElementById("pro_img").files[0]);
            imageReader.onload = function (oFREvent) {
                document.getElementById("img_preview").src = oFREvent.target.result;
            };
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
        run:function (){
            appPro.eventListener()
        }
    }
    appPro.run()
})