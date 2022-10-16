$(document).ready(function (){
    const appShop = {
        shopId: null,
        eventListener: function (){
            $('#shop_form').submit(function (e){
                e.preventDefault()
                appShop.addShopRequest($('#txt_shop_name').val(),  $('#txt_shop_address').val())
            })

            $('.btn-delete-shop').click(function (){
                appShop.shopId = $(this).data('shop-id')
                $('.modal-body').html('Do you want to delete this shop ?')
            })

            $('#btn_ok_delete').click(function (){
                appShop.deleteRequest(appShop.shopId)
            })
        },
        getShopInfo: function (){

        },
        addShopRequest: function (shopName, address){
            $.ajax({
                url: '/shop/new',
                type: 'POST',
                data: {shopName, address},
                beforeSend: appShop.animation(),
                success: function (data){
                    console.log(data)
                    if(data.status === 200){
                        location.href = '/dashboard-senior'
                    } else {
                        appShop.animation()
                        alert('Something wrong' + data.mess)
                    }
                },
                error: function (){
                    appShop.animation()
                    alert('Something wrong')
                }
            })
        },
        deleteRequest: function (shopId){
            $.ajax({
                url: '/shop/delete',
                type: 'DELETE',
                data: {shopId},
                beforeSend: appShop.animation(),
                success: function (data){
                    if(data.status === 200){
                        location.href = '/dashboard-senior'
                    } else {
                        appShop.animation()
                        alert(data.notification)
                    }
                },
                error: function (){
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
            appShop.eventListener()
        }
    }
    appShop.run()
})