$(document).ready(function () {
    const $form = $('#form_certificacao');
    const $inputText = $form.find('.input_view');
    const $formName = $form.find('[name="name"]');
    const $formEmail = $form.find('[name="email"]');
    const $formPhone = $form.find('[name="phone"]');
    const $formSubject = $form.find('[name="subject"]');
    const $formMsg = $form.find('[name="msg"]');
    const $btnLimpar = $form.find('.btn_limpar');
    const formData = JSON.parse(sessionStorage.getItem('formData'));

    $form.form({
        on: 'blur',
        fields: {
            text: {
                identifier : 'name',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'O campo "nome" é obrigatório'
                    }
                ]
            },
            email: {
                identifier : 'email',
                rules: [
                    {
                        type   : 'email',
                        prompt : 'O campo "e-mail" é obrigatório'
                    }
                ]
            },
            phone: {
                identifier : 'phone',
                rules: [{
                    type: 'regExp',
                    value: /(^|\()?\s*(\d{2})\s*(\s|\))*(9?\d{4})(\s|-)?(\d{4})($|\n)/u,
                    prompt: 'Telefone inválido. Ex: (18) 3322-3322 ou (18) 98765-4321'
                }]
            },
            subject: {
                identifier : 'subject',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'O campo "assunto" é obrigatório'
                    }
                ]
            },
            message: {
                identifier : 'msg',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'A mensagem é obrigatória'
                    }
                ]
            },
        },
        onSuccess: function() {
            let msgSuccess = formData ? 'Dados atualizados com sucesso!' : 'Dados gravados com sucesso!';

            sessionStorage.setItem(
                'formData', 
                JSON.stringify({
                    name: $formName.val().trim(),
                    email: $formEmail.val().trim(),
                    phone: $formPhone.val().trim(),
                    subject: $formSubject.val().trim(),
                    message: $formMsg.val().trim(),
                })
            );

            $('.form_return').html('<div class="ui bottom attached positive message"><i class="save outline icon"></i>' + msgSuccess + '</div>');
            
            $inputText.each(function(){
                $(this).val('');
            })
            $('html, body').animate({ scrollTop: $('[name="msg"]').offset().top}, 1000);
            
            return false;
        },
        onFailure: function() {
            $('.form_return').html('<div class="ui bottom attached warning message"><i class="ban icon"></i>Erro ao gravar dados, preencha os campos corretamente!</div>');
            $('html, body').animate({ scrollTop: $('[name="msg"]').offset().top}, 1000);

            return false;
        }
    });

    if(formData){
        $formName.val(formData.name);
        $formEmail.val(formData.email);
        $formPhone.val(formData.phone);
        $formSubject.val(formData.subject);
        $formMsg.val(formData.message);

        $('#input_view_name').html($formName.val().trim());
        $('#input_view_email').html($formEmail.val().trim());
        $('#input_view_phone').html($formPhone.val().trim());
        $('#input_view_subject').html($formSubject.val().trim());
        $('#input_view_msg').html($formMsg.val().trim());
    }

    $inputText.on('change keyup', function(){
        $('#input_view_name').html($formName.val().trim());
        $('#input_view_email').html($formEmail.val().trim());
        $('#input_view_phone').html($formPhone.val().trim());
        $('#input_view_subject').html($formSubject.val().trim());
        $('#input_view_msg').html($formMsg.val().trim());
    });

    $btnLimpar.on('click', function(){
        $inputText.each(function(){
            $(this).val('');
        })
        $('#input_view_name').html('');
        $('#input_view_email').html('');
        $('#input_view_phone').html('');
        $('#input_view_subject').html('');
        $('#input_view_msg').html('');

        $('.form_return').html('<div class="ui bottom attached info message"><i class="check icon"></i>Dados excluídos com sucesso!</div>');
        $('html, body').animate({ scrollTop: $('[name="msg"]').offset().top}, 1000);

        sessionStorage.setItem(
            'formData', 
            JSON.stringify({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            })
        );
    });
});