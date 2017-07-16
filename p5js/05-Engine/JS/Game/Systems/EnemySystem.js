var enemySystem = {
    init: function(){},
    tick: function(entities) {

        let unvisibleBlocks = 0;

        let player = entities.filter( entity => entity.components.PlayerControled)[0];
        let blocks = entities.filter( entity => entity.components.Enemy && !entity.components.Line );

        blocks.sort((a, b) => { return a.components.Position.y - b.components.Position.y; });

        blocks.forEach( block => {
            let position = block.components.Position;
            if(position.x < 0) {
                unvisibleBlocks++;
            }
        });

        if(unvisibleBlocks == 5){
            let prevYPosition = 0;
            blocks[0].components.Position.y = Math.random() * 15;
            blocks[4].components.Position.y = 300 - Math.random() * 15;

            blocks[1].components.Position.y = 40 + Math.random() * 70;
            blocks[2].components.Position.y = 130 + Math.random() * 70;
            blocks[3].components.Position.y = 210 + Math.random() * 70;

            blocks.forEach( block => {
                let position = block.components.Position;
                position.x = 600 + (Math.random() * 100);
                prevYPosition = position.y;
            });

            player.components.PlayerControled.collided = false;
        }

        let lines = entities.filter( entity => entity.components.Line );

        for(let i = 0; i < 4; i++){
            let linePosition = lines[i].components.Position;
            linePosition.x = blocks[i].components.Position.x + (blocks[i].components.Position.width / 2) ;
            linePosition.y = blocks[i].components.Position.y + (blocks[i].components.Position.height / 2);
            linePosition.width = blocks[i + 1].components.Position.x + (blocks[i + 1].components.Position.width / 2);
            linePosition.height = blocks[i + 1].components.Position.y + (blocks[i + 1].components.Position.height / 2);
            lines[i].components.Line.length = Math.sqrt(
                Math.pow((linePosition.x - linePosition.width), 2) +
                Math.pow((linePosition.y - linePosition.height), 2)
            );

            lines[i].components.Line.color = selectColor(lines[i].components.Line.length);
        }
    }
};
