class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
    //oque faz o placar fucionar:D<:>
    this.rank=0
    this.score=0
  }

  addPlayer() {
    var playerIndex = "players/player" + this.index;

    if (this.index === 1) {
      this.positionX = width / 2 - 100;
    } else {
      this.positionX = width / 2 + 100;
    }

    database.ref(playerIndex).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
      rank:this.rank,
      score:this.score
    });
  }

  getCount() {
    var playerCountRef = database.ref("playerCount");
    playerCountRef.on("value", data => {
      playerCount = data.val();
    });
  }

  updateCount(count) {
    database.ref("/").update({
      playerCount: count
    });
  }
  //função update diretamente na classe player pra atualiza os players em sua prisão perpetua por rouba o messi
  update() {
    var playerIndex = "players/player" + this.index;
    //database.ref puxando a localização do player que fugiram da prisão com ajuda do pele
    database.ref(playerIndex).update({
      //atualizando a localização do player fugitivos com o pele
      positionX: this.positionX,
      positionY: this.positionY
    });
  }

  static getPlayersInfo() {
    var playerInfoRef = database.ref("players");
    playerInfoRef.on("value", data => {
      allPlayers = data.val();
    });
  }
  //pegando os valores do banco de dados quadando no playerDistanceref e procurando os players e o pele
  getDistance(){
    var playerDistanceref=database.ref("players/player"+this.index)
    playerDistanceref.on("value",data=>{
      var data=data.val();
      this.positionX=data.positionX
      this.positionY=data.positionY
    })
  }
}
