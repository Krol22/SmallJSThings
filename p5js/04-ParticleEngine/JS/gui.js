let Gui = {
    init() {
        this.initRange();
        this.initCheckbox();
    },

    initRange() {

        $('#grey-range').val(CanvasHelper.grey);

        $('#width-range').on('change', function(){
            ParticleSource.particleWidth = $(this).val();
        });

        $('#height-range').on('change', function(){
            ParticleSource.particleHeight = $(this).val();
        });

        $('#number-of-particles-range').on('change', function(){
            ParticleSource.numberOfParticles = $(this).val();
        });

        $('#life-range').on('change', function(){
            ParticleSource.particleLife = $(this).val();
        });

        $('#mass-range').on('change', function() {
            ParticleSource.particleMass = $(this).val();
        });

        $('#red-range').on('change', function() {
            ParticleSource.red = $(this).val();
        });

        $('#green-range').on('change', function() {
            ParticleSource.green = $(this).val();
        });

        $('#blue-range').on('change', function() {
            ParticleSource.blue = $(this).val();
        });

        $('#grey-range').on('change', function() {
            CanvasHelper.grey = $(this).val();
        });

        $('#windx-range').on('change', function() {
            ParticleSource.windx = $(this).val();
        });

        $('#windy-range').on('change', function() {
            ParticleSource.windy = $(this).val();
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
            ParticleSource.isGravityOn = $(this).is(':checked');
        });
    },
};
