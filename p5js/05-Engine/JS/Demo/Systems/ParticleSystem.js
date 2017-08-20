const PARTICLE_LIVE = 70;

const particleSystem = {
    init(){},
    tick(entities){

        let playerEntity = entities.filter( entity => entity.components.PlayerControled )[0];
        let particlePool = entities.filter( entity => entity.components.Particle);

        // create particle for each tick;
        if(playerEntity.components.PlayerControled.live)
            createPath(particlePool,
                       playerEntity.components.Position.x, 
                       playerEntity.components.Position.y, 
                       playerEntity.components.Block.height,
                       playerEntity.components.Block.color);

        if(playerEntity.components.PlayerControled.explode){
            playerEntity.components.PlayerControled.explode = false;
            createPlayerExplode(particlePool, playerEntity);
        }

        particlePool
        .filter(particle => particle.components.Particle.isAlive)
        .forEach(aliveParticle => {
            if(aliveParticle.components.Particle.liveTime >= PARTICLE_LIVE){
                aliveParticle.components.Particle.isAlive = false;
                return;
            }

            aliveParticle.components.Particle.liveTime++;
        });

    }
};

createPath = function(pool, x, y, interval, color){
    let deadParticle = pool.find(particle => !particle.components.Particle.isAlive);
    if(!deadParticle) return;
    deadParticle.components.Particle.isAlive = true;
    deadParticle.components.Particle.liveTime = 0;
    deadParticle.components.Block.color = color;
    deadParticle.components.Block.height = 2;
    deadParticle.components.Block.width = 2;
    deadParticle.components.Physic.vy = Math.random() * 0.5 - 0.25;
    deadParticle.components.Position.x = x + Math.random() * interval / 2;
    deadParticle.components.Position.y = y + Math.random() * interval / 2;
}

createPlayerExplode = function(pool, player){
    let playerX = player.components.Position.x;
    let playerY = player.components.Position.y;

    for(let i = 0; i < 20; i++){
        let particle = pool.find(particle => !particle.components.Particle.isAlive);
        if(!particle) return;
        particle.components.Particle.isAlive = true;
        particle.components.Particle.liveTime = 0;

        particle.components.Block.color = player.components.Block.color;
        particle.components.Block.height = 3;
        particle.components.Block.width = 3;

        particle.components.Position.x = playerX;
        particle.components.Position.y = playerY;

        particle.components.Physic.vy = Math.random() * 2 - 1;
        particle.components.Physic.vx = Math.random() * 2 - 1;
    }

}

createLineExplode = function(pool, line){
    let x = line.components.Position.x;
    let y = line.components.Position.y;
    let x1 = line.components.Line.x1;
    let y1 = line.components.Line.y1;

    let deltax = x1 - x;
    let deltay = y1 - y;

    let newXPosition = x + Math.random() * deltax;
    let newYPosition = (y * (x1 - newXPosition) + y1 * (newXPosition - x)) / (x1 - x);

    let deadParticle = pool.find(particle => !particle.components.Particle.isAlive);
    if(!deadParticle) return;
    deadParticle.components.Particle.isAlive = true;
    deadParticle.components.Particle.liveTime = 0;
    deadParticle.components.Block.color = line.components.Line.color.value;
    deadParticle.components.Block.height = 4;
    // deadParticle.components.Physic.vx = deadParticle.components.Physic.vx + Math.random() * 0.5 - 0.25;
    // change each line for particle and collect them on line breaking!!!
    deadParticle.components.Physic.vy = Math.random() * 1 - 0.5;
    deadParticle.components.Position.x = newXPosition;
    deadParticle.components.Position.y = newYPosition;
}

