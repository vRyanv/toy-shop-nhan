$(document).ready(function (){
    const appCategory = {
        cateId: null,
        eventListener: function (){
            $('#cate_form').submit(function (e){
                e.preventDefault()
                if($('#btn_submit_cate').html() === 'Add'){
                    appCategory.newCate($('#txt_cate_name').val())
                } else {
                    appCategory.updateCate($('#txt_cate_id').val(), $('#txt_cate_name').val())
                }
            })

            $('.btn-edit-cate').click(function (){
                appCategory.getCateInfo($(this).data('cate-id'))
            })

            $('#btn_new_cate').click(function (){
                appCategory.renderNewCate()
            })

            $('.btn-delete-cate').click(function (){
                $('#modal_body_delete').html('Do you want to delete this category')
                appCategory.cateId = $(this).data('cate-id')
            })

            $('#btn_ok_delete').click(function (){
                appCategory.deleteCate(appCategory.cateId)
            })
        },
        newCate: function (cateName){
            $.ajax({
                url: '/category/new',
                type: 'POST',
                data: {cateName},
                beforeSend: appCategory.animation(),
                success: function (data){
                    if(data.status === 200){
                        location.href = '/category'
                    } else {
                        appCategory.animation()
                        alert('something wrong! ' + data.notification)
                    }
                },
                error: function (){
                    appCategory.animation()
                    alert('something wrong!')
                }
            })
        },
        updateCate: function (cateId, cateName){
            $.ajax({
                url: '/category/edit',
                type: 'PUT',
                data: {cateId,cateName},
                beforeSend: appCategory.animation(),
                success: function (data){
                    if(data.status === 200){
                        location.href = '/category'
                    } else {
                        appCategory.animation()
                        alert('something wrong! ' + data.notification)
                    }
                },
                error: function (){
                    appCategory.animation()
                    alert('something wrong!')
                }
            })
        },
        getCateInfo: function (cateId){
            $.ajax({
                url: '/category/edit/'+cateId,
                type: 'GET',
                beforeSend: appCategory.animation(),
                success: function (data){
                    if(data.status === 200){
                        appCategory.renderCateForm(data.category)
                    } else {
                        appCategory.animation()
                        alert('something wrong! ' + data.notification)
                    }
                },
                error: function (){
                    appCategory.animation()
                    alert('something wrong!')
                }
            })

        },
        renderCateForm: function (category){
            $('#title_model_cate').html('Edit Category')
            $('#btn_submit_cate').html('Update')
            $('#txt_cate_name').val(category.cat_name)
            $('#txt_cate_id').val(category.cat_id)
            $('#btn_open_edit_form').click()
            appCategory.animation()
        },
        renderNewCate: function (){
            $('#title_model_cate').html('Add Category')
            $('#btn_submit_cate').html('Add')
            $('#txt_cate_name').val('')
            $('#txt_cate_id').val('')
        },
        deleteCate: function (cateId){
            $.ajax({
                url: '/category/delete',
                type: 'DELETE',
                data: {cateId},
                beforeSend: appCategory.animation(),
                success: function (data){
                    if(data.status === 200){
                        location.href = '/category'
                    } else {
                        appCategory.animation()
                        alert('something wrong! ' + data.notification)
                    }
                },
                error: function (){
                    appCategory.animation()
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
            appCategory.eventListener()
        }
    }
    appCategory.run()
})