$(function() {
    /**
     * Knockout datepicker binding
     *
     * @type {{init: Function, update: Function}}
     */
    ko.bindingHandlers.datepicker = {
        init: function(element, valueAccessor, allBindingsAccessor) {
            var $el = $(element);

            //  initialize datepicker with some optional options
            var options = allBindingsAccessor().datepickerOptions || {};
            options['changeMonth'] = true;
            options['changeYear'] = true;

            $el.datepicker(options);

            //handle the field changing
            ko.utils.registerEventHandler(element, "change", function() {
                var observable = valueAccessor();
                observable($el.datepicker("getDate"));
            });

            //handle disposal (if KO removes by the template binding)
            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                $el.datepicker("destroy");
            });

        },
        update: function(element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            var $el = $(element);

            var current = $el.datepicker("getDate");

            if (value - current !== 0) {
                $el.datepicker("setDate", value);
            }
        }
    };

    ko.bindingHandlers.option = {
        update: function(element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            ko.selectExtensions.writeValue(element, value);
        }
    };
});