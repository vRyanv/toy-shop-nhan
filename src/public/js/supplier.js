$(document).ready(function (){
    const appSup = {
        supId: null,
        eventListener: function (){
            $('#sup_form').submit(function (e){
                e.preventDefault()
                if($('#btn_submit_sup').html() === 'Add'){
                    appSup.newSup($('#txt_sup_name').val())
                } else {
                    appSup.updateSup($('#txt_sup_id').val(), $('#txt_sup_name').val())
                }
            })

            $('.btn-edit-sup').click(function (){
                appSup.getSupInfo($(this).data('sup-id'))
            })

            $('#btn_new_sup').click(function (){
                appSup.renderNewSup()
            })

            $('.btn-delete-sup').click(function (){
                $('#modal_body_delete').html('Do you want to delete this supplier')
                appSup.supId = $(this).data('sup-id')
            })

            $('#btn_ok_delete').click(function (){
                appSup.deleteSup(appSup.supId)
            })
        },
        newSup: function (supName){
            $.ajax({
                url: '/supplier/new',
                type: 'POST',
                data: {supName},
                beforeSend: appSup.animation(),
                success: function (data){
                    if(data.status === 200){
                        location.href = '/supplier'
                    } else {
                        appSup.animation()
                        alert('something wrong! ' + data.notification)
                    }
                },
                error: function (){
                    appSup.animation()
                    alert('something wrong!')
                }
            })
        },
        updateSup: function (supId, supName){
            $.ajax({
                url: '/supplier/edit',
                type: 'PUT',
                data: {supId,supName},
                beforeSend: appSup.animation(),
                success: function (data){
                    if(data.status === 200){
                        location.href = '/supplier'
                    } else {
                        appSup.animation()
                        alert('something wrong! ' + data.notification)
                    }
                },
                error: function (){
                    appSup.animation()
                    alert('something wrong!')
                }
            })
        },
        getSupInfo: function (supId){
            $.ajax({
                url: '/supplier/edit/'+supId,
                type: 'GET',
                beforeSend: appSup.animation(),
                success: function (data){
                    if(data.status === 200){
                        appSup.renderSupForm(data.supplier)
                    } else {
                        appSup.animation()
                        alert('something wrong! ' + data.notification)
                    }
                },
                error: function (){
                    appSup.animation()
                    alert('something wrong!')
                }
            })

        },
        renderSupForm: function (supplier){
            $('#title_model_sup').html('Edit Supplier')
            $('#btn_submit_sup').html('Update')
            $('#txt_sup_name').val(supplier.supplier_name)
            $('#txt_sup_id').val(supplier.supplier_id)
            $('#btn_open_edit_form').click()
            appSup.animation()
        },
        renderNewSup: function (){
            $('#title_model_sup').html('Add Supplier')
            $('#btn_submit_sup').html('Add')
            $('#txt_sup_name').val('')
            $('#txt_sup_id').val('')
        },
        deleteSup: function (supId){
            $.ajax({
                url: '/supplier/delete',
                type: 'DELETE',
                data: {supId},
                beforeSend: appSup.animation(),
                success: function (data){
                    if(data.status === 200){
                        location.href = '/supplier'
                    } else {
                        appSup.animation()
                        alert('something wrong! ' + data.notification)
                    }
                },
                error: function (){
                    appSup.animation()
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
            appSup.eventListener()
        }
    }
    appSup.run()
})