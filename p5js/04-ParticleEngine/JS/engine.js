let Engine = {
    init(){
        ParticleSource.init(400, 300, 10);
        Wall.init(400, 400, 100, 100);
    },
    draw(){
        ParticleSource.draw();
        Wall.draw();
    },
    update(){
        ParticleSource.update();
    },
};

let ParticleSource = {
    init(x, y, width){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = width;
        this.particles = [];
        this.particleWidth = 20;
        this.numberOfParticles = 5;
        this.particleLife = 80;
        this.isGravityOn = false;
        this.particleMass = 0;
        this.red = 122;
        this.green = 122;
        this.blue = 122;
        this.windx = 0;
        this.windy = 0;
    },
    update(){
        this.drag();
        this.particles.forEach(particle => particle.update());
        this.createNewSetOfParticles();
        this.recycle();
    },
    draw(){
        this.particles.forEach(particle => particle.draw());
        stroke(255);
        rect(this.x, this.y, this.width, this.height);
        noStroke();
    },
    createNewSetOfParticles(){
        for(let i = 0; i < this.numberOfParticles; i++){
            let newParticle = Object.create(Particle);
            newParticle.init(this.x + this.width / 2 + (random(this.width) - this.width / 2),
                this.y + this.height / 2 + (random(this.height) - this.height / 2),
                (random(10) - 5) / 2,
                (random(10) - 5) / 2,
                this.particleWidth,
                this.particleHeight);

            newParticle.setLifeSpan(this.particleLife);
            this.particles.push(newParticle);
        }
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
    drag(){
        if(InputManager.mousePressed &&
            mouseX > this.x && mouseX < this.x + this.width &&
            mouseY < this.y + this.width && mouseY > this.y){
                this.isDragging = true;
            }

        if(!InputManager.mousePressed)
            this.isDragging = false;

        if(this.isDragging)
            this.setNewPosition(mouseX - this.width / 2, mouseY - this.height / 2);
    },

    setNewPosition(newX, newY){
        if(newX + this.width > canvasWidth){
            this.x = canvasWidth - this.width;
        } else if(newX < 0){
            this.x = 0;
        } else {
            this.x = newX;
        }

        if(newY + this.height > canvasHeight){
            this.y = canvasHeight - this.height;
        } else if(newY < 0){
            this.y = 0;
        } else {
            this.y = newY;
        }
    }
};

let Particle = {
    init(x, y, Vx, Vy, width = 10, height = 10){
        this.x = x;
        this.y = y;
        this.Vx = Vx;
        this.Vy = Vy;
        this.Ax = 0.0;
        this.Ay = 0.0;
        this.lifeSpan = 80;
        this.life = 0;
        this.width = width;
        this.height = height;
        this.alive = true;

        if(ParticleSource.isGravityOn){
            this.Vy = this.Vy - Number(ParticleSource.particleMass);
        }

    },
    setLifeSpan(lifeSpan){
        this.lifeSpan = lifeSpan;
    },
    draw(){
        let alpha = 100 - map(this.life, 0, this.lifeSpan, 0, 100);
        fill(color(ParticleSource.red, ParticleSource.green, ParticleSource.blue, alpha));

        let correctWidth = this.width - map(this.life, 0, this.lifeSpan, 0, this.width);
        let correctHeight = this.height - map(this.life, 0, this.lifeSpan, 0, this.height);
        rect(this.x - (this.width / 2), this.y - (this.width / 2), correctWidth, correctHeight);
    },
    update(){
        if(this.alive){
            this.x += this.Vx;
            this.y += this.Vy;
            if(Wall.x < this.x + this.width && Wall.x + Wall.width > this.x && Wall.y < this.y + this.height && Wall.y + Wall.height > this.y) {
                this.Vy = -this.Vy * (1 - (this.life / this.lifeSpan));
            }
            this.Vx += this.Ax;
            this.Vy += this.Ay;
            this.life += 1;

            this.Ax -= ParticleSource.windx;
            this.Ay -= ParticleSource.windy;

            if(this.life > this.lifeSpan)
                this.alive = false;
        }
    },
};

let Wall = {
    init(x, y, width, height){
        this.x = x;
        this.y = x;
        this.width = width;
        this.height = height;
    },
    draw(){
        stroke(255);
        fill(255,255,255);
        rect(this.x, this.y, this.width, this.height);
        noStroke();
    }
};
