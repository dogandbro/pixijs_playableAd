window.onload = function() {
  let app;
  let appHolder, menu, menu2, menu3, menuHover, menu2Hover, menu3Hover,
      btn, austin, oldStair, hammer, btnOk, finalImgSize,
      menuH, menuW, book, chair, decor, globe, logo, table, plant1, plant2,
      stairIcon1, stairIcon2, stairIcon3, stairIconH, stairIconW, bg, newStair1, newStair2, newStair3, finalImg, overlay;
  let isMenuClicked = {
    menu1: false,
    menu2: false,
    menu3: false
  };
  const ease = new Ease.Ease();
  const size = [1390, 640];
  const ratio = size[0] / size[1];

  const graphics = new PIXI.Graphics();

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
    ease.add(hammer, { alpha: 1 }, { repeat: false, wait: 1500, duration: 300, ease: 'linear' });

    btnOk = new PIXI.Sprite(id["btn-ok.png"]);
    btnOk.buttonMode = true;
    btnOk.interactive = true;
    btnOk.alpha = 0;
    btnOk.anchor.x = 0.5;
    btnOk.anchor.y = 0.5;

    btn = new PIXI.Sprite(id["btn.png"]);
    btn.x = 690;
    btn.y = 560;
    btn.anchor.x = 0.5;
    btn.anchor.y = 0.5;
    btn.interactive = true;
    btn.buttonMode = true;
    ease.add(btn, { width: btn.width * 1.05, height: btn.height * 1.05 }, { repeat: true, reverse: true, ease: 'easeOutQuad' });

    menu = new PIXI.Sprite(id["menu.png"]);
    menuH = menu.height;
    menuW = menu.width;
    menu.position.set(910, 75);
    menu.buttonMode = true;
    menu.interactive = true;
    menu.hitArea = new PIXI.Circle(0, 0, menu.width / 2);
    menu.width = 0;
    menu.height = 0;
    menu.anchor.x = 0.5;
    menu.anchor.y = 0.5;
    menu.zIndex = 10;

    newStair1 = new PIXI.Sprite(id["new-stair-1.png"]);
    newStair1.position.set(1150, 228);
    newStair1.anchor.x = 0.5;
    newStair1.anchor.y = 0.5;
    newStair1.alpha = 0;

    newStair2 = new PIXI.Sprite(id["new-stair-2.png"]);
    newStair2.position.set(1150, 228);
    newStair2.anchor.x = 0.5;
    newStair2.anchor.y = 0.5;
    newStair2.alpha = 0;

    newStair3 = new PIXI.Sprite(id["new-stair-3.png"]);
    newStair3.position.set(1150, 228);
    newStair3.anchor.x = 0.5;
    newStair3.anchor.y = 0.5;
    newStair3.alpha = 0;

    stairIcon1 = new PIXI.Sprite(id["stair-1.png"]);
    stairIconH = stairIcon1.height;
    stairIconW = stairIcon1.width;
    stairIcon1.position.set(918, 62);
    stairIcon1.width = 0;
    stairIcon1.height = 0;
    stairIcon1.anchor.x = 0.5;
    stairIcon1.anchor.y = 0.5;

    stairIcon2 = new PIXI.Sprite(id["stair-2.png"]);
    stairIcon2.position.set(1050, 62);
    stairIcon2.width = 0;
    stairIcon2.height = 0;
    stairIcon2.anchor.x = 0.5;
    stairIcon2.anchor.y = 0.5;

    stairIcon3 = new PIXI.Sprite(id["stair-3.png"]);
    stairIcon3.position.set(1175, 62);
    stairIcon3.width = 0;
    stairIcon3.height = 0;
    stairIcon3.anchor.x = 0.5;
    stairIcon3.anchor.y = 0.5;

    menu2 = new PIXI.Sprite(id["menu.png"]);
    menu2.position.set(1040, 75);
    menu2.buttonMode = true;
    menu2.interactive = true;
    menu2.hitArea = new PIXI.Circle(0, 0, menu2.width / 2);
    menu2.width = 0;
    menu2.height = 0;
    menu2.anchor.x = 0.5;
    menu2.anchor.y = 0.5;
    menu2.zIndex = 10;

    menu3 = new PIXI.Sprite(id["menu.png"]);
    menu3.position.set(1170, 75);
    menu3.buttonMode = true;
    menu3.interactive = true;
    menu3.hitArea = new PIXI.Circle(0, 0, menu3.width / 2);
    menu3.width = 0;
    menu3.height = 0;
    menu3.anchor.x = 0.5;
    menu3.anchor.y = 0.5;
    menu3.zIndex = 10;

    menuHover = new PIXI.Sprite(id["menu-hover.png"]);
    menuHover.position.set(910, 75);
    menuHover.anchor.x = 0.5;
    menuHover.anchor.y = 0.5;
    menuHover.alpha = 0;

    menu2Hover = new PIXI.Sprite(id["menu-hover.png"]);
    menu2Hover.position.set(1040, 75);
    menu2Hover.anchor.x = 0.5;
    menu2Hover.anchor.y = 0.5;
    menu2Hover.alpha = 0;

    menu3Hover = new PIXI.Sprite(id["menu-hover.png"]);
    menu3Hover.position.set(1170, 75);
    menu3Hover.anchor.x = 0.5;
    menu3Hover.anchor.y = 0.5;
    menu3Hover.alpha = 0;

    finalImg = new PIXI.Sprite(id["final.png"]);
    finalImg.position.set(700, 250);
    finalImg.anchor.x = 0.5;
    finalImg.anchor.y = 0.5;
    finalImgSize = {
      width: finalImg.width,
      height: finalImg.height
    };
    finalImg.width = 0;
    finalImg.height = 0;

    overlay = graphics.beginFill(0x000000);
    graphics.drawRect(0, 0, app.renderer.view.width, app.renderer.view.height);
    graphics.endFill();
    overlay.alpha = 0;
    overlay.interactive = true;
    overlay.visible = false;


    hammer.on('click', function(){
      hammer.interactive = false;
      ease.add(hammer, { alpha: 0 }, { repeat: false, duration: 300, ease: 'linear' });
      ease.add(menu, { width: menuW, height: menuH }, { duration: 1000, ease: 'easeOutElastic' });
      ease.add(stairIcon1, { width: stairIconW, height: stairIconH }, { duration: 1000, ease: 'easeOutElastic' });
      ease.add(menu2, { width: menuW, height: menuH }, {wait: 100, duration: 1000, ease: 'easeOutElastic' });
      ease.add(stairIcon2, { width: stairIconW, height: stairIconH }, {wait: 100, duration: 1000, ease: 'easeOutElastic' });
      ease.add(menu3, { width: menuW, height: menuH }, {wait: 200, duration: 1000, ease: 'easeOutElastic' });
      ease.add(stairIcon3, { width: stairIconW, height: stairIconH }, {wait: 200, duration: 1000, ease: 'easeOutElastic' });

    });

    menu.on('click', function(){
      isMenuClicked = {
        menu1: true,
        menu2: false,
        menu3: false
      };
      btnOk.position.set(910, 150);
      newStair1.position.set(1150, 228);
      oldStair.alpha = 0;
      newStair2.alpha = 0;
      newStair3.alpha = 0;
      ease.add(btnOk, { alpha: 1 }, { repeat: false, duration: 300, ease: 'linear' });
      ease.add(btnOk, { y: btnOk.y + 10 }, { repeat: true, reverse: true, duration: 200, ease: 'easeOutQuad' });
      ease.add(newStair1, { alpha: 1, y: 328 }, { repeat: false, duration: 300, ease: 'linear' });
      ease.add(menu2Hover, { alpha: 0 }, { repeat: false, duration: 300, ease: 'linear' });
      ease.add(menu3Hover, { alpha: 0 }, { repeat: false, duration: 300, ease: 'linear' });
    });

    menu.on('mouseover', function(){
      if(!isMenuClicked.menu1){
        ease.add(menuHover, { alpha: 1 }, { repeat: false, duration: 300, ease: 'linear' });
      }
    });

    menu.on('mouseout', function(){
      if(!isMenuClicked.menu1){
        ease.add(menuHover, { alpha: 0 }, { repeat: false, duration: 300, ease: 'linear' });
      }
    });

    menu2.on('click', function(){
      isMenuClicked = {
        menu1: false,
        menu2: true,
        menu3: false
      };
      oldStair.alpha = 0;
      newStair1.alpha = 0;
      newStair3.alpha = 0;
      btnOk.position.set(1040, 150);
      newStair2.position.set(1150, 228);
      ease.add(btnOk, { alpha: 1 }, { repeat: false, duration: 300, ease: 'linear' });
      ease.add(btnOk, { y: btnOk.y + 10 }, { repeat: true, reverse: true, duration: 200, ease: 'easeOutQuad' });
      ease.add(newStair2, { alpha: 1, y: 328 }, { repeat: false, duration: 300, ease: 'linear' });
      ease.add(menuHover, { alpha: 0 }, { repeat: false, duration: 300, ease: 'linear' });
      ease.add(menu3Hover, { alpha: 0 }, { repeat: false, duration: 300, ease: 'linear' });
    });

    menu2.on('mouseover', function(){
      if(!isMenuClicked.menu2){
        ease.add(menu2Hover, { alpha: 1 }, { repeat: false, duration: 300, ease: 'linear' });
      }
    });

    menu2.on('mouseout', function(){
      if(!isMenuClicked.menu2){
        ease.add(menu2Hover, { alpha: 0 }, { repeat: false, duration: 300, ease: 'linear' });
      }
    });

    menu3.on('click', function(){
      isMenuClicked = {
        menu1: false,
        menu2: false,
        menu3: true
      };
      oldStair.alpha = 0;
      newStair1.alpha = 0;
      newStair2.alpha = 0;
      btnOk.position.set(1170, 150);
      newStair3.position.set(1150, 228);
      ease.add(btnOk, { alpha: 1 }, { repeat: false, duration: 300, ease: 'linear' });
      ease.add(btnOk, { y: btnOk.y + 10 }, { repeat: true, reverse: true, duration: 200, ease: 'easeOutQuad' });
      ease.add(newStair3, { alpha: 1, y: 328 }, { repeat: false, duration: 300, ease: 'linear' });
      ease.add(menu2Hover, { alpha: 0 }, { repeat: false, duration: 300, ease: 'linear' });
      ease.add(menuHover, { alpha: 0 }, { repeat: false, duration: 300, ease: 'linear' });
    });

    menu3.on('mouseover', function(){
      if(!isMenuClicked.menu3){
        ease.add(menu3Hover, { alpha: 1 }, { repeat: false, duration: 300, ease: 'linear' });
      }
    });

    menu3.on('mouseout', function(){
      if(!isMenuClicked.menu3){
        ease.add(menu3Hover, { alpha: 0 }, { repeat: false, duration: 300, ease: 'linear' });
      }
    });

    btn.on('click', function(){
      window.open('https://playrix.ru/mobile-games/index.html');
    });

    btnOk.on('click', function(){
      overlay.visible = true;
      ease.add(finalImg, { width: finalImgSize.width, height: finalImgSize.height }, { duration: 800, ease: 'easeOutElastic' });
      ease.add(overlay, { alpha: 0.5 }, { repeat: false, duration: 500, ease: 'linear' });
    });

    //Add images to the stage
    app.stage.addChild(bg);
    app.stage.addChild(austin);
    app.stage.addChild(book);
    app.stage.addChild(chair);
    app.stage.addChild(globe);
    app.stage.addChild(plant1);
    app.stage.addChild(plant2);
    app.stage.addChild(table);
    app.stage.addChild(newStair1);
    app.stage.addChild(newStair2);
    app.stage.addChild(newStair3);
    app.stage.addChild(menu);
    app.stage.addChild(menu2);
    app.stage.addChild(menu3);
    app.stage.addChild(menuHover);
    app.stage.addChild(menu2Hover);
    app.stage.addChild(menu3Hover);
    app.stage.addChild(btnOk);
    app.stage.addChild(stairIcon1);
    app.stage.addChild(stairIcon2);
    app.stage.addChild(stairIcon3);
    app.stage.addChild(oldStair);
    app.stage.addChild(decor);
    app.stage.addChild(hammer);
    app.stage.addChild(overlay);
    app.stage.addChild(logo);
    app.stage.addChild(btn);
    app.stage.addChild(finalImg);


    animate();
  }

  function animate() {
    // Rotate Austin
    if(app.renderer.plugins.interaction.mouse.global.x < austin.x){
      austin.scale.x = -1;
    } else {
      austin.scale.x = 1;
    }

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




