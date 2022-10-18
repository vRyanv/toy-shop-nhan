$(document).ready(function (){
    const appHome = {
        eventListener: function (){
            $('#btn_search_product').click(function (){
                appHome.searchPro()
            })
        },
        searchPro: function (){
            let proName = $('#txt_search_pro').val()
            if (proName.trim() !== '') {
                $.ajax({
                    url: '/cust-search-pro/' + proName,
                    type: 'GET',
                    beforeSend: appHome.animation(),
                    success: function (data) {
                        if (data.status === 200) {
                            appHome.renderProList(data.proList)
                            appHome.animation()
                        } else {
                            appHome.animation()
                            alert('something wrong! ' + data.notification)
                        }
                    },
                    error: function () {
                        animation()
                        alert('something wrong!')
                    }
                })
            }
        },
        renderProList: function (proList){
            var proListHTML = ''
            for (let i = 0; i < proList.length; i++) {
                let proHTML = `<div class="ads_250_250" style="margin-bottom: 2rem; margin-left: 1rem">
                        <img src="/image/${proList[i].pro_image}" alt="image" width="250" height="250">
                        <div style="text-align: left">
                            <p id="pro_name">Name: ${proList[i].pro_name} </p>
                            <p id="cate_name">Category:  ${proList[i].cat_name}</p>
                            <p id="pro_price">Price: $${proList[i].price} %></p>
                            <p id="sup_name">Supplier: ${proList[i].supplier_name} </p>
                            <p id="shop_name">Shop: ${proList[i].shop_name }</p>
                            <p id="pro_quantity">Quantity: ${proList[i].quantity} </p>
                        </div>
                    </div>`
                proListHTML += proHTML
            }

            $('#body_pro_list').empty()
            $('#body_pro_list').append(proListHTML)
        },
        animation: function (){
            if($('.overplay-animation').css('display') === 'none')
            {
                console.log('show')
                $('.overplay-animation').css('display', 'block')
            }
            else
            {
                console.log('hide')
                $('.overplay-animation').css('display', 'none')
            }
        },
        run: function (){
            appHome.eventListener()
        }
    }

    appHome.run()
})