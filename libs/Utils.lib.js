var Utils = {
    /**
     * Print formatted string
     * @param formatted - The formatted string to replace.
     * @param params - Values to replace
     * @example Utils.printf('{0} is dead, but {1} is alive! {0} {2}', 'ASP', 'PHP');
     *      returns -> "ASP is dead, but PHP is alive! ASP {2}"
     */
    printf: function() {
        var formatted = arguments[0]
        for (var i = 1; i < arguments.length; i++) {
            var regexp = new RegExp('\\{' + (i - 1) + '\\}', 'gi');
            formatted = formatted.replace(regexp, arguments[i]);
        }
        return formatted;
    },
    
    /**
     * Convert color string from HEX to RGB format
     * @param this - The HEX string to convert.
     * @param as_object - Whether to output the result as Object or Array
     * @example Utils.hexToRgb('#00FFEE', true)
     */
    hexToRgb: function(hex, as_object) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        
        if(result){
            return as_object ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
        }
        else{
            return null;
        }
    }
}