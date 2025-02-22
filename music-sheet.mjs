class CustomExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.noteValue = '𝅘𝅥'; // 初期値
        this.restValue = 4; // 初期値
        this.tempoValue = 80; // 初期値
        this.temponoteValue = 4; // 初期値
        this.speedValue;
    }

    getInfo() {
        return {
            id: 'customExtension',
            name: '楽譜',
            color1: '#000000', // ブロックのメインカラー
            color2: '#000000', // ブロックの枠線や影の色
            blocks: [
                {
                    opcode: 'setSpeed',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'テンポ [NOTE] = [TEMPO] に設定',
                    arguments: {
                        NOTE:{
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: this.temponoteValue, // 初期値
                            menu: 'Note'
                        },
                        TEMPO:{
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: this.tempoValue // 初期値
                        }  
                    }
                },
                {
                    opcode: 'chooseNote',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[NOTE]',
                    arguments: {
                        NOTE: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: this.noteValue,
                            menu: 'note'
                        }
                    }
                },
                {
                    opcode: 'chooseRest',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[REST]',
                    arguments: {
                        REST: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: this.restValue,
                            menu: 'rest'
                        }
                    }
                },
                {
                    opcode: 'getCValue',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'きブロック (A × B)'
                }
            ],
            menus: {
                note: [
                    { text: '𝅝', value: 1},
                    { text: '𝅗𝅥', value: 2},
                    { text: '𝅘𝅥', value: 4},
                    { text: '𝅘𝅥𝅮', value: 8},
                    { text: '𝅘𝅥𝅯', value: 16},
                    { text: '𝅘𝅥𝅰', value: 32},
                    { text: '𝅘𝅥𝅱', value: 64},
                    { text: '𝅘𝅥𝅲', value: 128}
                ],
                rest: [
                    { text: '𝄻', value: 1},
                    { text: '𝄼', value: 2},
                    { text: '𝄽', value: 4},
                    { text: '𝄾', value: 8},
                    { text: '𝄿', value: 16},
                    { text: '𝅀', value: 32},
                    { text: '𝅁', value: 64},
                    { text: '𝅂', value: 128} 
                ]
            }
        };
    }

    getCValue() {
        return this.aValue * this.bValue;
    }

    chooseNote(args) {
        this.noteValue = args.VALUE;
        return this.noteValue;
    }
    chooseRest(args) {
        this.restValue = args.VALUE;
        return this.restValue;
    }

    setSpeed(args) {
        return this.noteValue;
    }


}

Scratch.extensions.register(new CustomExtension());