new Vue({
	el: '#desafio',
	data: {
		isDestaque:true,
		isEfeito:false,
		isClasse:false,
		classeUser: 'ianito2',
		value:0,
		percent:0
	
	

	},
	methods: {
		iniciarEfeito() {
			setInterval(()=>{
				if(this.isDestaque){
					this.isDestaque = false;
					this.isEfeito = true;
				}else{
					this.isDestaque = true;
					this.isEfeito = false;
				}
			},1000)
		},
		iniciarProgresso() {
			setInterval(()=>{
				
			this.percent = this.percent+10;
			},1000)
		}
	},
	computed: {
		todosEstilos(){
			return {
				'ianito1':true,
				'ianito2':true
			}
		},
		valorNomeComputed(){
			return {'ianito4':(this.isClasse =="true" ? true : false)};
		},
		objectClass(){
			return {
				'width': this.value+'px',
				'height':this.value+'px'
			}
		}
		
	}
});
