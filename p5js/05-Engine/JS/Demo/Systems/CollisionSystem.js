const collisionSystem = {
    init(){},
    tick(entities) {

        let playerEntity = entities.filter( entity => {
            return entity.components.PlayerControled;
        })[0];

        let scoreEntity = entities.filter( entity => {
            return entity.components.Text;
        })[0];

        let playerPosition = playerEntity.components.Position;
        let playerBlock = playerEntity.components.Block;

        if(playerPosition.y < 0 || playerPosition.y > 320 - playerBlock.width){
            // player collision with world.
            playerPosition.y = 195;
            playerEntity.components.Physic.vy = 0;
            playerEntity.components.Physic.ay = 0;
            playerEntity.components.PlayerControled.live = false;
            scoreEntity.components.Value.value = 0;
            scoreEntity.components.Value.counting = false;
        }

        // Check player collision with Other blocks;

        entities
        .filter( entity => entity.components.Block && !entity.components.PlayerControled )
        .forEach ( enemyEntity => {
            let enemyPosition = enemyEntity.components.Position;
            let enemyBlock = enemyEntity.components.Block;

            if(kt.Engine.Physics.rectCollision(playerPosition.x, playerPosition.y, playerBlock.width, playerBlock.height,
               enemyPosition.x, enemyPosition.y, enemyBlock.width, enemyBlock.height)){
                    playerPosition.y = 195;
                    playerEntity.components.Physic.vy = 0;
                    playerEntity.components.Physic.ay = 0;
                    scoreEntity.components.Value.value = 0;
                    scoreEntity.components.Value.counting = false;
                }
        });

        // Check player collisiion with Lines and add points;

        if(!playerEntity.components.PlayerControled.collided){
            scoreEntity = entities.filter(entity => entity.components.Value)[0];

            entities
            .filter( entity => entity.components.Line )
            .forEach( line => {
                let linePosition = line.components.Position;
                let lineProperties = line.components.Line;
                // #TODO check right side of player block with line still need to add rest of lines.
                if(kt.Engine.Physics.segmentsCollistion( playerPosition.x + playerBlock.width, playerPosition.y, playerPosition.x + playerBlock.width, playerPosition.y + playerBlock.height,
                    linePosition.x, linePosition.y, linePosition.x + lineProperties.x1, linePosition.y + lineProperties.y1 )){

                    // now it's just a shot with max length of line
                    scoreEntity.components.Value.value += line.components.Line.color.points;
                    playerEntity.components.PlayerControled.collided = true;
                }
            });
        }
    }
};
