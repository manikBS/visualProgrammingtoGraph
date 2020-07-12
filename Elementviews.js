    joint.shapes.constant = {};
    joint.shapes.constant.Element = joint.shapes.devs.Model.extend({
        defaults: joint.util.deepSupplement({
            type: 'constant.Element',
            attrs: {
                rect: { stroke: 'none', 'fill-opacity': 0 }
            },
            outPorts: ['out'],
            ports: {
                groups: {
                    'out': {
                        attrs: {
                            '.port-body': {
                                fill: '#E74C3C',
                                r:'10',
                                position:'right'
                            }
                        }
                    }
                }
            },
        }, joint.shapes.devs.Model.prototype.defaults)
    });
    joint.shapes.constant.ElementView = joint.dia.ElementView.extend({
    template: [
        '<div class="constant-element">',
        '<button class="delete">x</button>',
        '<label></label><br/>',
        '<span>Name: </span><input name="Name" type="text" value="Name" /><br/>',
        '<span>Value: </span><input name="Value" type="text" value="Value" />',
        '</div>'
    ].join(''),

    initialize: function() {
        _.bindAll(this, 'updateBox');
        joint.dia.ElementView.prototype.initialize.apply(this, arguments);

        this.$box = $(_.template(this.template)());
        // Prevent paper from handling pointerdown.
        this.$box.find('input,select').on('mousedown click', function(evt) {
            evt.stopPropagation();
        });
        // This is an example of reacting on the input change and storing the input data in the cell model.
        this.$box.find('input[name="Name"]').on('change', _.bind(function(evt) {
            this.model.set('Name', $(evt.target).val());
        }, this));
        this.$box.find('input[name="Value"]').on('change', _.bind(function(evt) {
            this.model.set('Value', $(evt.target).val());
        }, this));
        this.$box.find('select').on('change', _.bind(function(evt) {
            this.model.set('select', $(evt.target).val());
        }, this));
        this.$box.find('select').val(this.model.get('select'));
        this.$box.find('.delete').on('click', _.bind(this.model.remove, this.model));
        // Update the box position whenever the underlying model changes.
        this.model.on('change', this.updateBox, this);
        // Remove the box when the model gets removed from the graph.
        this.model.on('remove', this.removeBox, this);

        this.updateBox();
    },
    render: function() {
        joint.dia.ElementView.prototype.render.apply(this, arguments);
        this.paper.$el.prepend(this.$box);
        this.updateBox();
        return this;
    },
    updateBox: function() {
        // Set the position and dimension of the box so that it covers the JointJS element.
        var bbox = this.model.getBBox();
        // Example of updating the HTML with a data stored in the cell model.
        this.$box.find('label').text(this.model.get('label'));
        this.$box.find('span').text(this.model.get('select'));
        this.$box.css({
            width: bbox.width,
            height: bbox.height,
            left: bbox.x,
            top: bbox.y,
            transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)'
        });
    },
    removeBox: function(evt) {
        this.$box.remove();
    }
});


