const BLOCKS_PER_WAVE = 4;
const NUMBER_OF_WAVES = 2;

const Colors = {
    red: { max: 40, value: '#ff0000', points: 5 },
    orange: { min: 40, max: 70, value: '#ff7f50', points: 4 },
    yellow: { min: 70, max: 110, value: '#ffff00', points: 3 },
    green: { min: 110, max: 140, value: '#00ff00', points: 2 },
    cyan: { min: 140, value: '#00ffff', points: 1 }
};

const blockSystem = {
    init: function(){},
    tick: function(entities) {

        let unvisibleBlocks = 0;

        let player = entities.filter( entity => entity.components.PlayerControled)[0];
        let blocks = entities.filter( entity => entity.components.Block && !entity.components.PlayerControled );

        blocks.sort((a, b) => { return a.components.Position.y - b.components.Position.y; });

        blocks.forEach( block => {
            let position = block.components.Position;
            if(position.x <= 0) {
                block.components.Block.visible = false;
            }
        });

        let waveBlock = [];

        blocks.forEach( block => {
            if(!waveBlock[block.components.Block.wave]){
                waveBlock[block.components.Block.wave] = [];
            }
            waveBlock[block.components.Block.wave].push(block);
        });

        waveBlock.forEach( wave => {

            if(wave.every( block => block.components.Block.visible === false )){
                wave[0].components.Position.y = Math.random() * 15;
                wave[3].components.Position.y = 300 - Math.random() * 15;

                wave[1].components.Position.y = 50 + Math.random() * 80;
                wave[2].components.Position.y = 180 + Math.random() * 70;

                wave.forEach( block => {
                    let position = block.components.Position;
                    position.x = 600 + (Math.random() * 100);
                    block.components.Block.visible = true;
                });

                player.components.PlayerControled.collided = false;

            }

        });

        let lines = entities.filter( entity => entity.components.Line );
        let waveLines = [];

        lines.forEach( line => {
            if(!waveLines[line.components.Line.wave]){
                waveLines[line.components.Line.wave] = [];
            }
            waveLines[line.components.Line.wave].push(line);
        });

        for(let waveIndex = 0; waveIndex < NUMBER_OF_WAVES; waveIndex++){
            for(let lineIndex = 0; lineIndex < BLOCKS_PER_WAVE - 1; lineIndex++){
                let line = waveLines[waveIndex][lineIndex]

                let linePosition = line.components.Position;
                let lineProperties = line.components.Line;

                let firstBlock = waveBlock[waveIndex][lineIndex];
                let secondBlock = waveBlock[waveIndex][lineIndex + 1];

                linePosition.x = firstBlock.components.Position.x + (firstBlock.components.Block.width / 2);
                linePosition.y = firstBlock.components.Position.y + (firstBlock.components.Block.height / 2);

                lineProperties.x1 = secondBlock.components.Position.x + (secondBlock.components.Block.width / 2);
                lineProperties.y1 = secondBlock.components.Position.y + (secondBlock.components.Block.height / 2);

                lineProperties.length = Math.sqrt(
                    Math.pow((linePosition.x - lineProperties.x1), 2) +
                    Math.pow((linePosition.y - lineProperties.y1), 2)
                );

                lineProperties.color = selectColor(lineProperties.length);
            }
        }

    }
};

function selectColor(length){
    let selectedColor;
    Object.keys(Colors).forEach( key => {
        Colors[key].min = Colors[key].min || 0;
        Colors[key].max = Colors[key].max || 1000;
        if(length >= Colors[key].min && length <= Colors[key].max){
            selectedColor = Colors[key];
        }
    });
    return selectedColor;
}
