let app;
let appHolder, menu, menuHover, isHover;


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
    .add("austin", "images/austin.jpg")
    .add("menu", "images/menu.jpg")
    .add("menuHover", "images/menu-hover.jpg")
    .load(setup);

//This `setup` function will run when the image has loaded
  function setup() {

    let bg = new PIXI.Sprite(PIXI.loader.resources.bg.texture);
    //bg.width = app.renderer.view.clientWidth;
    //bg.height = app.renderer.view.clientHeight;
    bg.width = app.renderer.view.width;
    bg.height = 640 *  app.renderer.view.width / 1390;
    bg.y = app.renderer.view.height / 2 - bg.height / 2;

    let austin = new PIXI.Sprite(PIXI.loader.resources.austin.texture);
    austin.x = 150;
    austin.y = 150;

    menu = new PIXI.Sprite(PIXI.loader.resources.menu.texture);
    menu.x = 300;
    menu.y = 300;

    menuHover = new PIXI.Sprite(PIXI.loader.resources.menuHover.texture);
    menuHover.x = 300;
    menuHover.y = 300;
    menuHover.alpha = 0;

    menu.interactive = true;
    menu.hitArea = new PIXI.Circle(menu.width / 2, menu.height / 2, menu.width / 2);


    menu.on('click', function(){
      console.log('hello');
    });


    menu.on('mouseover', function(){
      isHover = true;
    });

    menu.on('mouseout', function(){
      isHover = false;
    });

    //Add the cat to the stage
    app.stage.addChild(bg);
    app.stage.addChild(austin);
    app.stage.addChild(menu);
    app.stage.addChild(menuHover);

    animate();
  }

  function animate() {

    if (menuHover.alpha < 1 && isHover) {
      console.log('-- hover --')
      menu.alpha -= .1;
      menuHover.alpha += .1;
    }

    if (menu.alpha < 1 && !isHover) {
      console.log('-- hoverOut --')
      menuHover.alpha -= .1;
      menu.alpha += .1;
    }

    requestAnimationFrame(animate);
    app.renderer.render(app.stage);
  }
}

window.addEventListener("resize", function(event){
  scaleToWindow(app.view);
});



