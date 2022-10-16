$(document).ready(function (){
    const appShop = {
        shopId: null,
        eventListener: function (){
            $('#shop_form').submit(function (e){
                e.preventDefault()
                appShop.addShopRequest($('#txt_shop_name').val(),  $('#txt_shop_address').val())
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
        deleteRequest: function (){

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