joint.shapes.slider = {};
joint.shapes.slider.Element = joint.shapes.devs.Model.extend({
    defaults: joint.util.deepSupplement({
        type: 'slider.Element',
        attrs: {
            rect: { stroke: 'none', 'fill-opacity': 0 }
        },
        outPorts: ['out'],
        ports: {
                groups: {
                    'out': {
                        attrs: {
                            '.port-body': {
                                fill: '#E74C3C',
                                r:'10',
                                position:'right'
                            }
                        }
                    }
                }
            },
    }, joint.shapes.devs.Model.prototype.defaults)
});
joint.shapes.slider.ElementView = joint.dia.ElementView.extend({
    template: [
        '<div class="slider-element">',
        '<button class="delete">x</button>',
        '<label></label><br/>',
        '<span>Name: </span><input name="Name" type="text" value="Name" /><br/>',
        '<span>Min: </span><input name="Min" type="text" value="Min" /><br/>',
        '<span>Max: </span><input name="Max" type="text" value="Max" /><br/>',
        '<span>Step: </span><input name="Step" type="text" value="Step" />',
        '</div>'
    ].join(''),

    initialize: function() {
        _.bindAll(this, 'updateBox');
        joint.dia.ElementView.prototype.initialize.apply(this, arguments);

        this.$box = $(_.template(this.template)());
        // Prevent paper from handling pointerdown.
        this.$box.find('input,select').on('mousedown click', function(evt) {
            evt.stopPropagation();
        });
        // This is an example of reacting on the input change and storing the input data in the cell model.
        this.$box.find('input[name="Name"]').on('change', _.bind(function(evt) {
            this.model.set('Name', $(evt.target).val());
        }, this));
        this.$box.find('input[name="Min"]').on('change', _.bind(function(evt) {
            this.model.set('Min', $(evt.target).val());
        }, this));
        this.$box.find('input[name="Max"]').on('change', _.bind(function(evt) {
            this.model.set('Max', $(evt.target).val());
        }, this));
        this.$box.find('input[name="Step"]').on('change', _.bind(function(evt) {
            this.model.set('Step', $(evt.target).val());
        }, this));
        this.$box.find('.delete').on('click', _.bind(this.model.remove, this.model));
        // Update the box position whenever the underlying model changes.
        this.model.on('change', this.updateBox, this);
        // Remove the box when the model gets removed from the graph.
        this.model.on('remove', this.removeBox, this);

        this.updateBox();
    },
    render: function() {
        joint.dia.ElementView.prototype.render.apply(this, arguments);
        this.paper.$el.prepend(this.$box);
        this.updateBox();
        return this;
    },
    updateBox: function() {
        // Set the position and dimension of the box so that it covers the JointJS element.
        var bbox = this.model.getBBox();
        // Example of updating the HTML with a data stored in the cell model.
        this.$box.find('label').text(this.model.get('label'));
        this.$box.find('span').text(this.model.get('select'));
        this.$box.css({
            width: bbox.width,
            height: bbox.height,
            left: bbox.x,
            top: bbox.y,
            transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)'
        });
    },
    removeBox: function(evt) {
        this.$box.remove();
    }
});


joint.shapes.dataGenerator = {};
joint.shapes.dataGenerator.Element = joint.shapes.devs.Model.extend({
    defaults: joint.util.deepSupplement({
        type: 'dataGenerator.Element',
        attrs: {
            rect: { stroke: 'none', 'fill-opacity': 0 }
        },
        inPorts: ['in1','in2'],
        outPorts: ['out'],
        ports: {
                groups: {
                    'in': {
                        attrs: {
                            '.port-body': {
                                fill: '#5edc47',
                                r:'10',
                                position:'left',
                                magnet:'passive'
                            }
                        }
                    },
                    'out': {
                        attrs: {
                            '.port-body': {
                                fill: '#E74C3C',
                                r:'10',
                                position:'right'
                            }
                        }
                    }
                }
            },
    }, joint.shapes.devs.Model.prototype.defaults)
});
joint.shapes.dataGenerator.ElementView = joint.dia.ElementView.extend({
    template: [
        '<div class="slider-element">',
        '<button class="delete">x</button>',
        '<label></label><br/>',
        '<span>Equation: </span><input name="Equation" type="text" value="Equatio" /><br/>',
        '</div>'
    ].join(''),

    initialize: function() {
        _.bindAll(this, 'updateBox');
        joint.dia.ElementView.prototype.initialize.apply(this, arguments);

        this.$box = $(_.template(this.template)());
        // Prevent paper from handling pointerdown.
        this.$box.find('input,select').on('mousedown click', function(evt) {
            evt.stopPropagation();
        });
        // This is an example of reacting on the input change and storing the input data in the cell model.
        this.$box.find('input[name="Equation"]').on('change', _.bind(function(evt) {
            this.model.set('Equation', $(evt.target).val());
        }, this));
        this.$box.find('.delete').on('click', _.bind(this.model.remove, this.model));
        // Update the box position whenever the underlying model changes.
        this.model.on('change', this.updateBox, this);
        // Remove the box when the model gets removed from the graph.
        this.model.on('remove', this.removeBox, this);

        this.updateBox();
    },
    render: function() {
        joint.dia.ElementView.prototype.render.apply(this, arguments);
        this.paper.$el.prepend(this.$box);
        this.updateBox();
        return this;
    },
    updateBox: function() {
        // Set the position and dimension of the box so that it covers the JointJS element.
        var bbox = this.model.getBBox();
        // Example of updating the HTML with a data stored in the cell model.
        this.$box.find('label').text(this.model.get('label'));
        this.$box.find('span').text(this.model.get('select'));
        this.$box.css({
            width: bbox.width,
            height: bbox.height,
            left: bbox.x,
            top: bbox.y,
            transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)'
        });
    },
    removeBox: function(evt) {
        this.$box.remove();
    }
});