class CustomExtension {
  constructor(runtime) {
      this.runtime = runtime;
      this.S_Mode = false;
      this.matrix = this._createDefaultMatrix();
      this.id = "default_id";
  }

  _createDefaultMatrix() {
      const rows = 11;
      const cols = 15;
      const matrix = [];
      for (let r = 0; r < rows; r++) {
          matrix[r] = [];
          for (let c = 0; c < cols; c++) {
              matrix[r][c] = "空白";
          }
      }
      return matrix;
  }

  getInfo() {
      return {
          id: 'customExtension',
          name: 'ロボットを動かそう',
          color1: '#FF6680', // 背景色（R255,G102,B128）
          color2: '#FF3355', // 輪郭色（R255,G51,B85）
          blocks: [
              {
                  opcode: 'setSimulationMode',
                  blockType: Scratch.BlockType.COMMAND,
                  text: 'シミュレーションモード [MODE]',
                  arguments: {
                      MODE: {
                          type: Scratch.ArgumentType.STRING,
                          menu: 'modeMenu'
                      }
                  }
              },
              {
                  opcode: 'getMatrixValue',
                  blockType: Scratch.BlockType.REPORTER,
                  text: '行[ROW] 列[COL] のタイル',
                  arguments: {
                      ROW: {
                          type: Scratch.ArgumentType.STRING,
                          menu: 'rowMenu'
                      },
                      COL: {
                          type: Scratch.ArgumentType.STRING,
                          menu: 'colMenu'
                      }
                  }
              },
              {
                  opcode: 'checkDirection',
                  blockType: Scratch.BlockType.BOOLEAN,
                  text: '[DIR] が [TYPE] の場合',
                  arguments: {
                      DIR: {
                          type: Scratch.ArgumentType.STRING,
                          menu: 'dirMenu'
                      },
                      TYPE: {
                          type: Scratch.ArgumentType.STRING,
                          menu: 'typeMenu'
                      }
                  }
              }
          ],
          menus: {
              modeMenu: {
                  acceptReporters: false,
                  items: ['ON', 'OFF']
              },
              rowMenu: {
                  acceptReporters: false,
                  items: ['-5','-4','-3','-2','-1','0','1','2','3','4','5']
              },
              colMenu: {
                  acceptReporters: false,
                  items: ['-7','-6','-5','-4','-3','-2','-1','0','1','2','3','4','5','6','7']
              },
              dirMenu: {
                  acceptReporters: false,
                  items: ['現在地','前', '後', '左', '右']
              },
              typeMenu: {
                  acceptReporters: false,
                  items: ['障害物', 'ゴール', 'スタート', '赤', '青', '黄']
              }
          }
      };
  }

  setSimulationMode(args) {
      this.S_Mode = args.MODE === "ON";
  }

  getMatrixValue(args) {
      const row = parseInt(args.ROW) + 5;
      const col = parseInt(args.COL) + 7;
      if (this.matrix[row] && this.matrix[row][col] !== undefined) {
          return this.matrix[row][col];
      } else {
          return "";
      }
  }

  checkDirection(args) {
      const currentRow = 5;
      const currentCol = 7;
      let dRow = 0, dCol = 0;

      switch (args.DIR) {
          case '前': dRow = -1; break;
          case '後': dRow = 1; break;
          case '左': dCol = -1; break;
          case '右': dCol = 1; break;
      }

      const newRow = currentRow + dRow;
      const newCol = currentCol + dCol;

      if (this.matrix[newRow] && this.matrix[newRow][newCol] !== undefined) {
          return this.matrix[newRow][newCol] === args.TYPE;
      } else {
          return false;
      }
  }
}

Scratch.extensions.register(new CustomExtension());
