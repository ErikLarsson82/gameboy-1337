PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const app = new PIXI.Application({
    width: 160, height: 144, backgroundColor: 0x00131a, resolution: 8,
});

document.body.appendChild(app.view);

const map = new PIXI.Sprite(PIXI.Texture.from('map.png'));
app.stage.addChild(map);

app.loader
    .add('spritesheet', 'diamond.json')
    .load(onAssetsLoaded);

let position = 0;
let spinningDiamond, sound

const positions = [
	{
		x: 64,
		y: 26,
		targets: {
			up: null,
			down: 1,
			left: 1,
			right: 4
		}
	},
	{
		x: 49,
		y: 55,
		targets: {
			up: 0,
			down: 3,
			left: 2,
			right: 0
		}
	},
	{
		x: 16,
		y: 84,
		targets: {
			up: 1,
			down: 3,
			left: null,
			right: 1
		}
	},
	{
		x: 54,
		y: 109,
		targets: {
			up: 1,
			down: null,
			left: 2,
			right: 4
		}
	},
	{
		x: 95,
		y: 107,
		targets: {
			up: 1,
			down: null,
			left: 3,
			right: null
		}
	}
]

function onAssetsLoaded() {
    createSpinningDiamond()

    sound = PIXI.sound.Sound.from('boop.wav');
	
	app.ticker.add(tick)
}

function createSpinningDiamond() {
	const spinnerTextures = [];
    let i;

    for (i = 0; i <= 5; i++) {
        const texture = PIXI.Texture.from(`diamond ${i}.aseprite`);
        spinnerTextures.push(texture);
    }

    spinningDiamond = new PIXI.AnimatedSprite(spinnerTextures);
    spinningDiamond.animationSpeed = 0.15
    spinningDiamond.play()

    app.stage.addChild(spinningDiamond)
}

window.addEventListener("keydown", e => {
	const { targets } = positions[position]
	if (e.keyCode === 38 && targets.up !== null) {
		position = targets.up;
	}
	if (e.keyCode === 40 && targets.down !== null) {
		position = targets.down;
	}
	if (e.keyCode === 37 && targets.left !== null) {
		position = targets.left;
	}
	if (e.keyCode === 39 && targets.right !== null) {
		position = targets.right;
	}
	[38, 40, 37, 39].includes(e.keyCode) && sound.play()
})

function tick(delta) {
	const { x, y } = positions[position]
    spinningDiamond.position.x = x
    spinningDiamond.position.y = y
}

