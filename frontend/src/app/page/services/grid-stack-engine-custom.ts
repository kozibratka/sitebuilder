import {GridStackEngine, GridStackMoveOpts, GridStackNode, GridStackPosition, Utils} from 'gridstack';

// type OnChangeCB = (nodes: GridStackNode[]) => void;

export class GridStackEngineCustom extends GridStackEngine{

  // protected onChange: OnChangeCB;
  // public moveNode(node: any, o: GridStackMoveOpts): boolean {
  //   if (!node || /*node.locked ||*/ !o) return false;
  //   let wasUndefinedPack: boolean;
  //   if (o.pack === undefined) {
  //     wasUndefinedPack = o.pack = true;
  //   }
  //
  //   // constrain the passed in values and check if we're still changing our node
  //   if (typeof o.x !== 'number') { o.x = node.x; }
  //   if (typeof o.y !== 'number') { o.y = node.y; }
  //   if (typeof o.w !== 'number') { o.w = node.w; }
  //   if (typeof o.h !== 'number') { o.h = node.h; }
  //   let resizing = (node.w !== o.w || node.h !== o.h);
  //   let nn: GridStackNode = Utils.copyPos({}, node, true); // get min/max out first, then opt positions next
  //   Utils.copyPos(nn, o);
  //   nn = this.nodeBoundFix(nn, resizing);
  //   Utils.copyPos(o, nn);
  //
  //   if (Utils.samePos(node, o)) return false;
  //   let prevPos: GridStackPosition = Utils.copyPos({}, node);
  //
  //   // check if we will need to fix collision at our new location
  //   let collides = this.collideAll(node, nn, o.skip);
  //   let needToMove = true;
  //   if (collides.length) {
  //     let activeDrag = node._moving && !o.nested;
  //     // check to make sure we actually collided over 50% surface area while dragging
  //     let collide: any = activeDrag ? this.directionCollideCoverage(node, o, collides) : collides[0];
  //     // if we're enabling creation of sub-grids on the fly, see if we're covering 80% of either one, if we didn't already do that
  //     if (activeDrag && collide && node.grid?.opts?.subGridDynamic && !node.grid._isTemp) {
  //       let over = Utils.areaIntercept(o.rect, collide._rect);
  //       let a1 = Utils.area(o.rect);
  //       let a2 = Utils.area(collide._rect);
  //       let perc = over / (a1 < a2 ? a1 : a2);
  //       if (perc > .8) {
  //         collide.grid.makeSubGrid(collide.el, undefined, node);
  //         collide = undefined;
  //       }
  //     }
  //     if (collide) {
  //       needToMove = !this._fixCollisions(node, nn, collide, o); // check if already moved...
  //     } else {
  //       needToMove = false; // we didn't cover >50% for a move, skip...
  //       if (wasUndefinedPack) delete o.pack;
  //     }
  //   }
  //
  //   // now move (to the original ask vs the collision version which might differ) and repack things
  //   if (needToMove) {
  //     node._dirty = true;
  //     Utils.copyPos(node, nn);
  //   }
  //   if (o.pack) {
  //     (this._packNodes() as GridStackEngineCustom)
  //       ._notify();
  //   }
  //   return !Utils.samePos(node, prevPos); // pack might have moved things back
  // }
  //
  // protected _notify(removedNodes?: GridStackNode[]): GridStackEngine {
  //   if (this.batchMode || !this.onChange) return this;
  //   let dirtyNodes = (removedNodes || []).concat(this.getDirtyNodes());
  //   this.onChange(dirtyNodes);
  //   return this;
  // }
  //
  // protected _fixCollisions(node: any, nn = node, collide?: any, opt: GridStackMoveOpts = {}): boolean {
  //   this.sortNodes(-1); // from last to first, so recursive collision move items in the right order
  //
  //   collide = collide || this.collide(node, nn); // REAL area collide for swap and skip if none...
  //   if (!collide) return false;
  //
  //   // swap check: if we're actively moving in gravity mode, see if we collide with an object the same size
  //   if (node._moving && !opt.nested && !this.float) {
  //     if (this.swap(node, collide)) return true;
  //   }
  //
  //   // during while() collisions MAKE SURE to check entire row so larger items don't leap frog small ones (push them all down starting last in grid)
  //   let area = nn;
  //   if (this._useEntireRowArea(node, nn)) {
  //     area = {x: 0, w: this.column, y: nn.y, h: nn.h};
  //     collide = this.collide(node, area, opt.skip); // force new hit
  //   }
  //
  //   let didMove = false;
  //   let newOpt: GridStackMoveOpts = {nested: true, pack: false};
  //   while (collide = collide || this.collide(node, area, opt.skip)) { // could collide with more than 1 item... so repeat for each
  //     let moved: boolean;
  //     // if colliding with a locked item OR moving down with top gravity (and collide could move up) -> skip past the collide,
  //     // but remember that skip down so we only do this once (and push others otherwise).
  //     if (collide.locked || node._moving && !node._skipDown && nn.y > node.y && !this.float &&
  //       // can take space we had, or before where we're going
  //       (!this.collide(collide, {...collide, y: node.y}, node) || !this.collide(collide, {...collide, y: nn.y - collide.h}, node))) {
  //       node._skipDown = (node._skipDown || nn.y > node.y);
  //       moved = this.moveNode(node, {...nn, y: collide.y + collide.h, ...newOpt});
  //       if (collide.locked && moved) {
  //         Utils.copyPos(nn, node); // moving after lock become our new desired location
  //       } else if (!collide.locked && moved && opt.pack) {
  //         // we moved after and will pack: do it now and keep the original drop location, but past the old collide to see what else we might push way
  //         this._packNodes();
  //         nn.y = collide.y + collide.h;
  //         Utils.copyPos(node, nn);
  //       }
  //       didMove = didMove || moved;
  //     } else {
  //       // move collide down *after* where we will be, ignoring where we are now (don't collide with us)
  //       moved = this.moveNode(collide, {...collide, y: nn.y + nn.h, skip: node, ...newOpt});
  //     }
  //     if (!moved) { return didMove; } // break inf loop if we couldn't move after all (ex: maxRow, fixed)
  //     collide = undefined;
  //   }
  //   return didMove;
  // }
  //
  // protected _packNodes(): GridStackEngine {
  //   if (this.batchMode) { return this; }
  //   this.sortNodes(); // first to last
  //
  //   if (this.float) {
  //     // restore original Y pos
  //     (this.nodes as any[]).forEach(n => {
  //       if (n._updating || n._orig === undefined || n.y === n._orig.y) return;
  //       let newY = n.y;
  //       while (newY > n._orig.y) {
  //         --newY;
  //         let collide = this.collide(n, {x: n.x, y: newY, w: n.w, h: n.h});
  //         if (!collide) {
  //           n._dirty = true;
  //           n.y = newY;
  //         }
  //       }
  //     });
  //   } else {
  //     // top gravity pack
  //     (this.nodes as any[]).forEach((n, i) => {
  //       if (n.locked) return;
  //       while (n.y > 0) {
  //         let newY = i === 0 ? 0 : n.y - 1;
  //         let canBeMoved = i === 0 || !this.collide(n, {x: n.x, y: newY, w: n.w, h: n.h});
  //         if (!canBeMoved) break;
  //         // Note: must be dirty (from last position) for GridStack::OnChange CB to update positions
  //         // and move items back. The user 'change' CB should detect changes from the original
  //         // starting position instead.
  //         n._dirty = (n.y !== newY);
  //         n.y = newY;
  //       }
  //     });
  //   }
  //   return this;
  // }
  protected directionCollideCoverage(node: any, o: GridStackMoveOpts, collides: any[]): GridStackNode {

    if (!o.rect || !node._rect) return;
    let r0 = node._rect; // where started
    let r = {...o.rect}; // where we are

    // update dragged rect to show where it's coming from (above or below, etc...)
    if (r.y > r0.y) {
      r.h += r.y - r0.y;
      r.y = r0.y;
    } else {
      r.h += r0.y - r.y;
    }
    if (r.x > r0.x) {
      r.w += r.x - r0.x;
      r.x = r0.x;
    } else {
      r.w += r0.x - r.x;
    }

    let collide: GridStackNode;
    collides.forEach(n => {
      if (n.locked || !n._rect) return;
      let r2 = n._rect; // overlapping target
      let yOver = Number.MAX_VALUE, xOver = Number.MAX_VALUE, overMax = 0.1; // need >50%
      // depending on which side we started from, compute the overlap % of coverage
      // (ex: from above/below we only compute the max horizontal line coverage)
      if (r0.y < r2.y) { // from above
        yOver = ((r.y + r.h) - r2.y) / r2.h;
      } else if (r0.y+r0.h > r2.y+r2.h) { // from below
        yOver = ((r2.y + r2.h) - r.y) / r2.h;
      }
      if (r0.x < r2.x) { // from the left
        xOver = ((r.x + r.w) - r2.x) / r2.w;
      } else if (r0.x+r0.w > r2.x+r2.w) { // from the right
        xOver = ((r2.x + r2.w) - r.x) / r2.w;
      }
      let over = Math.min(xOver, yOver);
      if (over > overMax) {
        overMax = over;
        collide = n;
      }
    });
    o.collide = collide; // save it so we don't have to find it again
    return collide;
  }
}
