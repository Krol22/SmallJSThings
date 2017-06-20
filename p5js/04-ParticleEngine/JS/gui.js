let Gui = {
    init() {
        this.initSelect();
        this.initRange();
        this.initCheckbox();
    },

    initSelect() {
        $('.select-input').on('change', () => {
            Engine.particleType = $('.select-input').find(":selected").text();
        });
    },

    initRange() {

        $('#grey-range').val(CanvasHelper.grey);

        $('#width-range').on('change', function(){
            Engine.particleWidth = $(this).val();
        });

        $('#height-range').on('change', function(){
            Engine.particleHeight = $(this).val();
        })
        $('#number-of-particles-range').on('change', function(){
            Engine.numberOfParticles = $(this).val();
        });

        $('#life-range').on('change', function(){
            Engine.particleLife = $(this).val();
        });

        $('#mass-range').on('change', function() {
            Engine.particleMass = $(this).val();
        });

        $('#red-range').on('change', function() {
            Engine.red = $(this).val();
        });

        $('#green-range').on('change', function() {
            Engine.green = $(this).val();
        });

        $('#blue-range').on('change', function() {
            Engine.blue = $(this).val();
        });

        $('#grey-range').on('change', function() {
            CanvasHelper.grey = $(this).val();
        });

        $('#windx-range').on('change', function() {
            Engine.windx = $(this).val();
        });

        $('#windy-range').on('change', function() {
            Engine.windy = $(this).val();
        });

        $('#sourceWidth-range').on('change', function() {
            ParticleSource.width = Number($(this).val());
        });

        $('#sourceHeight-range').on('change', function() {
            ParticleSource.height = Number($(this).val());
        });
    },

    initCheckbox() {
        $('#gravity-checkbox').on('change', function() {
            Engine.isGravityOn = $(this).is(':checked');
        });
    },
    initPredefinedEffects() {

    }
};
