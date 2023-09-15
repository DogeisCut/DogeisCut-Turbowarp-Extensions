(function(Scratch) {
  'use strict';

  const vm = Scratch.vm

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('\'DogeisCut Utils\' must run unsandboxed!');
  }

  const previousValue = {}

  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  const icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAPUExURYlmIf/YAAAAAMqlDgAAAAbidCoAAAAFdFJOU/////8A+7YOUwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAALNJREFUOE+lkAEOxSAIQ/Xr/c/8aa2IG2bJ1iyRlieYlQ6VMk7JrHsWCAJBOz3OUmqt4Q6sewdWQrcB+4gE2CKZDGA26xSw0MuXgKUqTkDQBfhJ1lEVAFusMAewQOEHgKkdS7OPBygKMhi/5AKEEShBANEKpVF6B758C2QEpzwAWV/EHbBQFXVfwXvO6JEgFhMRB4xorY3QdAIoNcbADKCwkkIrB/gs9lIAxFQOBOIATKL3Px/2B9eefxZyAAAAAElFTkSuQmCC"

  let randomSeed = 0
  let randomCount = 0

  function seededRandom(seed) {
    let x = Math.sin(Math.abs(Math.round(seed))+1) * (10000 + randomCount);
    return x - Math.floor(x);
  }
  
  function getRandomNumber(seed, min, max) {
    if (min > max) {
      [min, max] = [max, min];
    }
  
    const randomValue = seededRandom(seed);
    randomCount++;
  
    if (Number.isInteger(min) && Number.isInteger(max)) {
      return Math.floor(randomValue * (max - min + 1)) + min;
    } else {
      return randomValue * (max - min) + min;
    }
  }

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
          '---',
          {
            opcode: 'max',
            blockType: Scratch.BlockType.REPORTER,
            text: 'max of [ONE] and [TWO]',
            arguments: {
                ONE: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 1,
                },
                TWO: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 10,
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
                  defaultValue: 1,
                },
                TWO: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 10,
                  },
              },
          },
          {
            opcode: 'clamp',
            blockType: Scratch.BlockType.REPORTER,
            text: 'clamp [ONE] bewteen [MIN] and [MAX]',
            arguments: {
                ONE: {
                  type: Scratch.ArgumentType.NUMBER,
                },
                MIN: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 1,
                },
                MAX: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 10,
                },
              },
          },
          '---',
          {
            opcode: 'seeded_random',
            blockType: Scratch.BlockType.REPORTER,
            text: 'seeded pick random [MIN] to [MAX]',
            arguments: {
                MIN: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 1,
                },
                MAX: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 10,
                },
              },
          },
          {
            opcode: 'set_seed',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set seed to [SEED]',
            arguments: {
                SEED: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 0,
                }
              },
          },
          {
            opcode: 'reset_seeded_random',
            blockType: Scratch.BlockType.COMMAND,
            text: 'reset seeded random to [COUNT]',
            arguments: {
              COUNT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              }
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

    clamp(args) {
      return clamp(args.ONE, args.MIN, args.MAX)
    }

    seeded_random(args) {
      return getRandomNumber(randomSeed, args.MIN, args.MAX)
    }

    set_seed(args) {
      randomSeed = args.SEED
    }

    reset_seeded_random(args) {
      randomCount = args.COUNT
    }

    log_util(args, util) {
      console.log(util)
    }
  }
  
  Scratch.extensions.register(new DogeisCutsUtils());
})(Scratch);