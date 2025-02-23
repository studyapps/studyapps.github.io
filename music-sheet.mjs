class CustomExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.noteValue = '𝅘𝅥'; // 初期値
        this.restValue = 4; // 初期値
        this.tempoValue = 4; // 初期値
        this.temponoteValue = 4; // 初期値
        this.speedValue = 80;
        this.scaleValue = 60;
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
                    opcode: 'chooseScale',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[SCALE]',
                    arguments: {
                        SCALE: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: this.scaleValue,
                            menu: 'scaleMenu'
                        }
                    }
                }
            ],
            menus: {
                noteMenu: [
                    { text: '𝅝', value: 1 * this.tempoValue},
                    { text: '𝅗𝅥', value: 1/2 * this.tempoValue},
                    { text: '𝅘𝅥', value: 1/4 * this.tempoValue},
                    { text: '𝅘𝅥𝅮', value: 1/8 * this.tempoValue},
                    { text: '𝅘𝅥𝅯', value: 1/16 * this.tempoValue},
                    { text: '𝅘𝅥𝅰', value: 1/32 * this.tempoValue},
                    { text: '𝅘𝅥𝅱', value: 1/64 * this.tempoValue},
                    { text: '𝅘𝅥𝅲', value: 1/128 * this.tempoValue}
                ],
                restMenu: [
                    { text: '𝄻', value: 1 * this.tempoValue},
                    { text: '𝄼', value: 1/2 * this.tempoValue},
                    { text: '𝄽', value: 1/4 * this.tempoValue},
                    { text: '𝄾', value: 1/8 * this.tempoValue},
                    { text: '𝄿', value: 1/16 * this.tempoValue},
                    { text: '𝅀', value: 1/32 * this.tempoValue},
                    { text: '𝅁', value: 1/64 * this.tempoValue},
                    { text: '𝅂', value: 1/128 * this.tempoValue} 
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

    setTempo() {
        return this.tempoValue * 60 * this.temponoteValue;
    }

    chooseNote(args) {
        this.noteValue = args.NOTE;
        return this.noteValue;
    }
    chooseRest(args) {
        this.restValue = args.REST;
        return this.restValue;
    }
    chooseScale(args) {
        this.restValue = args.SCALE;
        return this.scaleValue;
    }
    setSpeed(args) {
        this.tempoValue = args.TEMPO / args.NOTE / 60;
    }
    
}

Scratch.extensions.register(new CustomExtension());