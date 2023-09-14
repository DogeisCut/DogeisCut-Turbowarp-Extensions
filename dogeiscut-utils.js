(function(Scratch) {
  'use strict';

  const vm = Scratch.vm

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('\'DogeisCut Utils\' must run unsandboxed!');
  }

  const previousValue = {}

  const icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAPUExURYlmIf/YAAAAAMqlDgAAAAbidCoAAAAFdFJOU/////8A+7YOUwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAALNJREFUOE+lkAEOxSAIQ/Xr/c/8aa2IG2bJ1iyRlieYlQ6VMk7JrHsWCAJBOz3OUmqt4Q6sewdWQrcB+4gE2CKZDGA26xSw0MuXgKUqTkDQBfhJ1lEVAFusMAewQOEHgKkdS7OPBygKMhi/5AKEEShBANEKpVF6B758C2QEpzwAWV/EHbBQFXVfwXvO6JEgFhMRB4xorY3QdAIoNcbADKCwkkIrB/gs9lIAxFQOBOIATKL3Px/2B9eefxZyAAAAAElFTkSuQmCC"

class DogeisCutsUtils {
    

    getInfo() {
      return {
        id: 'dogeiscututils',
        name: 'DogeisCut\'s Utils',
        menuIconURI: icon,
        blockIconURI: icon,
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
            hideFromPalette: true
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