class CustomExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.tempoValue = '120'; // テンポの数値
        this.temponoteValue = '1'; // テンポの基準となる音符
        this.noteValue = '4'; // 音符
        this.restValue = '4'; // 休符
        this.periodValue = 60 / this.tempoValue / this.temponoteValue; //１小節の時間
        this.scaleValue = '60'; //ドレミ
        this.chapterValue = '0'; //現在の小節番号
    }

    getInfo() {
        return {
            id: 'customExtension',
            name: 'MUSIC2',
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
                            defaultValue: '4', // 初期値
                            menu: 'noteMenu'
                        },
                        TEMPO:{
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '120', // 初期値
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
                            defaultValue: '4', // 初期値
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
                            defaultValue: '4', // 初期値
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
                            defaultValue: '60', // 初期値
                            menu: 'scaleMenu'
                        }
                    }
                },
                {
                    opcode: 'sync',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '[CHAPTER]小節を同期する',
                    arguments: {
                        CHAPTER:{
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '0', // 初期値
                            menu: 'chapterMenu'
                        }  
                    }
                },
                {
                    opcode: 'waitUntilFalse2',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '[CHAPTER]小節が同期するまで待つ',
                    arguments: {
                        CHAPTER:{
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '0', // 初期値
                            menu: 'chapterMenu'
                        }  
                    }
                }
            ],
            menus: {
                noteMenu: [
                    { text: '𝅝', value: '1'},
                    { text: '𝅗𝅥', value: '2'},
                    { text: '𝅘𝅥', value: '4'},
                    { text: '𝅘𝅥𝅮', value: '8'},
                    { text: '𝅘𝅥𝅯', value: '16'},
                    { text: '𝅘𝅥𝅰', value: '32'},
                    { text: '𝅘𝅥𝅱', value: '64'},
                    { text: '𝅘𝅥𝅲', value: '128'}
                ],
                restMenu: [
                    { text: '𝄻', value: '1'},
                    { text: '𝄼', value: '2'},
                    { text: '𝄽', value: '4'},
                    { text: '𝄾', value: '8'},
                    { text: '𝄿', value: '16'},
                    { text: '𝅀', value: '32'},
                    { text: '𝅁', value: '64'},
                    { text: '𝅂', value: '128'} 
                ],
                scaleMenu: [
                    {text: 'ド(低)', value: '48'},
                    {text: '#ド(低)', value: '49'},
                    {text: 'レ(低)', value: '50'},
                    {text: '#レ(低)', value: '51'},
                    {text: 'ミ(低)', value: '52'},
                    {text: 'ファ(低)', value: '53'},
                    {text: '#ファ(低)', value: '54'},
                    {text: 'ソ(低)', value: '55'},
                    {text: '#ソ(低)', value: '56'},
                    {text: 'ラ(低)', value: '57'},
                    {text: '#ラ(低)', value: '58'},
                    {text: 'シ(低)', value: '59'},
                    {text: 'ド', value: '60'},
                    {text: '#ド', value: '61'},
                    {text: 'レ', value: '62'},
                    {text: '#レ', value: '63'},
                    {text: 'ミ', value: '64'},
                    {text: 'ファ', value: '65'},
                    {text: '#ファ', value: '66'},
                    {text: 'ソ', value: '67'},
                    {text: '#ソ', value: '68'},
                    {text: 'ラ', value: '69'},
                    {text: '#ラ', value: '70'},
                    {text: 'シ', value: '71'},
                    {text: 'ド(高)', value: '72'},
                    {text: '#ド(高)', value: '73'},
                    {text: 'レ(高)', value: '74'},
                    {text: '#レ(高)', value: '75'},
                    {text: 'ミ(高)', value: '76'},
                    {text: 'ファ(高)', value: '77'},
                    {text: '#ファ(高)', value: '78'},
                    {text: 'ソ(高)', value: '79'},
                    {text: '#ソ(高)', value: '90'},
                    {text: 'ラ(高)', value: '91'},
                    {text: '#ラ(高)', value: '92'},
                    {text: 'シ(高)', value: '93'}
                ],
                chapterMenu: {
                    items: Array.from({ length: 99 }, (_, i) => (i + 1).toString())
                }
            }
        };
    }

    setTempo() {
        return this.tempoValue;
    }
    chooseNote(args) {
        this.noteValue = 1 / parseFloat(args.NOTE);
        return this.noteValue * this.periodValue;
    }
    chooseRest(args) {
        this.restValue = 1 / parseFloat(args.REST);
        return this.restValue * this.periodValue;
    }
    chooseScale(args) {
        this.scaleValue = parseInt(args.SCALE,10);
        return this.scaleValue;
    }
    setPeriod(args) {
        this.periodValue = 60 / parseFloat(args.TEMPO) * parseFloat(args.NOTE);
    }
    sync(args) {
        this.chapterValue = parseInt(args.CHAPTER,10);
    }
    aitUntilFalse2() {
        return this.tempoValue;
    }
    
}

Scratch.extensions.register(new CustomExtension());