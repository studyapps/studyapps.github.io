class CustomExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.tempoValue = 120; // 初期値
        this.temponoteValue = 1/4; // 初期値
        this.noteValue = 1/4; // 初期値
        this.restValue = 1/4; // 初期値
        this.periodValue = 60 / this.tempoValue / this.temponoteValue;
        this.scaleValue = 60;
    }

    getInfo() {
        return {
            id: 'customExtension',
            name: 'toio MUSIC',
            color1: '#000000', // ブロックのメインカラー
            color2: '#000000', // ブロックの枠線や影の色
            blocks: [
                {
                    opcode: 'setPeriod',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'テンポ [NOTE] = [TEMPO] に設定',
                    arguments: {
                        NOTE:{
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: this.temponoteValue, // 初期値
                            menu: 'noteMenu'
                        },
                        TEMPO:{
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: this.tempoValue, // 初期値
                        }  
                    }
                },
                {
                    opcode: 'setTempo',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'テンポ'
                },
                {
                    opcode: 'chooseNote',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[NOTE]',
                    arguments: {
                        NOTE: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: this.noteValue, // 初期値
                            menu: 'noteMenu'
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
                            defaultValue: this.restValue, // 初期値
                            menu: 'restMenu'
                        }
                    }
                },
                {
                    opcode: 'chooseScale',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[SCALE]',
                    arguments: {
                        SCALE: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: this.scaleValue, // 初期値
                            menu: 'scaleMenu'
                        }
                    }
                }
            ],
            menus: {
                noteMenu: [
                    { text: '𝅝', value: 1},
                    { text: '𝅗𝅥', value: 1/2},
                    { text: '𝅘𝅥', value: 1/4},
                    { text: '𝅘𝅥𝅮', value: 1/8},
                    { text: '𝅘𝅥𝅯', value: 1/16},
                    { text: '𝅘𝅥𝅰', value: 1/32},
                    { text: '𝅘𝅥𝅱', value: 1/64},
                    { text: '𝅘𝅥𝅲', value: 1/128}
                ],
                restMenu: [
                    { text: '𝄻', value: 1},
                    { text: '𝄼', value: 1/2},
                    { text: '𝄽', value: 1/4},
                    { text: '𝄾', value: 1/8},
                    { text: '𝄿', value: 1/16},
                    { text: '𝅀', value: 1/32},
                    { text: '𝅁', value: 1/64},
                    { text: '𝅂', value: 1/128} 
                ],
                scaleMenu: [
                    {text: 'ド', value: 60},
                    {text: 'レ', value: 62},
                    {text: 'ミ', value: 64},
                    {text: 'ファ', value: 65},
                    {text: 'ソ', value: 67},
                    {text: 'ラ', value: 69},
                    {text: 'シ', value: 71},
                    {text: 'ド\'', value: 72}
                ]
            }
        };
    }

    setTempo() {
        return this.tempoValue;
    }
    chooseNote(args) {
        this.noteValue = parseFloat(args.NOTE);
        return this.noteValue * this.periodValue;
    }
    chooseRest(args) {
        this.restValue = parseFloat(args.REST);
        return this.restValue * this.periodValue;
    }
    chooseScale(args) {
        this.restValue = parseInt(args.SCALE,10);
        return this.scaleValue;
    }
    setPeriod(args) {
        this.periodValue = 60 / parseFloat(args.TEMPO) / parseFloat(args.NOTE);
    }
    
}

Scratch.extensions.register(new CustomExtension());