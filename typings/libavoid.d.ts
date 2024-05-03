declare module "libavoid-js";

declare interface Point {
  new (x: number, y: number): Point;
  x: number;
  y: number;
}

declare interface HyperedgeNewAndDeletedObjects {
  get_newJunctions(index: number): JunctionRef;
  numberOfNewJunctions: number;
  get_deletedJunctions(index: number): JunctionRef;
  numberOfDeletedJunctions: number;
  get_newConnectors(index: number): ConnRef;
  numberOfNewConnectors: number;
  get_deletedConnectors(index: number): ConnRef;
  numberOfDeletedConnectors: number;
  get_changedConnectors(index: number): ConnRef;
  numberOfChangedConnectors: number;
}

declare interface HyperedgeRerouter {
  count(): number;
  registerHyperedgeForRerouting(junction: JunctionRef): number;
  newAndDeletedObjects(index: number): HyperedgeNewAndDeletedObjects;
}

declare interface Router {
  new (flags: number): Router;

  processTransaction(): void;
  printInfo(): void;
  deleteConnector(connRef: ConnRef): void;

  moveShape(shape: ShapeRef, newPolygon: Polygon);
  moveShape(shape: ShapeRef, xDiff: number, yDiff: number);
  moveJunction(junction: JunctionRef, point: Point);
  moveJunction(junction: JunctionRef, xDiff: number, yDiff: number);
  deleteShape(shape: ShapeRef);
  deleteJunction(junction: JunctionRef);
  setRoutingParameter(parameter: number, value: number): void;
  setRoutingOption(option: number, value: boolean): void;

  hyperedgeRerouter(): HyperedgeRerouter;
  newAndDeletedObjectsFromHyperedgeImprovement(): HyperedgeNewAndDeletedObjects;
}

declare interface PolyLine {
  size(): number;
  get_ps(index: number): Point;
}

declare interface ConnEnd {
  new (point: Point): ConnEnd;
  new (shapeRef: ShapeRef, classId: number): ConnEnd;
  createConnEndFromJunctionRef(
    JunctionRef: JunctionRef,
    classId: number
  ): ConnEnd;
}

declare interface ShapeConnectionPin {
  new (
    shapeRef: ShapeRef,
    portId: number,
    xOffset: number,
    yOffset: number,
    proportional: boolean,
    insideOffset: number,
    visDirs: number | undefined
  ): ShapeConnectionPin;

  new (
    shapeRef: ShapeRef,
    portId: number,
    xOffset: number,
    yOffset: number,
    proportional: boolean,
    insideOffset: number
  ): ShapeConnectionPin;

  new (
    junctionRef: JunctionRef,
    portId: number,
    visDirs: number
  ): ShapeConnectionPin;

  updateRelativePosition(point: Point): void;
  updateVisibility(visDirs: number): void;
  setExclusive(isExclusive: boolean): void;
  isExclusive(): boolean;
  setConnectionCost(cost: number): void;
  position(): Point;
}

declare interface ConnRef {
  new (router: Router, srcConnEnd: ConnEnd, dstConnEnd: ConnEnd): ConnRef;

  id(): number;
  displayRoute(): PolyLine;
  setSourceEndpoint(srcPoint: ConnEnd): void;
  setDestEndpoint(dstPoint: ConnEnd): void;
  getSourceEndpoint(): ConnEnd;
  getDestEndpoint(): ConnEnd;
  setRoutingType(type: number): void;
  setCallback(callback: (connRef: ConnRef) => void, connRef: ConnRef): void;

  setHateCrossings(value: boolean): void;
  doesHateCrossings(): boolean;
}

declare interface JunctionRef extends Obstacle {
  new (router: Router, point: Point, id?: number): JunctionRef;

  position(): Point;
  setPositionFixed(fixed: boolean): void;
  positionFixed(): boolean;
  recommendedPosition(): Point;
}

declare interface Polygon {}

declare interface Rectangle extends Polygon {
  new (centre: Point, width: number, height: number): Rectangle;
  new (topLeft: Point, bottomRight: Point): Rectangle;
}

declare interface Obstacle {
  id(): number;
  polygon(): Polygon;
  router(): Router;
  position(): Point;

  setNewPoly(polygon: Polygon): void;
}

declare interface ShapeRef extends Obstacle {
  new (router: Router, shapePoly: Polygon): ShapeRef;
  transformConnectionPinPositions(type: number): void;
}

export interface Avoid {
  [x: string]: any;
  PolyLineRouting: number;
  OrthogonalRouting: number;

  ConnEnd: ConnEnd;
  ConnRef: ConnRef;
  Point: Point;
  Rectangle: Rectangle;
  Router: Router;
  Obstacle: Obstacle;
  ShapeRef: ShapeRef;
  JunctionRef: JunctionRef;
  ShapeConnectionPin: ShapeConnectionPin;

  destroy(obj: any): void;
}

export namespace AvoidLib {
  const avoidLib: Avoid | null;
  function load(filePath?: string): Promise<void>;
  function getInstance(): Avoid;
}
