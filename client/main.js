var SUIBlocker = (function() {
    function SUIBlocker() {
        this.isBlocked = false;
        this.templateInstance = false;
        this.message = new ReactiveVar(false);
        this.open = new ReactiveVar(false);
    }

    SUIBlocker.prototype.block = function(message) {
        if (message == null) {
            message = false;
        }
        this.isBlocked = true;
        this.open.set(true);
        if (message) {
            this.message.set(message);
        }
        if (this.templateInstance) {
            Blaze.remove(this.templateInstance);
        }
        if ($('body')[0]) {
            this.templateInstance = Blaze.render(Template.SUIBlock, $('body')[0]);
        }
        $('html').addClass('SUIBlocked');
    };

    SUIBlocker.prototype.unblock = function() {
        this.isBlocked = false;
        this.open.set(false);
        this.message.set(false);
        if (this.templateInstance) {
            Blaze.remove(this.templateInstance);
        }
        $('html').removeClass('SUIBlocked');
    };

    return SUIBlocker;

})();

SUIBlock = new SUIBlocker;

Template.SUIBlock.helpers({
    blocked: function() {
        return SUIBlock.open.get();
    },
    message: function() {
        return SUIBlock.message.get();
    }
});