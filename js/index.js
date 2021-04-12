let app;
let appHolder, menu, menuHover, isHover, btn, oldStair, hammer, hammerClicked;
const ease = new Ease.Ease();

window.onload = function() {
  const size = [1390, 640];
  const ratio = size[0] / size[1];
//Create a Pixi Application
  app = new PIXI.Application({
            width: size[0],         // default: 800
            height: size[1],        // default: 600
            antialias: true,    // default: false
            transparent: false, // default: false
            resolution: 1       // default: 1
        }
    );

  app.renderer.view.style.position = "absolute";
  app.renderer.view.style.display = "block";
  app.renderer.autoResize = true;
  //app.renderer.resize(window.innerWidth, window.innerHeight);


  appHolder = document.getElementById("playable");
  appHolder.appendChild(app.view);

  //load an image and run the `setup` function when it's done
  PIXI.loader
    .add("bg", "images/background.jpg")
    .add("austin", "images/austin.png")
    .add("menu", "images/menu.png")
    .add("menuHover", "images/menu-hover.png")
    .add("btn", "images/btn.png")
    .add("oldStair", "images/old-stair.png")
    .add("hammer", "images/hammer.png")
    .load(setup);




//This `setup` function will run when the image has loaded
  function setup() {

    let bg = new PIXI.Sprite(PIXI.loader.resources.bg.texture);
    //bg.y = app.renderer.view.height / 2 - bg.height / 2;

    let austin = new PIXI.Sprite(PIXI.loader.resources.austin.texture);
    austin.x = 150;
    austin.y = 150;
    austin.anchor.x = 0.5;
    austin.anchor.y = 0.5;
    austin.scale.x = 1;

    oldStair = new PIXI.Sprite(PIXI.loader.resources.oldStair.texture);
    oldStair.x = 833;
    oldStair.y = 130;

    hammer = new PIXI.Sprite(PIXI.loader.resources.hammer.texture);
    hammer.x = 1150;
    hammer.y = 330;
    hammer.alpha = 0;
    hammer.buttonMode = true;
    hammer.anchor.x = 0.5;
    hammer.anchor.y = 0.5;
    hammer.interactive = true;
    hammer.hitArea = new PIXI.Circle(0, 0, hammer.width / 2);
    ease.add(hammer, { y: hammer.y + 10 }, { repeat: true, reverse: true, ease: 'easeOutQuad' });

    /*var mask = new PIXI.Graphics();

    mask.beginFill(0xFFFFFF);
    mask.lineStyle(0);
    mask.drawCircle(0, 0, hammer.width / 2);
    mask.endFill();

    var texture = app.renderer.generateTexture(mask);
    var circle = new PIXI.Sprite(texture);
    hammer.addChild(circle);*/

    btn = new PIXI.Sprite(PIXI.loader.resources.btn.texture);
    btn.x = 500;
    btn.y = 500;
    btn.anchor.x = 0.5;
    btn.anchor.y = 0.5;
    ease.add(btn, { width: btn.width * 1.05, height: btn.height * 1.05 }, { repeat: true, reverse: true, ease: 'easeOutQuad' });

    menu = new PIXI.Sprite(PIXI.loader.resources.menu.texture);
    menu.x = 1000;
    menu.y = 20;
    menu.interactive = true;
    menu.hitArea = new PIXI.Circle(menu.width / 2, menu.height / 2, menu.width / 2);
    menu.alpha = 0;

    menuHover = new PIXI.Sprite(PIXI.loader.resources.menuHover.texture);
    menuHover.x = 300;
    menuHover.y = 300;
    menuHover.alpha = 0;


    hammer.on('click', function(){
      console.log('HHHHHHHHaaammer');
      hammerClicked = true;
    });

    menu.on('click', function(){
      console.log('hello');
    });

    menu.on('mouseover', function(){
      isHover = true;
    });

    menu.on('mouseout', function(){
      isHover = false;
    });

    //Add images to the stage
    app.stage.addChild(bg);
    app.stage.addChild(austin);
    app.stage.addChild(btn);
    app.stage.addChild(menu);
    app.stage.addChild(menuHover);
    app.stage.addChild(oldStair);
    app.stage.addChild(hammer);

    animate();
  }

  function animate() {

    if (menu.alpha < 1 && hammerClicked) {
      console.log('-- hammer clicked --')
      menu.alpha += 0.1;
    }

    if (menuHover.alpha < 1 && isHover) {
      console.log('-- hover --')
      menuHover.alpha += 0.1;
    }

    if (menuHover.alpha > 0 && !isHover) {
      console.log('-- hoverOut --')
      menuHover.alpha -= .1;
    }

    window.setTimeout(function() {
      if (hammer.alpha < 1) {
        console.log('-- hammer --')
        hammer.alpha += .02;
      }
    }, 3000 );

    requestAnimationFrame(animate);
    app.renderer.render(app.stage);
  }

  function resize() {
    if (window.innerWidth / window.innerHeight >= ratio) {
      var w = window.innerHeight * ratio;
      var h = window.innerHeight;
    } else {
      var w = window.innerWidth;
      var h = window.innerWidth / ratio;
    }
    app.renderer.view.style.width = w + 'px';
    app.renderer.view.style.height = h + 'px';
  }

  resize();
  window.onresize = resize;
}

/*window.addEventListener("resize", function(event){
  scaleToWindow(app.view);
});*/



