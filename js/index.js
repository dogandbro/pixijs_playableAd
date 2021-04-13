let app;
let appHolder, menu, menu2, menu3, menuHover, isHover, btn, oldStair, hammer, hammerClicked, menuH, menuW;
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
    austin.x = 750;
    austin.y = 250;
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
    btn.x = 700;
    btn.y = 550;
    btn.anchor.x = 0.5;
    btn.anchor.y = 0.5;
    ease.add(btn, { width: btn.width * 1.05, height: btn.height * 1.05 }, { repeat: true, reverse: true, ease: 'easeOutQuad' });



    menu = new PIXI.Sprite(PIXI.loader.resources.menu.texture);
    menuH = menu.height;
    menuW = menu.width;
    menu.x = 840;
    menu.y = 80;
    menu.buttonMode = true;
    menu.interactive = true;
    menu.hitArea = new PIXI.Circle(menu.width / 2, menu.height / 2, menu.width / 2);
    menu.width = 0;
    menu.height = 0;
    menu.anchor.x = 0.5;
    menu.anchor.y = 0.5;

    menu2 = new PIXI.Sprite(PIXI.loader.resources.menu.texture);
    menu2.x = 970;
    menu2.y = 80;
    menu2.buttonMode = true;
    menu2.interactive = true;
    menu2.hitArea = new PIXI.Circle(menu2.width / 2, menu2.height / 2, menu2.width / 2);
    menu2.width = 0;
    menu2.height = 0;
    menu2.anchor.x = 0.5;
    menu2.anchor.y = 0.5;

    menu3 = new PIXI.Sprite(PIXI.loader.resources.menu.texture);
    menu3.x = 1100;
    menu3.y = 80;
    menu3.buttonMode = true;
    menu3.interactive = true;
    menu3.hitArea = new PIXI.Circle(menu.width / 2, menu.height / 2, menu.width / 2);
    menu3.width = 0;
    menu3.height = 0;
    menu3.anchor.x = 0.5;
    menu3.anchor.y = 0.5;

    menuHover = new PIXI.Sprite(PIXI.loader.resources.menuHover.texture);
    menuHover.x = 300;
    menuHover.y = 300;
    menuHover.alpha = 0;


    hammer.on('click', function(){
      console.log('HHHHHHHHaaammer');
      hammerClicked = true;
      console.log('-- hammer clicked --')
      ease.add(menu, { width: menuW, height: menuH }, { duration: 500, ease: 'easeOutBounce' });

      window.setTimeout(function() {
        ease.add(menu2, { width: menuW, height: menuH }, { duration: 500, ease: 'easeOutBounce' });
      }, 200 );

      window.setTimeout(function() {
        ease.add(menu3, { width: menuW, height: menuH }, { duration: 500, ease: 'easeOutBounce' });
      }, 400 );
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
    app.stage.addChild(menu2);
    app.stage.addChild(menu3);
    app.stage.addChild(menuHover);
    app.stage.addChild(oldStair);
    app.stage.addChild(hammer);

    animate();
  }

  function animate() {

    if (hammer.alpha > 0 && hammerClicked) {
      console.log('-- hammer clicked --')
      hammer.alpha -= .05;
      hammer.interactive = false;
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
      if (hammer.alpha < 1 && !hammerClicked) {
        console.log('-- hammer --')
        hammer.alpha += .02;
      }
    }, 2000 );

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



