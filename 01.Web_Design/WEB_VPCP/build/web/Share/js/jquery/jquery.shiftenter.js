/*
 * shiftenter: a jQuery plugin, version: 0.0.2 (2011-05-04) tested on jQuery v1.5.0
 */
(function($) {
    $.extend({
        shiftenter: {
            settings: {
    			onEnter : null,
                focusClass: 'shiftenter',
                inactiveClass: 'shiftenterInactive',
                hint: '',
                metaKey: 'shift',     // Meta key that triggers a line-break, allowed values: 'shift', 'ctrl'
                pseudoPadding: '0 10' // Pseudo-padding to work around webkit/firefox4 resize handler being hidden, follows the CSS padding style
            },
            get_padding: function(padding) {
                // Parse padding and return right & bottom padding
                var padding_right = 0,
                    padding_bottom = 0;
                if (padding) {
                    var padding_list = padding.split(/ +/);
                    switch (padding_list.length) {
                        case 1:
                            padding_bottom = padding_right = parseInt(padding_list[0]);
                            break;
                        case 2:
                            padding_bottom = parseInt(padding_list[0]);
                            padding_right = parseInt(padding_list[1]);
                            break;
                        default:
                            padding_right = parseInt(padding_list[1]);
                            padding_bottom = parseInt(padding_list[2]);
                    }
                }
                return {right: padding_right, bottom: padding_bottom};
            }
        }
    });
    // plugin code
    $.fn.shiftenter = function(opts) {
        opts = $.extend({},$.shiftenter.settings, opts);

        return this.each(function() {
            var $el = $(this);
            // Our goal only makes sense for textareas where enter does not trigger submit
            if(!$el.is('textarea')) {
                return;
            }
            // Add hint
            if (opts.hint) {
                var $hint = $('<div class="' + opts.inactiveClass + '">' + opts.hint + '</div>').insertAfter($el),
                    reposition = function() {
                        var position = $el.position(),
                            padding = $.shiftenter.get_padding(opts.pseudoPadding);

                        /* Position hint, relative right bottom corner of textarea,
                           add pseudo-padding to workaround hint text with heigher z-index hiding resize handler */
                        $hint.css("left", position.left + $el.outerWidth() - $hint.outerWidth() - padding.right)
                            .css("top", position.top + $el.outerHeight() - $hint.outerHeight() - padding.bottom);
                    };                    
                reposition();
                // Show & Hide hint
                $el.bind('focus.shiftenter', function(){
                    // Be safe and reposition, size of textarea might have been changed
                    reposition();
                    $hint.removeClass(opts.inactiveClass).addClass(opts.focusClass);
                    /* Reposition hint on user grabbing the webkit/firefox4 textarea resize handler
                       TODO should be only bound on "mousedown", but Chrome currently doesn't issue a mousedown on the resizer */
                    $el.bind('mousemove.shiftenter', reposition);
                });
                $el.bind('blur.shiftenter', function(){
                    $hint.removeClass(opts.focusClass).addClass(opts.inactiveClass);
                    // Stop repositioning
                    $el.unbind('mousemove.shiftenter');
                });
                /* Resize wrap (needs jquery-resize, http://benalman.com/projects/jquery-resize-plugin/),
                   only needed for cases where javascript-triggered resize happens while textarea has focus
                   (e.g. autogrow) */
                $el.bind('resize', function(){
                    reposition();
                });
            }
            // Catch return key without shift to submit form
            $el.bind('keydown.shiftenter', function(event) {
                if (event.keyCode === 13) {
                    var meta_key = opts.metaKey.toLowerCase();
                    if (meta_key == 'shift' && event.shiftKey) {
                        // Nothing to do, browser inserts a return
                    } else if (meta_key == 'ctrl' && event.ctrlKey) {
                        // For Ctrl+Enter we need to manually insert a return
                        // Taken from Tim Down, http://stackoverflow.com/questions/3532313/jquery-ctrlenter-as-enter-in-text-area, CC BY-SA 3.0
                        var val = this.value;
                        if (typeof this.selectionStart == "number" && typeof this.selectionEnd == "number") {
                            var start = this.selectionStart;
                            this.value = val.slice(0, start) + "\n" + val.slice(this.selectionEnd);
                            this.selectionStart = this.selectionEnd = start + 1;
                        } else if (document.selection && document.selection.createRange) {
                            this.focus();
                            var range = document.selection.createRange();
                            range.text = "\r\n";
                            range.collapse(false);
                            range.select();
                        }
                        return false;
                    } else {
	                	event.preventDefault();
	                	$el.blur();
	                	var onEnter = opts.onEnter;
                	   if(onEnter != undefined && onEnter != null){
   							onEnter();
   						}
                        return false;
                    }
                }
            });

        });
    };
})(jQuery);