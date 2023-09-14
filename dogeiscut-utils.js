(function(Scratch) {
  'use strict';

  const vm = Scratch.vm

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('\'DogeisCut Utils\' must run unsandboxed!');
  }

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
            opcode: 'log_sprite',
            blockType: Scratch.BlockType.COMMAND,
            text: 'log sprite information',
          },
        ]
      };
    }
  
    changed(args) {
        if (args.ONE != this.previousValue) {
            this.previousValue = args.ONE;
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

    log_sprite(args, util) {
      console.log(util.target)
    }
  }
  
  Scratch.extensions.register(new DogeisCutsUtils());
})(Scratch);