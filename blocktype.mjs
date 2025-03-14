class CustomExtension {
    constructor(c) {
        this.runtime = c, this.server = new pa();
        this.block = ''; 
        this.id = ''; 

    //    const h = new URLSearchParams(window.location.search),
    //    b = h.get("block") ?? "trial"
    //    console.log("Block Type:", b),
    //    this.block = b,
    //    this.isEnabledPacketCapture = !1,
    //   this.lastSentMessage = null,
    //    this.numOfSentMessages = 0,
    //    this.server.on("sent", (O) => {
    //      this.lastSentMessage = O, this.numOfSentMessages += 1, this.runtime.startHats(ot + "_whenSentMessage");
    //    }), this.lastReceivedMessage = null, this.server.on("received", (O) => {
    //      this.checkNumOfSentMessages() && (this.isEnabledPacketCapture || (this.lastReceivedMessage = O, this.runtime.startHats(ot + "_whenReceivedMessage")));
    //    }), this.server.on("packet", (O) => {
    //      this.checkNumOfSentMessages() && this.isEnabledPacketCapture && (this.lastReceivedMessage = O, this.runtime.startHats(ot + "_whenReceivedMessage"));
    //    }), this.lastSystemMessage = {
    //      id: "bidirectionalComm.system.notConnected",
    //      default: "接続してください"
    //    }, c.formatMessage && (_ = c.formatMessage);
    }

    getInfo() {
        var c = {
            id: 'BlockType',
            name: 'URL Extension',
            color1: "#A6A6A6",
            blocks: [],
            menus: {
                blockTypeMenu: {
                    acceptReporters: true,
                    items: ['Trial','Basic']
                }
            }
        };
        return c.blocks.push(
            {
                opcode: 'setParameters',
                blockType: Scratch.BlockType.COMMAND,
                text: 'Block =  [TYPE] ID = [ID]',
                arguments: {
                    TYPE: {
                        type: Scratch.ArgumentType.STRING,
                        menu: 'blockTypeMenu',
                        defaultValue: this.block || 'Trial'
                    },
                    ID: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: this.id || "お客様ID"
                    }
                }
            },
            {
                opcode: 'getID',
                blockType: Scratch.BlockType.REPORTER,
                text: 'ID'
            },
            {
                opcode: 'getBlockType',
                blockType: Scratch.BlockType.REPORTER,
                text: 'Block'
            },
            {
                opcode: 'getTrialBlock',
                blockType: Scratch.BlockType.COMMAND,
                text: 'Trialライセンスで表示されるブロック'
            }
        ), 
        this.shouldShowBasicBlocks() && c.blocks.push(
            {
                opcode: 'getBasicBlock',
                blockType: Scratch.BlockType.COMMAND,
                text: 'Basicライセンスで表示されるブロック'
            }
        ), c;
    }

    setParameters(args){
        this.block = args.TYPE;
        this.id = args.ID;
    }
    getBlockType() {
        return this.block;
    }
    getID() {
        return this.id;
    }
    getBasicBlock() {
    }
    getTrialBlock() {
    }
    shouldShowBasicBlocks() {
        return this.block == "Basic";
    }
}

Scratch.extensions.register(new CustomExtension());