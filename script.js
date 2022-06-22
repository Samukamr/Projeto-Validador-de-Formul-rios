
let B7Validator = {
    // ela para o evento de submit
    handleSubmit:(event)=>{
        event.preventDefault();
        let send = true;

        // pegar os inputs
        let inputs = form.querySelectorAll('input');

        // Limpar os erros
        B7Validator.clearErrors();

        // loop dentro dos campos para verificar cada um deles
        for(let i=0;i<inputs.length;i++) {
            let input = inputs[i];
            let check = B7Validator.checkInput(input);
            if(check !== true) { // se a função não retornar true
                send = false; // exibe o erro
                B7Validator.showError(input, check);
            }
        }

        if(send) {
            form.submit();
        }
    },
    // essa função vai verificar cada uma das regras especificas
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');
        // se tiver alguma regra !== null, significa que tem alguma regra
        if(rules !== null) {
            rules = rules.split('|'); // separa as regras
            for(let k in rules) { // verificar cada uma das regras:
                let rDetails = rules[k].split('=');
                switch(rDetails[0]) {
                    case 'required':
                        if(input.value == '') {
                            return 'Campo não pode ser vazio.';
                        }
                    break;
                    case 'min':
                        if(input.value.length < rDetails[1]) { //quantidade minima de caracteres
                            return 'Campo tem que ter pelo menos '+rDetails[1]+' caractes';
                        }
                    break;
                    case 'email':
                        if(input.value != '') { //Campo email
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!regex.test(input.value.toLowerCase())) {
                                return 'E-mail digitado não é válido!';
                            }
                        }
                    break;
                }
            }
        }

        return true;
    },
    // função pra exibir o erro
    showError:(input, error) => {
        input.style.borderColor = '#FF0000'; // cor da borda quando da erro

        // criei um elemento pra exibir o erro "div"
        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        // adicionar a div                             // ElementSibling, pra adicionar a div depois do elemento
        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    //Função pra limpar os erros
    clearErrors:() => {
        //remover a marcação de erro depois de corrigir o erro.
        let inputs = form.querySelectorAll('input');
        for(let i=0;i<inputs.length;i++) { 
            inputs[i].style = '';
        }

        // remover os erros
        let errorElements = document.querySelectorAll('.error'); 
        for(let i=0;i<errorElements.length;i++) { // loop em cada um
            errorElements[i].remove(); // e remove
        }
    }
};


let form = document.querySelector('.b7validator');
form.addEventListener('submit', B7Validator.handleSubmit); 