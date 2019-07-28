new Vue({
    el: '#desafio',
    data: {
        valor: ''
    },
    methods: {
      atualizarValor(e){
          this.valor = e.target.value;
      },
      exibirAlerta(){
          alert("Eu recebi um alerta")
      }  
    },
});