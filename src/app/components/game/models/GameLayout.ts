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

    //     'top': '0px',
    //   'left': '0px',
    //   'width': this.windowWidth + 'px',
    //   'height': this.windowHeight - (this.windowHeight / 1.61 / 1.61 / 1.61) + 'px',

        this.contentX = this.contentY = 0;
        this.contentWidth = this.windowWidth;
              
    }
};