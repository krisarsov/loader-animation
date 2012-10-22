;(function(M, U, $){
    "use strict";
    /**
     * Loader component
     * 
     * A component for showing and hiding overlays
     * 
     * @param Object options
     *      @option image - filename of the loader image (stored in {path_to_plugin/img/})
     *      @option color - Background color (hex)
     *      @option opacity - Background opacity (between 0 and 1)
     *      @option appendTo - Selector or jQuery object to wich to append the overlay to
     *      @option fadeInDuration - FadeIn duration (in milliseconds)
     *      @option fadeOutDuration - FadeOut duration (in milliseconds)
     * @requires Modernizr(at least RGBA ckeck), Utils
     */
    var Loader = function(options){
        /* Extend the default options with the supplied ones if any */
        $.extend(true, this.options, this.defaults, options);
        
        /* Find current script location */
        this.__FILE__ = document.getElementById("loaderJS").src;
        this.__FILE_DIR__ = this.__FILE__.substring(0, this.__FILE__.indexOf('Loader.lib.js'));

        /* Convert the background color from HEX to RGB */
        var bgRGB = U.hexToRgb(this.options.color, true);
        
        /* Remove any other overlay added before */
        $('.loading-overlay', this.options.appendTo).remove();
        
        /* Create the overlay */
        this.overlay = $('<div/>')
            .addClass('loading-overlay')
            .appendTo(this.options.appendTo)
            .css({
                'display':          'none',
                'position':         'absolute',
                'z-index':          1200,
                'left':             0,
                'top':              0,
                'width':            '100%'
            });
        
        /* Prepare overlay background color */
        if(M.rgba){
            this.overlay.css('background-color', U.printf('rgba({0}, {1}, {2}, {3})', bgRGB.r, bgRGB.g, bgRGB.b, this.options.opacity));
        }
        else{
            this.overlay.css('background-image', 'url(' + this.__FILE_DIR__ + 'img/transparent-50.png)');
        }
        
        /* Create an empty image placeholder and append it to the container */    
        this.image = $('<img/>')
            .attr('alt', this.options.imageAlt)
            .appendTo(this.overlay)
            .css({
                'position':         'body' === this.options.appendTo ? 'fixed' : 'absolute',
                'left':             '50%',
                'top':              '50%',
                'opacity':          1
            });
        
        var $this = this;
        
        /* Create temporary image object */
        var loaderImage = new Image();
        loaderImage.onload = function(){
            /* Set the position of the image to center */
            $this.image.css({
                'margin-left':      U.printf('-{0}px', parseInt(this.width / 2, 10)),
                'margin-top':       U.printf('-{0}px', parseInt(this.height / 2, 10))
            });
            
            /* Change image placeholder's src to the loaded one */
            $this.image.attr('src', this.src);
        };
        
        /* Load the image into the temporary image object */
        loaderImage.src =  this.__FILE_DIR__ + 'img/' + this.options.image;
    };
    
    /**
     * Options
     */
    Loader.prototype.options = {};
    
    /**
     * Default options
     * Will be extended in the constructor
     */
    Loader.prototype.defaults = {
        color:              '#000000',
        image:              'ajax-loader.gif',
        imageAlt:           'Loading...',
        opacity:            0.5,
        appendTo:           'body',
        fadeInDuration:     300,
        fadeOutDuration:    300
    };
    
    /**
     * Show the loading overlay
     */
    Loader.prototype.enable = function(d){
        /* Set overlay height to the height of the container that is appended to */
        this.overlay.css({'height': $('body' === this.options.appendTo ? document : this.options.appendTo).height()});
        
        var duration = d || this.options.fadeInDuration;
        this.overlay.fadeIn(duration);
    };
    
    /**
     * Hide the loading overlay
     */
    Loader.prototype.disable = function(d){
        var duration = d || this.options.fadeOutDuration;
        this.overlay.fadeOut(duration);
    };
    
    /* Append the plugin to window */
    window.LoaderAnimation = Loader;
    
}(Modernizr, Utils, $));