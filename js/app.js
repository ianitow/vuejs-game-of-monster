new Vue({
    el: '#app',
    data: {
        logs: [],
        running: false,
        panelMageOpened: false,
        playerData: {
            name: "Ianito",
            life: 100,
            mana: 100,
            abilitys: [{
                name: "Bola de fogo",
                path: './assets/player/fire.png',
                cost: 25,
                range: [20, 30]
            }, {
                name: "Bola de Gelo",
                path: './assets/player/ice.png',
                cost: 15,
                range: [5, 15]
            }]
        },
        monsterData: {
            name: "Troglodita",
            life: 100,
            mana: 100,
            abilitys: [{
                name: "Pulo Gigante",
                cost: 15,
                range: [5, 10]
            }, {
                name: "Arroto Supremo",
                cost: 15,
                range: [5, 15]
            }]
        },
    },
    computed: {
        hasResult() {
            return ((this.playerData.life == 0 || this.monsterData.life == 0));
        },

    },
    methods: {
        startGame() {
            this.running = true;
            this.logs = [];
            this.panelMageOpened = false;
            this.playerData.life = 100;
            this.playerData.mana = 100
            this.monsterData.life = 100;
            this.monsterData.mana = 100

        },
        endGame() {
            this.running = false;
            this.panelMageOpened = false;


        },
        addLog(message, classe) {
            this.logs.unshift({
                message,
                classe
            })
        },
        playerAttack() {
            let random = Math.random() * (10 - 5) + 5;
            let number = Math.round(random);
            this.monsterHurt(number)
            this.addLog(`Player attack monster and damaged ${number}`, 'player');
            this.monsterRound();
        },
        playerUseSpell(index, btn) {
            let hability = this.playerData.abilitys[index];
            if (hability) {
                let isPossible = this.playerData.mana - hability.cost < 0 ? false : true;
                if (isPossible) {
                    this.playerData.mana -= hability.cost;
                    let random = Math.random() * (hability.range[1], hability.range[0]) + hability.range[0];
                    let number = Math.round(random);
                    this.monsterHurt(number)
                    this.addLog(`Player uses ${hability.name} and damaged ${number}`, 'player');
                    this.monsterRound();
                } else {
                    this.addLog("Player tried use spell but not enough mana...", 'info')
                }
            }

        },
        playerHeal(){
            let random = Math.random() * (20 - 10) + 10;
            let number = Math.round(random);
            this.playerData.life + number > 100 ? this.playerData.life = 100 : this.playerData.life += number;
            this.addLog(`Player healed yourself... Actual HP -> ${this.playerData.life}`, 'info');
            this.monsterRound();
        },
        playerMana(){
            let random = Math.random() * (20 - 10) + 10;
            let number = Math.round(random);
            this.playerData.mana + number > 100 ? this.playerData.mana = 100 : this.playerData.mana += number;
            this.addLog(`Player recovered mana... Actual Mana -> ${this.playerData.mana}`, 'info');
            this.monsterRound();
        },
        playerHurt(damage) {
            this.playerData.life - damage < 0 ? this.playerData.life = 0 : this.playerData.life = this.playerData.life - damage;
        },

        monsterAttack() {
            let random = Math.random() * (20 - 15) + 15;
            let number = Math.round(random);
            this.playerHurt(number);
            this.addLog(`Monster attack Player and damaged ${number}`, 'monster');
        },
        monsterHurt(damage) {
            this.monsterData.life - damage < 0 ? this.monsterData.life = 0 : this.monsterData.life = this.monsterData.life - damage;
        },
        monsterUseSpell() {
            let randomSpell = Math.round(Math.random());
            let hability = this.monsterData.abilitys[randomSpell];
            let isPossible = this.monsterData.mana - hability.cost < 0 ? false : true;
            if (isPossible) {
                this.monsterData.mana -= hability.cost;
                let random = Math.random() * (hability.range[1], hability.range[0]) + hability.range[0];
                let number = Math.round(random);
                this.playerHurt(number)
                this.addLog(`Monster uses ${hability.name} and damaged ${number}`, 'monster');
            } else {
                this.monsterAttack();
            }
        },
        monsterRound() {
            let spellOrAttack = Math.random();
            if (spellOrAttack == 0) {
                this.monsterAttack();
            } else {
                this.monsterUseSpell();
            }
        }

    },
    watch: {
        hasResult(value) {
            this.running = false;
        }
    },
});