export class XYPoint {
    private readonly xCor: number;
    private readonly yCor: number;

    constructor(x, y) {
        this.xCor = x;
        this.yCor = y;
    }

    public x(): number {
        return this.xCor;
    }

    public y(): number {
        return this.yCor;
    }
}

/**
 * This class contains some methods ported over from Colors API.
 * Author: Bryan Johnson
 * https://github.com/bjohnso5/hue-hacking
 * Copyright (c) 2013 Bryan Johnson; Licensed MIT
 */
export class Colors {

    private static Red: XYPoint = new XYPoint(0.675, 0.322);
    private static Lime: XYPoint = new XYPoint(0.4091, 0.518);
    private static Blue: XYPoint = new XYPoint(0.167, 0.04);

    public static convertRGBtoXY(red: number, green: number, blue: number): number[] {
        return Colors.rgbToCIE1931(red, green, blue);
    }

    private static rgbToCIE1931(red: number, green: number, blue: number): number[] {
        let point = Colors.getXYPointFromRGB(red, green, blue);
        return [point.x(), point.y()];
    }

    private static getXYPointFromRGB(red: number, green: number, blue: number): XYPoint {

        let r = (red > 0.04045) ? Math.pow((red + 0.055) / (1.0 + 0.055), 2.4) : (red / 12.92),
            g = (green > 0.04045) ? Math.pow((green + 0.055) / (1.0 + 0.055), 2.4) : (green / 12.92),
            b = (blue > 0.04045) ? Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4) : (blue / 12.92),

            X = r * 0.4360747 + g * 0.3850649 + b * 0.0930804,
            Y = r * 0.2225045 + g * 0.7168786 + b * 0.0406169,
            Z = r * 0.0139322 + g * 0.0971045 + b * 0.7141733,

            cx = X / (X + Y + Z),
            cy = Y / (X + Y + Z);

        cx = isNaN(cx) ? 0.0 : cx;
        cy = isNaN(cy) ? 0.0 : cy;

        //Check if the given XY value is within the colourreach of our lamps.
        let xyPoint = new XYPoint(cx, cy),
            inReachOfLamps = Colors.checkPointInLampsReach(xyPoint);

        if (!inReachOfLamps) {
            let closestPoint = Colors.getClosestPointToPoint(xyPoint);
            cx = closestPoint.x();
            cy = closestPoint.y();
        }

        return new XYPoint(cx, cy);
    }

    /**
     * Find the closest point on a line. This point will be reproducible by a Hue lamp.
     *
     * @param {XYPoint} A The point where the line starts.
     * @param {XYPoint} B The point where the line ends.
     * @param {XYPoint} P The point which is close to the line.
     * @return {XYPoint} A point that is on the line, and closest to the XYPoint provided.
     */
    private static getClosestPointToLine(A: XYPoint, B: XYPoint, P: XYPoint): XYPoint {
        let AP = new XYPoint(P.x() - A.x(), P.y() - A.y());
        let AB = new XYPoint(B.x() - A.x(), B.y() - A.y());
        let ab2 = AB.x() * AB.x() + AB.y() * AB.y();
        let ap_ab = AP.x() * AB.x() + AP.y() * AB.y();
        let t = ap_ab / ab2;

        if (t < 0.0) {
            t = 0.0;
        } else if (t > 1.0) {
            t = 1.0;
        }

        return new XYPoint(A.x() + AB.x() * t, A.y() + AB.y() * t);
    }

    private static getClosestPointToPoint(xyPoint: XYPoint) {
        // Color is unreproducible, find the closest point on each line in the CIE 1931 'triangle'.
        let pAB = Colors.getClosestPointToLine(this.Red, this.Lime, xyPoint);
        let pAC = Colors.getClosestPointToLine(this.Blue, this.Red, xyPoint);
        let pBC = Colors.getClosestPointToLine(this.Lime, this.Blue, xyPoint);

            // Get the distances per point and see which point is closer to our Point.
        let dAB = Colors.getDistanceBetweenTwoPoints(xyPoint, pAB);
        let dAC = Colors.getDistanceBetweenTwoPoints(xyPoint, pAC);
        let dBC = Colors.getDistanceBetweenTwoPoints(xyPoint, pBC);

        let lowest = dAB;
        let closestPoint = pAB;

        if (dAC < lowest) {
            lowest = dAC;
            closestPoint = pAC;
        }

        if (dBC < lowest) {
            lowest = dBC;
            closestPoint = pBC;
        }

        return closestPoint;
    }

    /**
     * Returns the cross product of two XYPoints.
     *
     * @param {XYPoint} p1.
     * @param {XYPoint} p2.
     * @return {Number} Cross-product of the two XYPoints provided.
     */
    private static crossProduct(p1: XYPoint, p2: XYPoint): number {
        return (p1.x() * p2.y() - p1.y() * p2.x());
    }

    /**
     * Check if the provided XYPoint can be recreated by a Hue lamp.
     *
     * @param {XYPoint} p.
     * @return {boolean} Flag indicating if the point is within reproducible range.
     */
    private static checkPointInLampsReach(p: XYPoint): boolean {
        let v1 = new XYPoint(this.Lime.x() - this.Red.x(), this.Lime.y() - this.Red.y());
        let v2 = new XYPoint(this.Blue.x() - this.Red.x(), this.Blue.y() - this.Red.y());

        let q = new XYPoint(p.x() - this.Red.x(), p.y() - this.Red.y());

        let s = Colors.crossProduct(q, v2) / Colors.crossProduct(v1, v2);
        let t = Colors.crossProduct(v1, q) / Colors.crossProduct(v1, v2);

        return (s >= 0.0) && (t >= 0.0) && (s + t <= 1.0);
    }

    /**
     * Returns the distance between two XYPoints.
     *
     * @param {XYPoint} one The first point.
     * @param {XYPoint} two The second point.
     * @return {Number} The distance between points one and two.
     */
    private static getDistanceBetweenTwoPoints(one: XYPoint, two: XYPoint): number {
        let dx = one.x() - two.x(); // horizontal difference
        let dy = one.y() - two.y(); // vertical difference

        return Math.sqrt(dx * dx + dy * dy);
    }
}
