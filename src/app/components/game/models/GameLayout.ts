export class GameLayout {
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

        //we're going to use the golden ratio bunch
        var goldenRatio : number = 1.61;

        var bottomBarHeight : number = newHeight / goldenRatio / goldenRatio / goldenRatio;
        var movementWidth : number = newWidth / goldenRatio / goldenRatio / goldenRatio;

        //compute content location
        this.contentX = this.contentY = 0;
        this.contentWidth = newWidth;
        this.contentHeight = newHeight - bottomBarHeight;

        //compute verb location
        this.verbsX = 0;
        this.verbsY = this.contentHeight;
        this.verbsHeight = bottomBarHeight;
        this.verbsWidth = newWidth - 2 * movementWidth;

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