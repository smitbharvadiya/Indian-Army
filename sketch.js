var DarkBeast, DBWImg, DBS_Img, DBJImg;
var Bullet, BulletImg;
var Ground, Background, groundImg;
var Rock1, Rock2, Rock3, Rock4, Rock5, Rock6, Rock7, Rock8, Rock9, rocks, RocksGroup;
var ZombiesGroup, zombies, Zomb1, Zomb2, Zomb3, Zomb4, BloodySkull, BloodySImg;
var DragonGroup, dragons, Dragon1, Dragon2, Dragon3;
var Score;
var gameState = "play";
var GameOver, gameoverImg, Restart, restartImg;
var spin,spinImg,spinGroup;
var line;
var base,baseImg;
var dimond,dimondImg,dimondGroup;
var coins=0;
var icon,iconImg;
var BulletIcon,BulletImgI;
var upIcon,upImg;

function preload(){

    DBWImg = loadAnimation("ch1.png","ch2.png","ch3.png","ch4.png","ch5.png","ch6.png");
    DBJImg = loadAnimation("ch6.png");
    DBS_Img = loadAnimation("ch1.png","ch2.png","ch3.png","ch4.png","ch5.png","ch6.png");

    BulletImg = loadImage("bullet.png")

    groundImg = loadImage("back.jpg");
    gameoverImg = loadImage("GameOver.png");
    restartImg = loadImage("restart.png");
    baseImg = loadImage("base.jpg");
    iconImg = loadImage("icon.png");
    BulletImgI = loadImage("bullet icon.png");
    upImg = loadImage("up icon.png");

    dimondImg = loadImage("diamond.png");
    spinImg = loadImage("spin.png");

    Rock1 = loadImage("stone1.png");
    Rock2 = loadImage("stone2.png");
    Rock3 = loadImage("stone3.png");
    Rock4 = loadImage("tree.png");
    Rock5 = loadImage("tree2.png");
    Rock6 = loadImage("stone1.png");
    Rock7 = loadImage("stone2.png");
    Rock8 = loadImage("stone3.png");
    Rock9 = loadImage("tree2.png");

    Zomb1 = loadAnimation("1.png","2.png","3.png","4.png");
    Zomb2 = loadAnimation("1Z.png","2Z.png","3Z.png","4Z.png","3Z.png");
    Zomb3 = loadAnimation("1.png","2.png","3.png","4.png"); 
    BloodySImg = loadAnimation("Tank.png");
}

function setup() {
    createCanvas(1000,500);

    DarkBeast = createSprite(100,330,50,80);
    DarkBeast.addAnimation("walking", DBWImg);
    DarkBeast.addAnimation("jumping", DBJImg);
    DarkBeast.addAnimation("shooting", DBS_Img);
    DarkBeast.scale = 0.9;

    Bullet = createSprite(140,326,10,5);
    Bullet.addImage(BulletImg);
    Bullet.scale = 0.04;
    Bullet.visible = false;

    base=createSprite(500,250);
    base.addImage(baseImg);
    base.scale=1;
    base.visible=false;
  
    Ground = createSprite(500,410,1000,20);
    Ground.shapeColor="gold";
    Ground.visible = false;

    Background = createSprite(1000,250,1100,20);
    Background.addImage(groundImg);
    Background.scale = 1.02;
    Background.x = Background.width/2;

    Background.depth = DarkBeast.depth;
    DarkBeast.depth = DarkBeast.depth + 1;

    GameOver = createSprite(500,170,50,50);
    GameOver.addImage(gameoverImg);
    GameOver.scale = 0.8;
    GameOver.visible = false;

    Restart = createSprite(500,380,50,50);
    Restart.addImage(restartImg);
    Restart.scale = 0.08;
    Restart.visible = false;

    line=createSprite(140,250,50,500);
    line.visible=false;

    icon=createSprite(925,40);
    icon.addImage(iconImg);
    icon.scale=0.04;

    BulletIcon=createSprite(910,360,50,50);
    BulletIcon.addImage(BulletImgI);
    BulletIcon.scale=0.08;

    upIcon=createSprite(840,390,50,50);
    upIcon.addImage(upImg);
    upIcon.scale=0.06;

    RocksGroup = createGroup();
    ZombiesGroup = createGroup();
    BloodyGroup = createGroup();
    spinGroup = createGroup();
    dimondGroup = createGroup();

    Score = 0;
    coins =0;

    DarkBeast.setCollider("rectangle",-10,0,60,120);
}

