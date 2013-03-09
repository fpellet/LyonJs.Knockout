LyonJs = function () { };
LyonJs.ViewModel = function () { };
LyonJs.Utils = function () { };


ko.mustacheTemplateEngine.prototype['makeTemplateSource'] = function (template, templateDocument) {
    var self = this;
    // Named template
    if (typeof template == "string") {
        if (self.templates != undefined && self.templates.hasOwnProperty(template)) {
            var value = new Array();
            value["innerHTML"] = self.templates[template];
            return new ko.templateSources.domElement(value);
        }

        templateDocument = templateDocument || document;
        var elem = templateDocument.getElementById(template);
        if (!elem)
            throw new Error("Cannot find template with ID " + template);
        return new ko.templateSources.domElement(elem);
    } else if ((template.nodeType == 1) || (template.nodeType == 8)) {
        // Anonymous template
        return new ko.templateSources.anonymousTemplate(template);
    } else
        throw new Error("Unknown template type: " + template);
};

ko.mustacheTemplateEngine.prototype['addTemplate'] = function (name, dom) {
    var self = this;
    if (self.templates == undefined) self.templates = new Array();

    self.templates[name] = dom;
};

ko.bindingHandlers.cleanTemplate = {
    'init': function (element, valueAccessor) {
        //var value = valueAccessor();

        //if (value.name == undefined) delete value.name;

        //if (value.name != undefined) {
        //    var templateName = value.name;

        //    var engine = window.mustacheTemplateEngine;
        //    if (engine.templates == undefined || !engine.templates.hasOwnProperty(templateName)) {
        //        delete value.name;
        //    }
        //    else {
        //        value.name = templateName;
        //    }
        //}

        ko.virtualElements.emptyNode(element);

        return ko.bindingHandlers['template'].init(element, valueAccessor);
    },
    'update': function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        return ko.bindingHandlers['template'].update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
    }
};

ko.virtualElements.allowedBindings.cleanTemplate = true;

$(document).ready(function () {
    window.mustacheTemplateEngine = new ko.mustacheTemplateEngine();
    var templates = window["templates"];
    if (templates != undefined) {
        var templateNb = templates.length;
        for (var i = 0; i < templateNb; i++) {
            var item = templates[i];
            window.mustacheTemplateEngine.addTemplate(item.Name, item.Value);
        }
    }

    ko.setTemplateEngine(window.mustacheTemplateEngine);

    LyonJs.Utils.Navigation.initialize();
    
    LyonJs.Utils.Navigation.initializeHistory();
});