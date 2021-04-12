let app;
let appHolder, menu, menuHover, isHover, btn, oldStair;
const ease = new Ease.Ease();

window.onload = function() {
//Create a Pixi Application
  app = new PIXI.Application({
            width: 1390,         // default: 800
            height: 640,        // default: 600
            antialias: true,    // default: false
            transparent: false, // default: false
            resolution: 1       // default: 1
        }
    );

  app.renderer.view.style.position = "absolute";
  app.renderer.view.style.display = "block";
  app.renderer.autoResize = true;
  app.renderer.resize(window.innerWidth, window.innerHeight);


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
    .load(setup);




//This `setup` function will run when the image has loaded
  function setup() {


    let bg = new PIXI.Sprite(PIXI.loader.resources.bg.texture);
    let bgInitialWidth = bg.width;
    let bgInitialHeigh = bg.height;
    bg.width = app.renderer.view.width;
    bg.height = bgInitialHeigh *  app.renderer.view.width / bgInitialWidth;
    bg.y = app.renderer.view.height / 2 - bg.height / 2;
    let allImagesScale = bg.width / bgInitialWidth;
    let allImagesPositionGap = bg.width - bgInitialWidth;

    let austin = new PIXI.Sprite(PIXI.loader.resources.austin.texture);
    austin.x = 150;
    austin.y = 150;
    austin.width *= allImagesScale;
    austin.height *= allImagesScale;

    oldStair = new PIXI.Sprite(PIXI.loader.resources.oldStair.texture);
    oldStair.x = bg.width - 100;
    oldStair.y = bg.height - 100;
    oldStair.width *= allImagesScale;
    oldStair.height *= allImagesScale;

    btn = new PIXI.Sprite(PIXI.loader.resources.btn.texture);
    btn.x = 500;
    btn.y = 500;
    btn.anchor.x = 0.5;
    btn.anchor.y = 0.5;
    btn.width *= allImagesScale;
    btn.height *= allImagesScale;
    ease.add(btn, { width: btn.width * 1.05, height: btn.height * 1.05 }, { repeat: true, reverse: true, ease: 'easeOutQuad' });

    menu = new PIXI.Sprite(PIXI.loader.resources.menu.texture);
    menu.x = 300;
    menu.y = 300;
    menu.width *= allImagesScale;
    menu.height *= allImagesScale;
    menu.interactive = true;
    menu.hitArea = new PIXI.Circle(menu.width / 2, menu.height / 2, menu.width / 2);

    menuHover = new PIXI.Sprite(PIXI.loader.resources.menuHover.texture);
    menuHover.x = 300;
    menuHover.y = 300;
    menuHover.width *= allImagesScale;
    menuHover.height *= allImagesScale;
    menuHover.alpha = 0;


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

    animate();
  }

  function animate() {

    if (menuHover.alpha < 1 && isHover) {
      console.log('-- hover --')
      menuHover.alpha += 0.1;
    }

    if (menuHover.alpha > 0 && !isHover) {
      console.log('-- hoverOut --')
      menuHover.alpha -= .1;
    }

    requestAnimationFrame(animate);
    app.renderer.render(app.stage);
  }
}

window.addEventListener("resize", function(event){
  scaleToWindow(app.view);
});



