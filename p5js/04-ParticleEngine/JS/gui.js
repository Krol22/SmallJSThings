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
        $('#width-range').on('change', function(){
            Engine.particleWidth = $(this).val();
        });

        $('#number-of-particles-range').on('change', function(){
            Engine.numberOfParticles = $(this).val();
        });

        $('#life-range').on('change', function(){
            Engine.particleLife = $(this).val();
        });

        $('#mass-range').on('change', function() {
            Engine.particleMass = $(this).val();
        });
    },

    initCheckbox() {
        $('#gravity-checkbox').on('change', function() {
            Engine.isGravityOn = $(this).is(':checked');
        });
    }


};
