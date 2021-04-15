window.onload = function() {
  let app;
  let appHolder, menu, menu2, menu3, menuHover, isHover, btn, austin, oldStair, hammer, hammerClicked, menuH, menuW, book, chair, decor, globe, logo, table, plant1, plant2, bg;

  const ease = new Ease.Ease();
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

  appHolder = document.getElementById("playable");
  appHolder.appendChild(app.view);

  PIXI.loader
      .add("images/atlas.json")
      .load(setup);

  function setup() {
    let id = PIXI.loader.resources["images/atlas.json"].textures;

    bg = new PIXI.Sprite(id["background.png"]);

    austin = new PIXI.Sprite(id["austin.png"]);
    austin.position.set(735, 265);
    austin.anchor.x = 0.5;
    austin.anchor.y = 0.5;
    austin.scale.x = 1;

    oldStair = new PIXI.Sprite(id["old-stair.png"]);
    oldStair.position.set(833, 125);
    oldStair.zIndex = 10;

    book = new PIXI.Sprite(id["book.png"]);
    book.position.set(830, -25);
    book.zIndex = 5;

    logo = new PIXI.Sprite(id["logo.png"]);
    logo.position.set(30, 5);

    globe = new PIXI.Sprite(id["globe.png"]);
    globe.position.set(85, 108);

    plant1 = new PIXI.Sprite(id["plant.png"]);
    plant1.position.set(460, -40);

    plant2 = new PIXI.Sprite(id["plant.png"]);
    plant2.position.set(1130, 170);
    plant2.zIndex = 1;

    chair = new PIXI.Sprite(id["chair.png"]);
    chair.position.set(125, 325);

    decor = new PIXI.Sprite(id["decor.png"]);
    decor.position.set(1120, 435);

    table = new PIXI.Sprite(id["table.png"]);
    table.position.set(200, 190);

    hammer = new PIXI.Sprite(id["hammer.png"]);
    hammer.x = 1140;
    hammer.y = 325;
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

    btn = new PIXI.Sprite(id["btn.png"]);
    btn.x = 690;
    btn.y = 560;
    btn.anchor.x = 0.5;
    btn.anchor.y = 0.5;
    ease.add(btn, { width: btn.width * 1.05, height: btn.height * 1.05 }, { repeat: true, reverse: true, ease: 'easeOutQuad' });

    menu = new PIXI.Sprite(id["menu.png"]);
    menuH = menu.height;
    menuW = menu.width;
    menu.position.set(910, 75);
    menu.buttonMode = true;
    menu.interactive = true;
    menu.hitArea = new PIXI.Circle(menu.width / 2, menu.height / 2, menu.width / 2);
    menu.width = 0;
    menu.height = 0;
    menu.anchor.x = 0.5;
    menu.anchor.y = 0.5;
    menu.zIndex = 10;

    menu2 = new PIXI.Sprite(id["menu.png"]);
    menu2.position.set(1040, 75);
    menu2.buttonMode = true;
    menu2.interactive = true;
    menu2.hitArea = new PIXI.Circle(menu2.width / 2, menu2.height / 2, menu2.width / 2);
    menu2.width = 0;
    menu2.height = 0;
    menu2.anchor.x = 0.5;
    menu2.anchor.y = 0.5;
    menu2.zIndex = 10;

    menu3 = new PIXI.Sprite(id["menu.png"]);
    menu3.position.set(1170, 75);
    menu3.buttonMode = true;
    menu3.interactive = true;
    menu3.hitArea = new PIXI.Circle(menu.width / 2, menu.height / 2, menu.width / 2);
    menu3.width = 0;
    menu3.height = 0;
    menu3.anchor.x = 0.5;
    menu3.anchor.y = 0.5;
    menu3.zIndex = 10;

    menuHover = new PIXI.Sprite(id["menu-hover.png"]);
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
    app.stage.addChild(book);
    app.stage.addChild(logo);
    app.stage.addChild(chair);
    app.stage.addChild(globe);
    app.stage.addChild(plant1);
    app.stage.addChild(plant2);
    app.stage.addChild(table);
    app.stage.addChild(menu);
    app.stage.addChild(menu2);
    app.stage.addChild(menu3);
    app.stage.addChild(menuHover);
    app.stage.addChild(oldStair);
    app.stage.addChild(decor);
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

    app.renderer.render(app.stage);
    requestAnimationFrame(animate);
  }

  function resize() {
    let w, h;
    if (window.innerWidth / window.innerHeight >= ratio) {
       w = window.innerHeight * ratio;
       h = window.innerHeight;
    } else {
       w = window.innerWidth;
       h = window.innerWidth / ratio;
    }
    app.renderer.view.style.width = w + 'px';
    app.renderer.view.style.height = h + 'px';
    app.renderer.view.style.top = (window.innerHeight / 2 - h / 2) + 'px';

  }

  resize();
  window.onresize = resize;
}




