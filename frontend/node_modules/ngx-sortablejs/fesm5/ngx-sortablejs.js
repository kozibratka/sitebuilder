import { __assign, __spread } from 'tslib';
import { InjectionToken, Injectable, ɵɵdefineInjectable, EventEmitter, Directive, Optional, Inject, ElementRef, NgZone, Renderer2, Input, Output, NgModule } from '@angular/core';
import Sortable from 'sortablejs';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var GLOBALS = new InjectionToken('Global config for sortablejs');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SortablejsBinding = /** @class */ (function () {
    function SortablejsBinding(target) {
        this.target = target;
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    SortablejsBinding.prototype.insert = /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    function (index, item) {
        if (this.isFormArray) {
            this.target.insert(index, item);
        }
        else {
            this.target.splice(index, 0, item);
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    SortablejsBinding.prototype.get = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return this.isFormArray ? this.target.at(index) : this.target[index];
    };
    /**
     * @param {?} index
     * @return {?}
     */
    SortablejsBinding.prototype.remove = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var item;
        if (this.isFormArray) {
            item = this.target.at(index);
            this.target.removeAt(index);
        }
        else {
            item = this.target.splice(index, 1)[0];
        }
        return item;
    };
    Object.defineProperty(SortablejsBinding.prototype, "isFormArray", {
        // we need this to identify that the target is a FormArray
        // we don't want to have a dependency on @angular/forms just for that
        get: 
        // we need this to identify that the target is a FormArray
        // we don't want to have a dependency on @angular/forms just for that
        /**
         * @private
         * @return {?}
         */
        function () {
            // just checking for random FormArray methods not available on a standard array
            return !!this.target.at && !!this.target.insert && !!this.target.reset;
        },
        enumerable: true,
        configurable: true
    });
    return SortablejsBinding;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    SortablejsBinding.prototype.target;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SortablejsBindings = /** @class */ (function () {
    function SortablejsBindings(bindingTargets) {
        this.bindings = bindingTargets.map((/**
         * @param {?} target
         * @return {?}
         */
        function (target) { return new SortablejsBinding(target); }));
    }
    /**
     * @param {?} index
     * @param {?} items
     * @return {?}
     */
    SortablejsBindings.prototype.injectIntoEvery = /**
     * @param {?} index
     * @param {?} items
     * @return {?}
     */
    function (index, items) {
        this.bindings.forEach((/**
         * @param {?} b
         * @param {?} i
         * @return {?}
         */
        function (b, i) { return b.insert(index, items[i]); }));
    };
    /**
     * @param {?} index
     * @return {?}
     */
    SortablejsBindings.prototype.getFromEvery = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return this.bindings.map((/**
         * @param {?} b
         * @return {?}
         */
        function (b) { return b.get(index); }));
    };
    /**
     * @param {?} index
     * @return {?}
     */
    SortablejsBindings.prototype.extractFromEvery = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return this.bindings.map((/**
         * @param {?} b
         * @return {?}
         */
        function (b) { return b.remove(index); }));
    };
    Object.defineProperty(SortablejsBindings.prototype, "provided", {
        get: /**
         * @return {?}
         */
        function () {
            return !!this.bindings.length;
        },
        enumerable: true,
        configurable: true
    });
    return SortablejsBindings;
}());
if (false) {
    /** @type {?} */
    SortablejsBindings.prototype.bindings;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SortablejsService = /** @class */ (function () {
    function SortablejsService() {
    }
    SortablejsService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    /** @nocollapse */ SortablejsService.ngInjectableDef = ɵɵdefineInjectable({ factory: function SortablejsService_Factory() { return new SortablejsService(); }, token: SortablejsService, providedIn: "root" });
    return SortablejsService;
}());
if (false) {
    /** @type {?} */
    SortablejsService.prototype.transfer;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var getIndexesFromEvent = (/**
 * @param {?} event
 * @return {?}
 */
function (event) {
    if (event.hasOwnProperty('newDraggableIndex') && event.hasOwnProperty('oldDraggableIndex')) {
        return {
            new: event.newDraggableIndex,
            old: event.oldDraggableIndex,
        };
    }
    else {
        return {
            new: event.newIndex,
            old: event.oldIndex,
        };
    }
});
var ɵ0 = getIndexesFromEvent;
var SortablejsDirective = /** @class */ (function () {
    function SortablejsDirective(globalConfig, service, element, zone, renderer) {
        this.globalConfig = globalConfig;
        this.service = service;
        this.element = element;
        this.zone = zone;
        this.renderer = renderer;
        this.runInsideAngular = false; // to be deprecated
        // to be deprecated
        this.sortablejsInit = new EventEmitter();
    }
    /**
     * @return {?}
     */
    SortablejsDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (Sortable && Sortable.create) { // Sortable does not exist in angular universal (SSR)
            if (this.runInsideAngular) {
                this.create();
            }
            else {
                this.zone.runOutsideAngular((/**
                 * @return {?}
                 */
                function () { return _this.create(); }));
            }
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    SortablejsDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        /** @type {?} */
        var optionsChange = changes.sortablejsOptions;
        if (optionsChange && !optionsChange.isFirstChange()) {
            /** @type {?} */
            var previousOptions_1 = optionsChange.previousValue;
            /** @type {?} */
            var currentOptions_1 = optionsChange.currentValue;
            Object.keys(currentOptions_1).forEach((/**
             * @param {?} optionName
             * @return {?}
             */
            function (optionName) {
                if (currentOptions_1[optionName] !== previousOptions_1[optionName]) {
                    // use low-level option setter
                    _this.sortableInstance.option(optionName, _this.options[optionName]);
                }
            }));
        }
    };
    /**
     * @return {?}
     */
    SortablejsDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.sortableInstance) {
            this.sortableInstance.destroy();
        }
    };
    /**
     * @private
     * @return {?}
     */
    SortablejsDirective.prototype.create = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var container = this.sortablejsContainer ? this.element.nativeElement.querySelector(this.sortablejsContainer) : this.element.nativeElement;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.sortableInstance = Sortable.create(container, _this.options);
            _this.sortablejsInit.emit(_this.sortableInstance);
        }), 0);
    };
    /**
     * @private
     * @return {?}
     */
    SortablejsDirective.prototype.getBindings = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.sortablejs) {
            return new SortablejsBindings([]);
        }
        else if (this.sortablejs instanceof SortablejsBindings) {
            return this.sortablejs;
        }
        else {
            return new SortablejsBindings([this.sortablejs]);
        }
    };
    Object.defineProperty(SortablejsDirective.prototype, "options", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return __assign({}, this.optionsWithoutEvents, this.overridenOptions);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SortablejsDirective.prototype, "optionsWithoutEvents", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return __assign({}, (this.globalConfig || {}), (this.sortablejsOptions || {}));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} eventName
     * @param {...?} params
     * @return {?}
     */
    SortablejsDirective.prototype.proxyEvent = /**
     * @private
     * @param {?} eventName
     * @param {...?} params
     * @return {?}
     */
    function (eventName) {
        var _this = this;
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.zone.run((/**
         * @return {?}
         */
        function () {
            var _a;
            if (_this.optionsWithoutEvents && _this.optionsWithoutEvents[eventName]) {
                (_a = _this.optionsWithoutEvents)[eventName].apply(_a, __spread(params));
            }
        }));
    };
    Object.defineProperty(SortablejsDirective.prototype, "isCloning", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this.sortableInstance.options.group.checkPull(this.sortableInstance, this.sortableInstance) === 'clone';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @template T
     * @param {?} item
     * @return {?}
     */
    SortablejsDirective.prototype.clone = /**
     * @private
     * @template T
     * @param {?} item
     * @return {?}
     */
    function (item) {
        // by default pass the item through, no cloning performed
        return (this.sortablejsCloneFunction || ((/**
         * @param {?} subitem
         * @return {?}
         */
        function (subitem) { return subitem; })))(item);
    };
    Object.defineProperty(SortablejsDirective.prototype, "overridenOptions", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            // always intercept standard events but act only in case items are set (bindingEnabled)
            // allows to forget about tracking this.items changes
            return {
                onAdd: (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    _this.service.transfer = (/**
                     * @param {?} items
                     * @return {?}
                     */
                    function (items) {
                        _this.getBindings().injectIntoEvery(event.newIndex, items);
                        _this.proxyEvent('onAdd', event);
                    });
                    _this.proxyEvent('onAddOriginal', event);
                }),
                onRemove: (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    /** @type {?} */
                    var bindings = _this.getBindings();
                    if (bindings.provided) {
                        if (_this.isCloning) {
                            _this.service.transfer(bindings.getFromEvery(event.oldIndex).map((/**
                             * @param {?} item
                             * @return {?}
                             */
                            function (item) { return _this.clone(item); })));
                            // great thanks to https://github.com/tauu
                            // event.item is the original item from the source list which is moved to the target list
                            // event.clone is a clone of the original item and will be added to source list
                            // If bindings are provided, adding the item dom element to the target list causes artifacts
                            // as it interferes with the rendering performed by the angular template.
                            // Therefore we remove it immediately and also move the original item back to the source list.
                            // (event handler may be attached to the original item and not its clone, therefore keeping
                            // the original dom node, circumvents side effects )
                            _this.renderer.removeChild(event.item.parentNode, event.item);
                            _this.renderer.insertBefore(event.clone.parentNode, event.item, event.clone);
                            _this.renderer.removeChild(event.clone.parentNode, event.clone);
                        }
                        else {
                            _this.service.transfer(bindings.extractFromEvery(event.oldIndex));
                        }
                        _this.service.transfer = null;
                    }
                    _this.proxyEvent('onRemove', event);
                }),
                onUpdate: (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    /** @type {?} */
                    var bindings = _this.getBindings();
                    /** @type {?} */
                    var indexes = getIndexesFromEvent(event);
                    bindings.injectIntoEvery(indexes.new, bindings.extractFromEvery(indexes.old));
                    _this.proxyEvent('onUpdate', event);
                }),
            };
        },
        enumerable: true,
        configurable: true
    });
    SortablejsDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[sortablejs]',
                },] }
    ];
    /** @nocollapse */
    SortablejsDirective.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [GLOBALS,] }] },
        { type: SortablejsService },
        { type: ElementRef },
        { type: NgZone },
        { type: Renderer2 }
    ]; };
    SortablejsDirective.propDecorators = {
        sortablejs: [{ type: Input }],
        sortablejsContainer: [{ type: Input }],
        sortablejsOptions: [{ type: Input }],
        sortablejsCloneFunction: [{ type: Input }],
        runInsideAngular: [{ type: Input }],
        sortablejsInit: [{ type: Output }]
    };
    return SortablejsDirective;
}());
if (false) {
    /** @type {?} */
    SortablejsDirective.prototype.sortablejs;
    /** @type {?} */
    SortablejsDirective.prototype.sortablejsContainer;
    /** @type {?} */
    SortablejsDirective.prototype.sortablejsOptions;
    /** @type {?} */
    SortablejsDirective.prototype.sortablejsCloneFunction;
    /**
     * @type {?}
     * @private
     */
    SortablejsDirective.prototype.sortableInstance;
    /** @type {?} */
    SortablejsDirective.prototype.runInsideAngular;
    /** @type {?} */
    SortablejsDirective.prototype.sortablejsInit;
    /**
     * @type {?}
     * @private
     */
    SortablejsDirective.prototype.globalConfig;
    /**
     * @type {?}
     * @private
     */
    SortablejsDirective.prototype.service;
    /**
     * @type {?}
     * @private
     */
    SortablejsDirective.prototype.element;
    /**
     * @type {?}
     * @private
     */
    SortablejsDirective.prototype.zone;
    /**
     * @type {?}
     * @private
     */
    SortablejsDirective.prototype.renderer;
}
/**
 * @record
 */
function SortableEvent() { }
if (false) {
    /** @type {?} */
    SortableEvent.prototype.oldIndex;
    /** @type {?} */
    SortableEvent.prototype.newIndex;
    /** @type {?|undefined} */
    SortableEvent.prototype.oldDraggableIndex;
    /** @type {?|undefined} */
    SortableEvent.prototype.newDraggableIndex;
    /** @type {?} */
    SortableEvent.prototype.item;
    /** @type {?} */
    SortableEvent.prototype.clone;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SortablejsModule = /** @class */ (function () {
    function SortablejsModule() {
    }
    /**
     * @param {?} globalOptions
     * @return {?}
     */
    SortablejsModule.forRoot = /**
     * @param {?} globalOptions
     * @return {?}
     */
    function (globalOptions) {
        return {
            ngModule: SortablejsModule,
            providers: [
                { provide: GLOBALS, useValue: globalOptions },
            ],
        };
    };
    SortablejsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [SortablejsDirective],
                    exports: [SortablejsDirective],
                },] }
    ];
    return SortablejsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { SortablejsDirective, SortablejsModule, GLOBALS as ɵa, SortablejsService as ɵb };
//# sourceMappingURL=ngx-sortablejs.js.map
