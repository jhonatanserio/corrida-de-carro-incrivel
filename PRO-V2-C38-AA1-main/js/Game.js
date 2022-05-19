class Game {
  constructor() {
    //botão de volta ao zero
    this.resetTitle=createElement("h2")
    this.resetButton=createButton("")
    //texto de potuação pra poder zoa teu amiginho ruin no jogo :D
    this.leaderBorderTitle=createElement("h2")
    this.leader1=createElement("h2")
    this.leader2=createElement("h2")
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
    //função para mostra o texto de reiniciar o jogo em cima do botão que obviamente faz isso :D
    this.resetTitle.html("reiniciar o jogo")
    this.resetTitle.class("resetText")
    this.resetTitle.position(width/2+200,100)
    //botão que reinicia o jogo
    this.resetButton.class("resetButton")
    this.resetButton.position(width/2+230,150)
    //oque mostra o placar e quem ta na frente
    this.leaderBorderTitle.html("placar")
    this.leaderBorderTitle.class("resetText")
    this.leaderBorderTitle.position(width/3-250,100)
    //o seu placa e quantos pontos se tem
    this.leader1.html("player1")
    this.leader1.class("leadersText")
    this.leader1.position(width/3-250,130)
    //placa do seu amigo que ta perdendo
    this.leader2.html("player2")
    this.leader2.class("leadersText")
    this.leader2.position(width/3-250,160)

    //condição pra mover a camera para cima seguindo os carros roubados sexta a noite
    if(keyIsDown(UP_ARROW)){
      player.positionY+=10
      player.update()
    //mostrando onde os players que roubaram os carros sexta a noite estão
    }
  }

  play() {
    this.handleElements();

    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);
      this.showLeaderboard()
      
      //índice da matriz
      var index = 0;
      for (var plr in allPlayers) {
        //adicione 1 ao índice para cada loop
        index = index + 1;

        //use os dados do banco de dados para exibir os carros nas direções x e y
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;
        //variavel pra ver o ultimo lugar aonde os carros foram visto
        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;
        if(index==player.index){
          fill("red")
          ellipse(x,y,60,60)
          camera.position.x=cars[index - 1].position.x
          camera.position.y=cars[index - 1].position.y
        }
      }
   
       //chamando a função q adicionara a função de controle pra ver os carros ou seguir eles em um beco escuro a sexta a noite
     this.handlePlayerControls();

      drawSprites();
    }
  }


  //oque faz a logica do placar para n fica com 0 pontos
  showLeaderboard(){
    var leader1
    var leader2
    var players=Object.values(allPlayers)
    if((players[0].rank===0 && players[1].rank===0)||players[0].rank===1){
      leader1=
      players[0].rank+
      "    "+
      players[0].name+
      "    "+    
      players[0].score+
      "    "

      leader2=
      players[0].rank+
      "    "+
      players[0].name+
      "    "+    
      players[0].score+
      "    " 
    }
      if(players[1].rank===1){
        leader1=
        players[0].rank+
        "    "+
        players[0].name+
        "    "+    
        players[0].score+
        "    "
        
        leader2=
        players[0].rank+
        "    "+
        players[0].name+
        "    "+    
        players[0].score+
        "    "
    }
    this.leader1.html(leader1)
    this.leader2.html(leader2)
  }
  handlePlayerControls() {
    //manipulando eventos de teclado
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 10;
      player.update();
    }
  }
}
