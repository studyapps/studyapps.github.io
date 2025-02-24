class CustomExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.tempoValue = '120'; // 初期値
        this.temponoteValue = '1'; // 初期値
        this.noteValue = '4'; // 初期値
        this.restValue = '4'; // 初期値
        this.periodValue = 60 / this.tempoValue / this.temponoteValue;
        this.scaleValue = '60';
    }

    getInfo() {
        return {
            id: 'customExtension',
            name: 'MUSIC',
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
                    {text: 'ド\,', value: '48'},
                    {text: '#ド\,', value: '49'},
                    {text: 'レ\,', value: '50'},
                    {text: '#レ\,', value: '51'},
                    {text: 'ミ\,', value: '52'},
                    {text: 'ファ\,', value: '53'},
                    {text: '#ファ\,', value: '54'},
                    {text: 'ソ\,', value: '55'},
                    {text: '#ソ\,', value: '56'},
                    {text: 'ラ\,', value: '57'},
                    {text: '#ラ\,', value: '58'},
                    {text: 'シ\,', value: '59'},
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
                    {text: 'ド\'', value: '72'},
                    {text: '#ド\'', value: '73'},
                    {text: 'レ\'', value: '74'},
                    {text: '#レ\'', value: '75'},
                    {text: 'ミ\'', value: '76'},
                    {text: 'ファ\'', value: '77'},
                    {text: '#ファ\'', value: '78'},
                    {text: 'ソ\'', value: '79'},
                    {text: '#ソ\'', value: '90'},
                    {text: 'ラ\'', value: '91'},
                    {text: '#ラ\'', value: '92'},
                    {text: 'シ\'', value: '93'},
                    {text: 'ド\'\'', value: '94'}
                ]
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
    
}

Scratch.extensions.register(new CustomExtension());