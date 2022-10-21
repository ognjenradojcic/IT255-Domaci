import { Directive, DoCheck, Input, IterableDiffer, IterableDiffers, TemplateRef, ViewContainerRef, ViewRef } from '@angular/core';

@Directive({
  selector: '[ngRoomFor]'
})
export class NgRoomForDirective implements DoCheck {
  private items: any;
  private differ: IterableDiffer<any>;
  private views: Map<any, ViewRef> = new Map<any, ViewRef>();
  private singleView: ViewRef;

  constructor(private viewContainer: ViewContainerRef, private template: TemplateRef<any>, private differs: IterableDiffers) { }

  @Input()
  set ngRoomForOf(items: any) {
    this.items = items;
    if (this.items && !this.differ) {
      this.differ = this.differs.find(items).create();
    }
  }

  ngDoCheck(): void {
    if (this.differ) {
      const changes = this.differ.diff(this.items);
      if (changes) {
        changes.forEachAddedItem(change => {
          const view = this.viewContainer.createEmbeddedView(
            this.template,
            { $implicit: change.item }
          );
          this.views.set(change.item, view);
        });
        changes.forEachRemovedItem(change => {
          const view = this.views.get(change.item) ?? this.singleView;
          const idx = this.viewContainer.indexOf(view) ;
          this.viewContainer.remove(idx);
          this.views.delete(change.item);
        });
      }
    }
  }
}

