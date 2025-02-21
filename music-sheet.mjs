class MusicSheet {
  constructor() {}
  getInfo() { // 拡張機能の各種情報
    return {
      id: 'test',
      name: "楽譜", // 拡張機能の名前
      color1: '#FFFFFF', // ブロックのメインカラー（白）
      color2: '#E0E0E0', // ブロックの枠線や影の色（薄いグレー）
      color3: '#B0B0B0', // ブロックのテキストの色（濃いグレー）
      blocks: [
          {
              opcode: 'helloWorld',
              blockType: Scratch.BlockType.REPORTER,
              text: 'Hello World を表示'
           },
           {
              opcode: 'doubleNumber',
              blockType: Scratch.BlockType.REPORTER,
              text: '[NUM] を2倍にする',
              arguments: {
                  NUM: {
                      type: Scratch.ArgumentType.NUMBER,
                      defaultValue: 10
                   }
               }
           },
           {
               opcode: 'playBeep',
               blockType: Scratch.BlockType.COMMAND,
              text: 'ビープ音を鳴らす'
           }
            ]
        };
    }

    // 「Hello World」を返す
    helloWorld() {
        return 'Hello, Scratch!';
    }

    // 数値を2倍にする
    doubleNumber(args) {
        return args.NUM * 2;
    }

    // ビープ音を鳴らす
    playBeep() {
        const synth = new AudioContext();
        const osc = synth.createOscillator();
        osc.frequency.value = 440; // 440Hz（Aの音）
        osc.connect(synth.destination);
        osc.start();
        setTimeout(() => osc.stop(), 500); // 0.5秒後に停止
    }
}
Scratch.extensions.register(new MusicSheet());