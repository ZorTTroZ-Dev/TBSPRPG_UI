export class GameLayout {
    windowWidth: number;
    windowHeight: number;
    contentX: number;
    contentY: number;
    contentWidth: number;
    contentHeight: number;
    verbsX: number;
    verbsY: number;
    verbsWidth: number;
    verbsHeight: number;
    inventoryX: number;
    inventoryY: number;
    inventoryWidth: number;
    inventoryHeight: number;
    movementX: number;
    movementY: number;
    movementWidth: number;
    movementHeight: number;

    updateValues(newWidth : number, newHeight: number) : void {
        this.windowWidth = newWidth;
        this.windowHeight = newHeight;

        //we're going to use the golden ratio bunch
        var goldenRatio : number = 1.61;

        var bottomBarHeight : number = this.windowHeight / goldenRatio / goldenRatio / goldenRatio;
        var movementWidth : number = this.windowWidth / goldenRatio / goldenRatio / goldenRatio;

        //compute content location
        this.contentX = this.contentY = 0;
        this.contentWidth = this.windowWidth;
        this.contentHeight = this.windowHeight - bottomBarHeight;

        //compute verb location
        this.verbsX = 0;
        this.verbsY = this.contentHeight;
        this.verbsHeight = bottomBarHeight;
        this.verbsWidth = this.windowWidth - 2 * movementWidth;

        //compute inventory location
        this.inventoryX = this.verbsWidth;
        this.inventoryY = this.contentHeight;
        this.inventoryWidth = movementWidth;
        this.inventoryHeight = bottomBarHeight;

        //compute movement location
        this.movementX = this.verbsWidth + this.inventoryWidth;
        this.movementY = this.contentHeight;
        this.movementWidth = movementWidth;
        this.movementHeight = bottomBarHeight;
    }
};