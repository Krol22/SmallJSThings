
var testComponent = {
    name: 'Test',
    value: 10
};

var testEntity = new kt.Engine.Entity().addComponent(testComponent);

var testIncreaseSystem = function(entities){
    entities.forEach(entity => {
        if(entity.components.Test){
            entity.components.Test.value += 1;
        }
    });
};

var printSystem = function(entities){
    entities.forEach(entity => {
        if(entity.components.Test){
             entity.print();
        }
    });
};

kt.Engine.Systems.push(printSystem, testIncreaseSystem);

kt.Engine.start();
