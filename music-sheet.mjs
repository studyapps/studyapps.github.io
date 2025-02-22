class MusicExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.noteValue = 4; // 初期値
        this.restValue = 4; // 初期値
        this.tempoValue = 80; // 初期値
        this.temponoteValue = 4; // 初期値
        this.speedValue;
        this.scaleValues = {
            'ド': 60,
            'レ': 62,
            'ミ': 64,
            'ファ': 65,
            'ソ': 67,
            'ラ': 69,
            'シ': 71,
            'ド(高)': 72
        };
        this.currentNote = 60; // 初期値: ド;
    }

    getInfo() {
        return {
            id: 'musicExtension',
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
                            menu: 'NoteMenu'
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
                noteMenu: {
                    acceptReporters: false,
                    items: Object.keys(this.scaleValues)
                }
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
    getNoteValue(args) {
        this.currentNote = this.scaleValues[args.NOTE] || 60;
        return this.currentNote;
    }


}

Scratch.extensions.register(new CustomExtension());