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
const GLOBALS = new InjectionToken('Global config for sortablejs');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SortablejsBinding {
    /**
     * @param {?} target
     */
    constructor(target) {
        this.target = target;
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    insert(index, item) {
        if (this.isFormArray) {
            this.target.insert(index, item);
        }
        else {
            this.target.splice(index, 0, item);
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    get(index) {
        return this.isFormArray ? this.target.at(index) : this.target[index];
    }
    /**
     * @param {?} index
     * @return {?}
     */
    remove(index) {
        /** @type {?} */
        let item;
        if (this.isFormArray) {
            item = this.target.at(index);
            this.target.removeAt(index);
        }
        else {
            item = this.target.splice(index, 1)[0];
        }
        return item;
    }
    // we need this to identify that the target is a FormArray
    // we don't want to have a dependency on @angular/forms just for that
    /**
     * @private
     * @return {?}
     */
    get isFormArray() {
        // just checking for random FormArray methods not available on a standard array
        return !!this.target.at && !!this.target.insert && !!this.target.reset;
    }
}
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
class SortablejsBindings {
    /**
     * @param {?} bindingTargets
     */
    constructor(bindingTargets) {
        this.bindings = bindingTargets.map((/**
         * @param {?} target
         * @return {?}
         */
        target => new SortablejsBinding(target)));
    }
    /**
     * @param {?} index
     * @param {?} items
     * @return {?}
     */
    injectIntoEvery(index, items) {
        this.bindings.forEach((/**
         * @param {?} b
         * @param {?} i
         * @return {?}
         */
        (b, i) => b.insert(index, items[i])));
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getFromEvery(index) {
        return this.bindings.map((/**
         * @param {?} b
         * @return {?}
         */
        b => b.get(index)));
    }
    /**
     * @param {?} index
     * @return {?}
     */
    extractFromEvery(index) {
        return this.bindings.map((/**
         * @param {?} b
         * @return {?}
         */
        b => b.remove(index)));
    }
    /**
     * @return {?}
     */
    get provided() {
        return !!this.bindings.length;
    }
}
if (false) {
    /** @type {?} */
    SortablejsBindings.prototype.bindings;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SortablejsService {
}
SortablejsService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
/** @nocollapse */ SortablejsService.ngInjectableDef = ɵɵdefineInjectable({ factory: function SortablejsService_Factory() { return new SortablejsService(); }, token: SortablejsService, providedIn: "root" });
if (false) {
    /** @type {?} */
    SortablejsService.prototype.transfer;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const getIndexesFromEvent = (/**
 * @param {?} event
 * @return {?}
 */
(event) => {
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
const ɵ0 = getIndexesFromEvent;
class SortablejsDirective {
    /**
     * @param {?} globalConfig
     * @param {?} service
     * @param {?} element
     * @param {?} zone
     * @param {?} renderer
     */
    constructor(globalConfig, service, element, zone, renderer) {
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
    ngOnInit() {
        if (Sortable && Sortable.create) { // Sortable does not exist in angular universal (SSR)
            if (this.runInsideAngular) {
                this.create();
            }
            else {
                this.zone.runOutsideAngular((/**
                 * @return {?}
                 */
                () => this.create()));
            }
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const optionsChange = changes.sortablejsOptions;
        if (optionsChange && !optionsChange.isFirstChange()) {
            /** @type {?} */
            const previousOptions = optionsChange.previousValue;
            /** @type {?} */
            const currentOptions = optionsChange.currentValue;
            Object.keys(currentOptions).forEach((/**
             * @param {?} optionName
             * @return {?}
             */
            optionName => {
                if (currentOptions[optionName] !== previousOptions[optionName]) {
                    // use low-level option setter
                    this.sortableInstance.option(optionName, this.options[optionName]);
                }
            }));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.sortableInstance) {
            this.sortableInstance.destroy();
        }
    }
    /**
     * @private
     * @return {?}
     */
    create() {
        /** @type {?} */
        const container = this.sortablejsContainer ? this.element.nativeElement.querySelector(this.sortablejsContainer) : this.element.nativeElement;
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.sortableInstance = Sortable.create(container, this.options);
            this.sortablejsInit.emit(this.sortableInstance);
        }), 0);
    }
    /**
     * @private
     * @return {?}
     */
    getBindings() {
        if (!this.sortablejs) {
            return new SortablejsBindings([]);
        }
        else if (this.sortablejs instanceof SortablejsBindings) {
            return this.sortablejs;
        }
        else {
            return new SortablejsBindings([this.sortablejs]);
        }
    }
    /**
     * @private
     * @return {?}
     */
    get options() {
        return Object.assign({}, this.optionsWithoutEvents, this.overridenOptions);
    }
    /**
     * @private
     * @return {?}
     */
    get optionsWithoutEvents() {
        return Object.assign({}, (this.globalConfig || {}), (this.sortablejsOptions || {}));
    }
    /**
     * @private
     * @param {?} eventName
     * @param {...?} params
     * @return {?}
     */
    proxyEvent(eventName, ...params) {
        this.zone.run((/**
         * @return {?}
         */
        () => {
            if (this.optionsWithoutEvents && this.optionsWithoutEvents[eventName]) {
                this.optionsWithoutEvents[eventName](...params);
            }
        }));
    }
    /**
     * @private
     * @return {?}
     */
    get isCloning() {
        return this.sortableInstance.options.group.checkPull(this.sortableInstance, this.sortableInstance) === 'clone';
    }
    /**
     * @private
     * @template T
     * @param {?} item
     * @return {?}
     */
    clone(item) {
        // by default pass the item through, no cloning performed
        return (this.sortablejsCloneFunction || ((/**
         * @param {?} subitem
         * @return {?}
         */
        subitem => subitem)))(item);
    }
    /**
     * @private
     * @return {?}
     */
    get overridenOptions() {
        // always intercept standard events but act only in case items are set (bindingEnabled)
        // allows to forget about tracking this.items changes
        return {
            onAdd: (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                this.service.transfer = (/**
                 * @param {?} items
                 * @return {?}
                 */
                (items) => {
                    this.getBindings().injectIntoEvery(event.newIndex, items);
                    this.proxyEvent('onAdd', event);
                });
                this.proxyEvent('onAddOriginal', event);
            }),
            onRemove: (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                /** @type {?} */
                const bindings = this.getBindings();
                if (bindings.provided) {
                    if (this.isCloning) {
                        this.service.transfer(bindings.getFromEvery(event.oldIndex).map((/**
                         * @param {?} item
                         * @return {?}
                         */
                        item => this.clone(item))));
                        // great thanks to https://github.com/tauu
                        // event.item is the original item from the source list which is moved to the target list
                        // event.clone is a clone of the original item and will be added to source list
                        // If bindings are provided, adding the item dom element to the target list causes artifacts
                        // as it interferes with the rendering performed by the angular template.
                        // Therefore we remove it immediately and also move the original item back to the source list.
                        // (event handler may be attached to the original item and not its clone, therefore keeping
                        // the original dom node, circumvents side effects )
                        this.renderer.removeChild(event.item.parentNode, event.item);
                        this.renderer.insertBefore(event.clone.parentNode, event.item, event.clone);
                        this.renderer.removeChild(event.clone.parentNode, event.clone);
                    }
                    else {
                        this.service.transfer(bindings.extractFromEvery(event.oldIndex));
                    }
                    this.service.transfer = null;
                }
                this.proxyEvent('onRemove', event);
            }),
            onUpdate: (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                /** @type {?} */
                const bindings = this.getBindings();
                /** @type {?} */
                const indexes = getIndexesFromEvent(event);
                bindings.injectIntoEvery(indexes.new, bindings.extractFromEvery(indexes.old));
                this.proxyEvent('onUpdate', event);
            }),
        };
    }
}
SortablejsDirective.decorators = [
    { type: Directive, args: [{
                selector: '[sortablejs]',
            },] }
];
/** @nocollapse */
SortablejsDirective.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [GLOBALS,] }] },
    { type: SortablejsService },
    { type: ElementRef },
    { type: NgZone },
    { type: Renderer2 }
];
SortablejsDirective.propDecorators = {
    sortablejs: [{ type: Input }],
    sortablejsContainer: [{ type: Input }],
    sortablejsOptions: [{ type: Input }],
    sortablejsCloneFunction: [{ type: Input }],
    runInsideAngular: [{ type: Input }],
    sortablejsInit: [{ type: Output }]
};
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
class SortablejsModule {
    /**
     * @param {?} globalOptions
     * @return {?}
     */
    static forRoot(globalOptions) {
        return {
            ngModule: SortablejsModule,
            providers: [
                { provide: GLOBALS, useValue: globalOptions },
            ],
        };
    }
}
SortablejsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [SortablejsDirective],
                exports: [SortablejsDirective],
            },] }
];

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