function draw() {
    background(rgb(236, 214, 159));

    Background.velocityX = -3;

    if (gameState === "play") {

        BulletIcon.visible=true;
        upIcon.visible=true;

        if(line.isTouching(spinGroup) || line.isTouching(ZombiesGroup) || line.isTouching(BloodyGroup) ) {
                gameState = "end";
        }

        if(dimondGroup.isTouching(DarkBeast)){
                dimondGroup.destroyEach();
                coins=coins+1;
        }  


        Bullet.depth=DarkBeast.depth;
        DarkBeast.depth=DarkBeast.depth+1;

        if (Background.x < 0){
                Background.x = Background.width/2;
              }        

        if(keyDown("space") && DarkBeast.y >= 325) {
                DarkBeast.velocityY = -11;
                DarkBeast.changeAnimation("jumping", DBJImg);
                Bullet.x = 130;
                Bullet.velocityX = 0;
                Bullet.visible = false;
        } 

        if(DarkBeast.y < 280){
                DarkBeast.changeAnimation("walking", DBWImg);
        }

        if(mousePressedOver(upIcon)  && DarkBeast.y >= 325){
                DarkBeast.velocityY = -11;
                DarkBeast.changeAnimation("jumping", DBJImg);
                Bullet.x = 130;
                Bullet.velocityX = 0;
                Bullet.visible = false;
        }

            DarkBeast.velocityY = DarkBeast.velocityY + 0.5
            DarkBeast.collide(Ground);
           
            if(keyDown("enter")) {
                DarkBeast.changeAnimation("shooting", DBS_Img);
                Bullet.velocityX = 20;
                Bullet.visible = true;
         } 

        if(mousePressedOver(BulletIcon)){
              DarkBeast.changeAnimation("shooting", DBS_Img);
              Bullet.velocityX = 20;
              Bullet.visible = true;
        }

        if(ZombiesGroup.isTouching(Bullet)){
                Bullet.x = 130;
                Bullet.velocityX = 0;
                Bullet.visible = false;
                ZombiesGroup.destroyEach();
                Score = Score+100;
        }

       

        if(spinGroup.isTouching(Bullet)){
               Bullet.x = 130;
                Bullet.velocityX = 0;
                Bullet.visible = false;
                spinGroup.destroyEach();
                Score = Score+100;
        }

        if(BloodyGroup.isTouching(Bullet)){
                Bullet.x = 130;
                Bullet.velocityX = 0;
                Bullet.visible = false;
                BloodyGroup.destroyEach();
                Score = Score+500;
        }

        if(RocksGroup.isTouching(Bullet)){
                Bullet.x = 130;
                Bullet.velocityX = 0;
                Bullet.visible = false;
        }
        
        if(Bullet.x > 1000) {
                Bullet.x = 130;
                Bullet.velocityX = 0;
                Bullet.visible = false;
        } 

        Zombies();
        Rocks();
        spins();
        dimonds();

        if(RocksGroup.isTouching(DarkBeast)){
            gameState = "end"
        }
    }

    if (gameState === "end") {

        base.visible=true;
        DarkBeast.destroy();
        Bullet.destroy();
        Background.destroy();
        RocksGroup.destroyEach();
        ZombiesGroup.destroyEach();
        BloodyGroup.destroyEach();
        spinGroup.destroyEach();
        dimondGroup.destroyEach();
        
        GameOver.visible = true;
        Restart.visible = true;

        BulletIcon.visible=false;
        upIcon.visible=false;

        if(mousePressedOver(Restart)){
           reset();
        }
   }

    drawSprites();
    textscore();

    stroke("black");
    textSize(25);
    fill("white");
    text(": "+ coins, 950,47);

}


function Rocks(){
    if (frameCount % 350 === 0){
      var rocks = createSprite(1100,380,50,50);
       var rand = Math.round(random(1,9));
       switch(rand) {
         case 1: rocks.addImage(Rock1);
                 break;
         case 2: rocks.addImage(Rock2);
                 break;
         case 3: rocks.addImage(Rock3);
                 break;
         case 4: rocks.addImage(Rock4);
                 break;
         case 5: rocks.addImage(Rock5);
                 break;
         case 6: rocks.addImage(Rock6);
                 break;
         case 7: rocks.addImage(Rock7);
                 break;
         case 8: rocks.addImage(Rock8);
                 break;
         case 9: rocks.addImage(Rock9);
                 break;
         default: break;
       }
       rocks.scale = 0.5;
       rocks.velocityX = -6;
       rocks.lifetime = 1100;
       rocks.depth = Background.depth + 1;
       RocksGroup.add(rocks);

       rocks.setCollider("circle",0,10,70);
}}

