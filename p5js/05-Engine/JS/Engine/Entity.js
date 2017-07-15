kt.Engine.Entity = function() {
    this.id = (Math.random() * 10000000).toString(16);
    this.components = {};
    return this;
};

kt.Engine.Entity.prototype.addComponent = function(component) {
    if(!component.name) throw new Error('Component has to have a name!');
    this.components[component.name] = component;
    return this;
};

kt.Engine.Entity.prototype.removeComponent = function(componentName) {
    var name = componentName;
    if(typeof componentName === 'function'){
        name = componentName.name;
    }

    delete this.components[name];
    return this;
};

kt.Engine.Entity.prototype.print = function() {
    console.log(JSON.stringify(this, null, 4));
    return this;
};
