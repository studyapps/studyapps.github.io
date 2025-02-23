class CustomExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.noteValue = 4; // 初期値
        this.restValue = 4; // 初期値
        this.tempoValue = 80; // 初期値
        this.temponoteValue = 4; // 初期値
        this.speedValue = 80;
        this.scaleValues = 60;
    }

    getInfo() {
        return {
            id: 'customExtension',
            name: 'MUSIC',
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
                            menu: 'noteMenu'
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
                            defaultValue: this.restValue,
                            menu: 'restMenu'
                        }
                    }
                },
                {
                    opcode: 'getCValue',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'けブロック (A × B)'
                }
            ],
            menus: {
                noteMenu: [
                    { text: '𝅝', value: 1},
                    { text: '𝅗𝅥', value: 2},
                    { text: '𝅘𝅥', value: 4},
                    { text: '𝅘𝅥𝅮', value: 8},
                    { text: '𝅘𝅥𝅯', value: 16},
                    { text: '𝅘𝅥𝅰', value: 32},
                    { text: '𝅘𝅥𝅱', value: 64},
                    { text: '𝅘𝅥𝅲', value: 128}
                ],
                restMenu: [
                    { text: '𝄻', value: 1},
                    { text: '𝄼', value: 2},
                    { text: '𝄽', value: 4},
                    { text: '𝄾', value: 8},
                    { text: '𝄿', value: 16},
                    { text: '𝅀', value: 32},
                    { text: '𝅁', value: 64},
                    { text: '𝅂', value: 128} 
                ],
                scaleMenu: [
                    {text: 'ド', value: 60},
                    {text: 'レ', valuevalue: 62},
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

    getCValue() {
        return this.noteValue;
    }

    chooseNote(args) {
        this.noteValue = args.NOTE;
        return this.noteValue;
    }
    chooseRest(args) {
        this.restValue = args.REST;
        return this.restValue;
    }

    setSpeed(args) {
        
    }
    
}

Scratch.extensions.register(new CustomExtension());