(function(Scratch) {
  'use strict';

  const vm = Scratch.vm

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('\'DogeisCut Utils\' must run unsandboxed!');
  }

  const previousValue = {}

class DogeisCutsUtils {
    

    getInfo() {
      return {
        id: 'dogeiscututils',
        name: 'DogeisCut\'s Utils',
        blocks: [
          {
            opcode: 'changed',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'changed [ONE]',
            arguments: {
                ONE: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "apple",
                },
              },
          },
          {
            opcode: 'max',
            blockType: Scratch.BlockType.REPORTER,
            text: 'max of [ONE] and [TWO]',
            arguments: {
                ONE: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 100,
                },
                TWO: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
              },
          },
          {
            opcode: 'min',
            blockType: Scratch.BlockType.REPORTER,
            text: 'min of [ONE] and [TWO]',
            arguments: {
                ONE: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 100,
                },
                TWO: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0,
                  },
              },
          },
          {
            opcode: 'log_util',
            blockType: Scratch.BlockType.COMMAND,
            text: 'log util',
          },
        ]
      };
    }
  
    changed(args, util) {
      let id = String(util.thread.peekStack())
      if (previousValue[id]==undefined||previousValue[id]==null) {
        previousValue[id] = false
      }
        if (args.ONE !== previousValue[id]) {
          previousValue[id] = args.ONE;
            return true;
          } else {
            return false;
          }      
    }

    max(args) {
        return Math.max(args.ONE, args.TWO)
    }

    min(args) {
        return Math.min(args.ONE, args.TWO)
    }

    log_util(args, util) {
      console.log(util)
    }
  }
  
  Scratch.extensions.register(new DogeisCutsUtils());
})(Scratch);