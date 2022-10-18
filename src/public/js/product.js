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
                appPro.proId = $(this).data('pro-id')
                $('#modal_body_delete').html('Do you want to delete this product?')
            })

            $('.btn-edit-pro').click(function (){
                appPro.getProInfo($(this).data('pro-id'))
            })

            $('#btn_open_dialog_image').click(function (){
                $('#pro_img').click()
            })

            $('#pro_img').change(function (){
                appPro.previewImage()
            })

            $('#btn_ok_delete').click(function (){
                appPro.deletePro(appPro.proId)
            })

            $('#btn_search_product').click(function (){
                appPro.searchPro($('#txt_search_pro').val())
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
        getProInfo: function (proId){
            $.ajax({
                url: '/product/edit/'+proId,
                type: 'GET',
                beforeSend: appPro.animation(),
                success: function (data){
                    if(data.status === 200){
                        appPro.renderProUpdateForm(data.product)
                    } else {
                        appPro.animation()
                        alert('something wrong! ' + data.notification)
                    }
                },
                error: function (){
                    appPro.animation()
                    alert('something wrong!')
                }

            })
        },
        updatePro: function (product){
            var proForm = new FormData(product)
            console.log('here')
            $.ajax({
                url: '/product/edit',
                type: 'PUT',
                data: proForm,
                beforeSend: appPro.animation(),
                cache:false,
                contentType: false,
                processData: false,
                success: function (data){
                    if(data.status === 200){
                        location.href = '/dashboard-admin'
                    } else {
                        appPro.animation()
                        alert('something wrong! '+data.notification)
                    }
                },
                error: function (){
                    appPro.animation()
                    alert('something wrong!')
                }
            })
        },
        deletePro: function (proId){
            $.ajax({
                url: '/product/delete',
                type: 'DELETE',
                data: {proId},
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
                    alert('something wrong!')
                }
            })
        },
        searchPro: function (proName){
            if(proName.trim() !== ''){
                $.ajax({
                    url: '/product/find/'+proName,
                    type: 'GET',
                    beforeSend: appPro.animation(),
                    success: function (data){
                        if(data.status === 200){
                            appPro.renderProList(data.proList)
                        } else {
                            appPro.animation()
                            alert('something wrong! '+data.notification)
                        }
                    },
                    error: function (){
                        appPro.animation()
                        alert('something wrong!')
                    }
                })
            }
        },
        renderProList: function (proList){
            console.log(proList)
            var proListHTML = ''
            for (let i=0;i<proList.length;i++) {
                let proHTML = `
<div class="page-wrapper">
    <div class="page-inner">
        <div class="">
            <div class="col-3">
            <div class="el-wrapper">
                <div class="box-up">
                    <img class="img" src="/image/${proList[i].pro_image}" alt="">
                    <div class="img-info">
                        <div class="info-inner">
                            <span class="p-company">Category: ${proList[i].cat_name}</span>
                            <span class="p-company">Supplier: ${proList[i].supplier_name}</span>
                            <span class="p-company">Quantity: ${proList[i].quantity}</span>
                        </div>
                        <div class="a-size">Price : <span class="size">${proList[i].price}</span></div>
                    </div>
                </div>
                <div class="box-down">
                    <div class="h-bg">
                        <div class="h-bg-inner"></div>
                    </div>
                    <a class="cart">
                        <span class="price">${proList[i].pro_name}</span>
                        <span class="add-to-cart">
                            <div class="btn-group">
              <span class="txt"><button class="btn btn-warning btn-edit-pro" data-pro-id="${proList[i].pro_id}">Edit</button></span>
              <span class="txt"><button class="btn btn-danger btn-delete-pro" data-bs-toggle="modal" data-bs-target="#confirm_delete" data-pro-id="${proList[i].pro_id}">Delete</button></span>
                                </div>
            </span>
                    </a>
                </div>
            </div>
        </div>
        </div>
    </div>
</div>
`
                proListHTML += proHTML
            }

            $('#body_product').empty()
            $('#body_product').append(proListHTML)
            $('.btn-edit-pro').click(function (){
                appPro.getProInfo($(this).data('pro-id'))
            })
            $('.btn-delete-pro').click(function (){
                appPro.proId = $(this).data('pro-id')
                $('#modal_body_delete').html('Do you want to delete this product?')
            })
            appPro.animation()
        },
        renderProUpdateForm: function (product){
            $('#pro_name').val(product.pro_name)
            $('#pro_cate').val(product.cat_id)
            $('#pro_sup').val(product.supplier_id)
            $('#pro_price').val(product.price)
            $('#pro_quantity').val(product.quantity)
            $('#pro_id').val(product.pro_id)
            $('#img_preview').attr('src', `image/${product.pro_image}`)
            $('#title_model_pro').html('Edit product')
            $('#btn_add_pro').html('Update')
            $('#btn_open_update_pro_form').click()
            appPro.animation()
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