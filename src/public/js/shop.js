$(document).ready(function (){
    const appShop = {
        shopId: null,
        eventListener: function (){
            $('#shop_form').submit(function (e){
                e.preventDefault()
                if($('#btn_add_shop').html() === 'Add'){
                    appShop.addShopRequest($('#txt_shop_name').val(),  $('#txt_shop_address').val(), '/shop/new')
                } else {
                    appShop.addShopRequest($('#txt_shop_name').val(),  $('#txt_shop_address').val(), 'shop/edit/')
                }
            })

            $('.btn-delete-shop').click(function (){
                appShop.shopId = $(this).data('shop-id')
                $('.modal-body').html('Do you want to delete this shop ?')
            })

            $('#btn_ok_delete').click(function (){
                appShop.deleteRequest(appShop.shopId)
            })

            $('.btn-edit-shop').click(function (){
                appShop.getShopInfo($(this).data('shop-id'))
            })

            $('#btn_new_shop').click(function (){
                $('.title-shop-form').html('Add shop')
                $('#txt_shop_address').val('')
                $('#txt_shop_name').val('')
                $('#btn_add_shop').html('Add')
            })
        },
        getShopInfo: function (shopId){
            $.ajax({
                url: '/shop/edit/'+shopId,
                type: 'GET',
                beforeSend: appShop.animation(),
                success: function (data){
                    if(data.status === 200){
                        appShop.renderShopInfo(data.shop)
                    } else {
                        appShop.animation()
                    }
                },
                error: function (){
                    appShop.animation()
                    alert('something wrong!')
                }
            })
        },
        renderShopInfo: function (shop){
            $('#txt_shop_name').val(shop[0].shop_name)
            $('#txt_shop_address').val(shop[0].address)
            $('#hidden_shop_id').val(shop[0].shop_id)
            $('.title-shop-form').html('Edit shop')
            $('#btn_add_shop').html('Update')
            appShop.animation()
            $('#btn_open_edit_form').click()
        },
        addShopRequest: function (shopName, address, action){
            let shopId = $('#hidden_shop_id').val()
            $.ajax({
                url: action,
                type: 'POST',
                data: {shopId, shopName, address},
                beforeSend: appShop.animation(),
                success: function (data){
                    console.log(data)
                    if(data.status === 200){
                        location.href = '/dashboard-senior'
                    } else {
                        appShop.animation()
                        alert('Something wrong' + data.notification)
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