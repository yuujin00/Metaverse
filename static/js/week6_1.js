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
        this.load.spritesheet('tmw_desert_spacing', 'static/map/test_map/tmw_desert_spacing.png', {
            frameWidth: 32,
            frameHeight: 32,
        });

    }

    function create ()
    {
        this.map = this.make.tilemap({ key: 'map' });
        // 맵에 사용된 이미지를 Load 한다.
        const ground = this.map.addTilesetImage('tmw_desert_spacing');
        // 맵 파일에서 생성해준 layer 들을 하나하나 구현해 준다.
        const groundLayer = this.map.createLayer('Ground', ground);
    }

    function update ()
    {
    }
});
