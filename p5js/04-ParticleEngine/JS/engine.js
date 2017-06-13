let Engine = {
    init(){
        this.particles = [];
        this.particleType = "RECT";
        this.particleWidth = 20;
        this.numberOfParticles = 5;
        this.particleLife = 80;
        this.isGravityOn = false;
        this.particleMass = 0;
        this.red = 122;
        this.green = 122;
        this.blue = 122;
    },
    draw(){
        this.particles.forEach(particle => particle.draw());
    },
    update(){
        this.particles.forEach(particle => particle.update());
        this.createNewSetOfParticles();
        this.recycle();
        ParticleSource.update();
    },
    recycle(){
        let particlesToRemove = [];
        for(let i = 0; i < this.particles.length; i++){
            if(!this.particles[i].alive){
                particlesToRemove.push(i);
            }
        }
        for(let i = particlesToRemove.length - 1; i > 0; i--){
            this.particles.splice(1, particlesToRemove[i]);
        }
    },
    setNumberOfParticles(numberOfParticles){
        this.numberOfParticles = numberOfParticles;
    },
    createNewSetOfParticles(){
        for(let i = 0; i < this.numberOfParticles; i++){
            let newParticle = Object.create(Particle);
            newParticle.init(ParticleSource.x + ParticleSource.width / 2 + (random(8) - 4),
                ParticleSource.y + ParticleSource.width / 2 + (random(8) - 4),
                (random(10) - 5) / 2,
                (random(10) - 5) / 2,
                this.particleWidth);

            newParticle.setLifeSpan(this.particleLife);
            this.particles.push(newParticle);
        }
    }
};

let ParticleSource = {
    init(x, y, width){
        this.x = x;
        this.y = y;
        this.width = width;
    },
    update(){
        this.drag();
    },
    drag(){
        if(InputManager.mousePressed &&
            mouseX > this.x && mouseX < this.x + this.width &&
            mouseY < this.y + this.width && mouseY > this.y){
                this.isDragging = true;
            }

        if(!InputManager.mousePressed)
            this.isDragging = false;

        if(this.isDragging)
            this.setNewPosition(mouseX - this.width / 2, mouseY - this.width / 2);
    },

    setNewPosition(newX, newY){
        if(newX + this.width > canvasWidth){
            this.x = canvasWidth - this.width;
        } else if(newX < 0){
            this.x = 0;
        } else {
            this.x = newX;
        }

        if(newY + this.width > canvasHeight){
            this.y = canvasHeight - this.width;
        } else if(newY < 0 + this.width){
            this.y = 0;
        } else {
            this.y = newY;
        }
    }
};

let Particle = {
    init(x, y, Vx, Vy, width = 10){
        this.x = x;
        this.y = y;
        this.Vx = Vx;
        this.Vy = Vy;
        this.lifeSpan = 80;
        this.life = 0;
        this.width = width;
        this.alive = true;
        this.particleType = Engine.particleType;

        if(Engine.isGravityOn){
            this.Vy = this.Vy - Number(Engine.particleMass);
        }

    },
    setLifeSpan(lifeSpan){
        this.lifeSpan = lifeSpan;
    },
    draw(){
        let alpha = 100 - map(this.life, 0, this.lifeSpan, 0, 100);
        fill(color(Engine.red, Engine.green, Engine.blue, alpha));

        let correctWidth = this.width - map(this.life, 0, this.lifeSpan, 0, this.width);
        if(this.particleType === "RECT"){
            rect(this.x - (this.width / 2), this.y - (this.width / 2), correctWidth, correctWidth);
        } else {
            ellipse(this.x , this.y, correctWidth, correctWidth);
        }
    },
    update(){
        if(this.alive){
            this.x += this.Vx;
            this.y += this.Vy;
            this.life += 1;

            if(this.life > this.lifeSpan)
                this.alive = false;
        }
    },
};
