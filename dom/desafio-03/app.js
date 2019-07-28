new Vue({
    el: '#desafio',
    data: {
        valor: 0
    },computed: {
        resultado(){
            return this.valor;
        }
    },
    watch: {
        resultado(novo,antigo){
          setTimeout(()=>{
              this.valor = 0;
          },5000)
        }
    },
});