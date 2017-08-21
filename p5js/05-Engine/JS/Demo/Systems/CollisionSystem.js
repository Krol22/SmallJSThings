const collisionSystem = {
    init(){},
    tick(entities) {


        let playerEntity = entities.filter( entity => {
            return entity.components.PlayerControled;
        })[0];

        if(!playerEntity.components.PlayerControled.live)
            return;

        let playerPosition = playerEntity.components.Position;
        let playerBlock = playerEntity.components.Block;

        // Check player collision with world;

        if(playerPosition.y < 0 || playerPosition.y > 320 - playerBlock.width){
            playerEntity.components.PlayerControled.live = false;
            playerEntity.components.PlayerControled.explode = true; 
            stopLines(entities);
        }

        // Check player collision with Other blocks;

        entities
        .filter( entity => entity.components.Block && !entity.components.PlayerControled && !entity.components.Particle )
        .forEach ( enemyEntity => {
            let enemyPosition = enemyEntity.components.Position;
            let enemyBlock = enemyEntity.components.Block;

            if(kt.Engine.Physics.rectCollision(playerPosition.x, playerPosition.y, playerBlock.width, playerBlock.height,
               enemyPosition.x, enemyPosition.y, enemyBlock.width, enemyBlock.height)){
                    playerEntity.components.PlayerControled.live = false; 
                    playerEntity.components.PlayerControled.explode = true; 
                    stopLines(entities);
                }
        });

        // Check player collisiion with Lines and add points;

        if(!playerEntity.components.PlayerControled.collided){

            entities
            .filter( entity => entity.components.Line )
            .forEach( line => {
                let linePosition = line.components.Position;
                let lineProperties = line.components.Line;
                // #TODO check right side of player block with line still need to add rest of lines.
                if(kt.Engine.Physics.segmentsCollistion( playerPosition.x + playerBlock.width, playerPosition.y, playerPosition.x + playerBlock.width, playerPosition.y + playerBlock.height,
                    linePosition.x, linePosition.y, linePosition.x + lineProperties.x1, linePosition.y + lineProperties.y1 )){


                    console.log("collision", lineProperties.color.value);
                    console.log(line)
                    // now it's just a shot with max length of line
                    // removed for later part
                    //    lineProperties.visible = false;
                    //    lineProperties.destroyed = true;
                    if(playerEntity.components.Block.color !== lineProperties.color.value){
                        playerEntity.components.PlayerControled.collided = true;
                        playerEntity.components.PlayerControled.live = false; 
                        playerEntity.components.PlayerControled.explode = true; 
                        stopLines(entities);
                    }
                }
            });
        }
    }
};

function stopLines(entities) {
    entities.filter(entity => entity.components.Block && !entity.components.PlayerControled)
        .forEach(block => {
            
            if(block.components.Particle){
                block.components.Physic.vx = 0;
                return;
            }

            block.components.Physic.vx = 0;
            block.components.Physic.vy = 0;
        })
}