function Zombies() {
     if (frameCount % 300 === 0) {
        var zombies = createSprite(1100,360,50,10);
        zombies.addAnimation("zom1", Zomb1);
        zombies.addAnimation("zom2", Zomb2);
        zombies.addAnimation("zom3", Zomb3);
        var rand = Math.round(random(1,3));
        switch(rand) {
                case 1: zombies.changeAnimation("zom1", Zomb1);
                        break;
                case 2: zombies.changeAnimation("zom2", Zomb2);
                        break;
                case 3: zombies.changeAnimation("zom3", Zomb3);
                        break;
                default: break;
        }

        zombies.scale = 0.5;
        zombies.velocityX = -(7 + 0.1*Score/400);
        zombies.lifetime = 1100;
        ZombiesGroup.add(zombies);
     }

        if (frameCount % 700 === 0 && Score > 1500) {
            var BloodySkull = createSprite(1100,330,50,10);
            BloodySkull.shapeColor = "Black";
            BloodySkull.addAnimation("BloodySkull", BloodySImg);
            BloodySkull.scale = 0.7;
            BloodySkull.velocityX = -(5 + 0.4*Score/3000);
            BloodyGroup.add(BloodySkull);
        } 
}

function spins(){
if (frameCount % 800 === 0 && Score > 3500) {
        var spin = createSprite(1095,-10,50,10);
        spin.x = Math.round(random(900,1100));
        spin.velocityY = 2;
        spin.velocityX = -1.34;
        spin.shapeColor = "Black";
        spin.addImage(spinImg);
        spin.scale = 0.5;
        spin.velocityX = -5;
        spinGroup.add(spin);
    } }

function dimonds() {
        if (frameCount % 500 === 0 && Score > 200) {
         dimond=createSprite(1100,200,10,10);
         dimond.scale=0.04;
         dimond.y = Math.round(random(250,380)); 
         dimond.addImage(dimondImg);
         
         dimond.velocityX = -4;
        
         dimondGroup.add(dimond);
        }
}

function textscore(){
        strokeWeight(3);
        stroke(0);
        fill(rgb(239, 235, 54));
        textSize(28);
        text("Score: "+Score,25,35);  
}     

function reset(){
    gameState = "play";
    GameOver.visible = false;
    Restart.visible = false;
    BulletIcon.visible=true;
    upIcon.visible=true;
    
    RocksGroup.destroyEach();
    ZombiesGroup.destroyEach();
    BloodyGroup.destroyEach();
    spinGroup.destroyEach();
    dimondGroup.destroyEach();

    DarkBeast = createSprite(100,330,50,80);
    DarkBeast.addAnimation("walking", DBWImg);
    DarkBeast.addAnimation("jumping", DBJImg);
    DarkBeast.addAnimation("shooting", DBS_Img);
    DarkBeast.scale = 0.9;

    Bullet = createSprite(140,326,10,5);
    Bullet.addImage(BulletImg);
    Bullet.scale = 0.04;
    Bullet.visible = false;

    base=createSprite(500,250);
    base.addImage(baseImg);
    base.scale=1;
    base.visible=false;

    Ground = createSprite(500,410,1000,20);
    Ground.shapeColor="gold";
    Ground.visible = false;

    Background = createSprite(1000,250,1100,20);
    Background.addImage(groundImg);
    Background.scale = 1.02;
    Background.x = Background.width/2;

    Background.depth = DarkBeast.depth;
    DarkBeast.depth = DarkBeast.depth + 1;

    GameOver = createSprite(500,170,50,50);
    GameOver.addImage(gameoverImg);
    GameOver.scale = 0.8;
    GameOver.visible = false;

    Restart = createSprite(500,380,50,50);
    Restart.addImage(restartImg);
    Restart.scale = 0.08;
    Restart.visible = false;

    line=createSprite(140,250,50,500);
    line.visible=false;

    icon=createSprite(925,40);
    icon.addImage(iconImg);
    icon.scale=0.04;

    BulletIcon=createSprite(910,360,50,50);
    BulletIcon.addImage(BulletImgI);
    BulletIcon.scale=0.08;

    upIcon=createSprite(840,390,50,50);
    upIcon.addImage(upImg);
    upIcon.scale=0.06;

    RocksGroup = createGroup();
    ZombiesGroup = createGroup();
    BloodyGroup = createGroup();
    spinGroup = createGroup();
    dimondGroup = createGroup();

    Score = 0;
    coins = 0;

    DarkBeast.setCollider("rectangle",-10,0,60,120);
}
