$(document).ready(function(){

    var config = {
        type: Phaser.AUTO,
        parent: "week6",
        mode: Phaser.Scale.ScaleModes.AUTO,
        width: window.innerWidth,
        height:window.innerHeight,
        background:'transparent',
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    var player;
    var cursors;
    var gameOver = false;

    var game = new Phaser.Game(config);

    function preload ()
    {
        this.load.tilemapTiledJSON('map', 'static/map/test_map/test_map2.json');
        this.load.image('character', 'static/map/test_map/wabbit.png');
        this.load.spritesheet('tmw_desert_spacing', 'static/map/test_map/tmw_desert_spacing.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.audio('BGM',['static/music/BGM_2.mp3']);
    }

    function create ()
    {
        this.map = this.make.tilemap({ key: 'map' });
        // worldmap size에 맞게 물리엔진처리. 캐릭터가 맵 밖으로 빠져나가지 않음
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        // 맵에 사용된 이미지를 Load 한다.
        const ground = this.map.addTilesetImage('tmw_desert_spacing');
        // 맵 파일에서 생성해준 layer 들을 하나하나 구현해 준다.
        const groundLayer = this.map.createLayer('Ground', ground);
        // 레이어에 클릭 이벤트 할당
        const rockLayer = this.map.createLayer('rock', ground);

        // 캐릭터 로드
        player = this.physics.add.sprite((this.map.widthInPixels / 2), (this.map.heightInPixels / 2), 'character').setCollideWorldBounds(true);
        //player = this.add.image((this.map.widthInPixels / 2), (this.map.heightInPixels / 2), 'character');
        this.cameras.main.startFollow(player, false, 0.2, 0.2);

        const grassLayer = this.map.getObjectLayer('grass');
        const group = this.physics.add.staticGroup();
        grassLayer.objects.forEach((object) => {
            const actualX = object.x + object.width * 0.5;
            const actualY = object.y - object.height * 0.5;
            group
                .get(actualX, actualY, 'tmw_desert_spacing', object.gid - this.map.getTileset('tmw_desert_spacing').firstgid)
                .setDepth(actualY);
        });

        var rect = new Phaser.Geom.Rectangle(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.physics.add.collider(player, group);
        this.physics.add.collider(player, rect);

        // 카메라 Zoom
        this.input.on("wheel",  (pointer, gameObjects, deltaX, deltaY, deltaZ) => {

            if (deltaY > 0) {
                var newZoom = this.cameras.main.zoom -.1;
                if (newZoom >= 1) {
                    this.cameras.main.zoom = newZoom;
                }
            }

            if (deltaY < 0) {
                var newZoom = this.cameras.main.zoom +.1;
                if (newZoom < 2.0) {
                    this.cameras.main.zoom = newZoom;
                }
            }

          });

        this.cameras.main.zoom = 1.4;
        // 미니맵
        start_x = window.innerWidth-380;
        this.minimap = this.cameras.add(10, 10, 200, 200).setZoom(0.2).setName('mini');
        this.minimap.setBackgroundColor(0x002244);
        this.minimap.scrollX = 500;
        this.minimap.scrollY = 500;

        cursors = this.input.keyboard.createCursorKeys();
    }

    function update ()
    {
        if (gameOver)
        {
            return;
        }

        if (cursors.left.isDown)
        {
            player.setVelocityX(-200);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(200);
        }
        else {
            player.setVelocityX(0);
        }

        if (cursors.up.isDown) {

            player.setVelocityY(-200);
        }
        else if (cursors.down.isDown) {

            player.setVelocityY(200);
        }
        else {
            player.setVelocityY(0);
        }

        // 미니맵 카메라가 캐릭터를 따라서 이동한다.
        //this.minimap.scrollX = Phaser.Math.Clamp(this.player.x, 0, 2000);
        //this.minimap.scrollY = Phaser.Math.Clamp(this.player.y, 0, 2000);
    }
    function resize() {
        var canvas = document.querySelector("canvas");
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var windowRatio = windowWidth / windowHeight;
        var gameRatio = game.config.width / game.config.height;

        if(windowRatio < gameRatio){
            canvas.style.width = windowWidth + "px";
            canvas.style.height = (windowWidth / gameRatio) + "px";
        }
        else {
            canvas.style.width = (windowHeight * gameRatio) + "px";
            canvas.style.height = windowHeight + "px";
        }
    }
    resize();
    window.addEventListener("resize", resize, false);
});
