
var app = new Vue({
    el: '#app',
    data: {
    message: 'Hello Vue!',
    colorAzul:"color-azul",
    colorRojo:"color-rojo",
    colorSet:"color-azul",
    contador: 1,
    showAzul:true,
    disabledBoton:false,
    Ty:0,
    Tx:0,
    Tr:0,
    resultadoTr:[]   
    },
    created:function() {
        window.addEventListener('keyup', this.keyboardEvent);
    },
    beforeDestroy:function() {
        window.removeEventListener('keyup', this.keyboardEvent);
    },
    computed:{
        getcolor:function(){
            return this.colorSet;
        }
    },
    methods:{
        iniciar:function(){
            this.disabledBoton = true;
            setTimeout(this.iniciarJuego, this.segundosRamdon());
        },
        segundosRamdon:function(){
            
            var segundosArray = [2000, 3000, 4000, 5000];
            let elemento = segundosArray[Math.floor(Math.random()*segundosArray.length)];
            console.log(elemento);
            return elemento;
        },
        keyboardEvent:function(event){
            if(event.keyCode === 32 && this.colorSet =='color-rojo'){
                var ahora = new Date();
                var milisegundos = ahora.getMilliseconds();
                this.Ty = milisegundos;
                this.Tr = Math.abs(this.Ty - this.Tx);
                this.resultadoTr.push(this.Tr);
            }
            
        },
        iniciarJuego:function(){
           if(this.resultadoTr.length == 10){
               return;
           }
            this.colorSet = this.showAzul?this.colorRojo:this.colorAzul;
            this.showAzul = !this.showAzul;
            console.log(this.colorSet);
            var ahora = new Date();
            var milisegundos = ahora.getMilliseconds();
            this.Tx = milisegundos;
            this.contador++;
            setTimeout(this.iniciarJuego, this.segundosRamdon());

        }, 
        crearCsv:function(){
            var datos = Array.from(this.resultadoTr);
            var csv = '';
            datos.forEach(function(row) {
                csv += row + ',';
                csv += "\n";
            });
     
        console.log(csv);
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'tiempos-tr.csv';
        hiddenElement.click();
        }
    },
    watch:{

    }
});
