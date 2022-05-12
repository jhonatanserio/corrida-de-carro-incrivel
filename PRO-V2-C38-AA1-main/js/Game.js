class Game {
  constructor() {}

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

  handlePlayerControls() {
    //manipulando eventos de teclado
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 10;
      player.update();
    }
  }
}
