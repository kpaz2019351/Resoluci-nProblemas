class Convertir {
    constructor() {
        this.unidades = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
        this.dieciseis = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis'];
        this.decimas = ['treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
        this.theMensaje = document.getElementById('message');
        this.addListener();
    }

    addListener(){
        let elInput = document.getElementById('parseText');
        elInput.addEventListener('keyup', ()=>{
            if(elInput.value !== ''){
                this.convertToText(elInput.value);
            }else{
                this.theMensaje.innerText = '';
            }
        })
    }

    convertToText(number) {
        number = this.deleteZerosLeft(number);
        if(this.validateNumer(number)){ 
            this.theMensaje.innerText = 'Solo números: enteros, positivos y menores a 200';
            return;
        }
        this.theMensaje.innerText = this.getName(number);

    }

    deleteZerosLeft(number) {
        let i = 0;
        let isZero = true;
        for (i = 0; i< number.length; i++){
            if(number.charAt(i) != 0){
                isZero = false;
                break;
            }
        }
        return isZero ? '0' : number.substr(i);
    }

    validateNumer(number){
        if(isNaN(number) || number == ''){
            return false;
        }
        
        if (number.indexOf('.') >=0){
            return false;
        }

        if(number.indexOf('-') >= 0){
            return false;
        }
        if(number <= 200){
            return false;
        }
        return true;
    }

    getName(number) {
        number = this.deleteZerosLeft(number);

        if(number.length === 1 ){
            return this.getUnits(number);
        }
        if(number.length === 2 ){
            return this.getTens(number);
        }
        if(number.length === 3){
            return this.getHundred(number);
        }
    }

    getUnits(number){
        let numberInt = parseInt(number);
        return this.unidades[numberInt];
    }

    getTens(number){
        let units = number.charAt(1);
        if (number < 17){
            return this.dieciseis[number - 10];
        }
        if(number < 20){
            return 'dieci' + this.getUnits(units);
        }
        switch (number){
            case '20':
                return 'veinte';
            case '22':
                return 'veintidos';
            case '23':
                return 'veintitres';
            case '26':
                return 'veintiseis';
        }
        if(number < 30) {
            return 'veinti' + this.getUnits(units);
        }
        let name = this.decimas[number.charAt(0) - 3];
        if (units > 0){
            name += ' y ' + this.getUnits(units)
        }
        return name;
    }

    getHundred(number){
        let name = '';
        let hundreds = number.charAt(0);
        let tens = number.substr(1);
        
        if(number == 100){
            return 'cien';
        }
        switch(hundreds){
            case '1':
                name = 'ciento ';
                break

        }
        if(name === ''){
            name = this.getUnits(hundreds) + 'cientos';
        }
        if (tens > 0){
            name += '' + this.getName(tens)
        }
        return name;
    }
}


new Convertir();