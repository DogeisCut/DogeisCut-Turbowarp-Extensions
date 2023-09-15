(function(Scratch) {
  'use strict';

  const vm = Scratch.vm

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('\'DogeisCut Utils\' must run unsandboxed!');
  }

  const lastValues = {}
  const icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAPUExURYlmIf/YAAAAAMqlDgAAAAbidCoAAAAFdFJOU/////8A+7YOUwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAALNJREFUOE+lkAEOxSAIQ/Xr/c/8aa2IG2bJ1iyRlieYlQ6VMk7JrHsWCAJBOz3OUmqt4Q6sewdWQrcB+4gE2CKZDGA26xSw0MuXgKUqTkDQBfhJ1lEVAFusMAewQOEHgKkdS7OPBygKMhi/5AKEEShBANEKpVF6B758C2QEpzwAWV/EHbBQFXVfwXvO6JEgFhMRB4xorY3QdAIoNcbADKCwkkIrB/gs9lIAxFQOBOIATKL3Px/2B9eefxZyAAAAAElFTkSuQmCC"

  let randomSeed = 0
  let randomCount = 0

  function triangleWave(x) {
    x = ((x + Math.PI) % (2 * Math.PI)) - Math.PI;
    return (2 / Math.PI) * (Math.PI / 2 - Math.abs(x));
  }
  
  
  function seededRandom(seed) {
    let x = Math.abs(triangleWave((randomCount+1)*(35404762.5464353454334+Math.abs(seed))));
    return x;
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

  function clamp(num, min, max) {
    if (min > max) {
      [min, max] = [max, min];
    } 
    return Math.min(Math.max(num, min), max);
  }

  let newNumber = 0

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
            text: '[ONE] changed?',
            arguments: {
                ONE: {
                  //type: null, //this is on purpose so people actually put stuff in, instead of typing stuff 
                  //except it's hideous so im turning it off
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "reporter or bool",
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
            text: 'reset seeded random'
          },
          '---',
          {
            opcode: 'new_number',
            blockType: Scratch.BlockType.REPORTER,
            text: 'new number',
            disableMonitor: true //causes it to repeat count up if monitored
          },
          {
            opcode: 'reset_new_number',
            blockType: Scratch.BlockType.COMMAND,
            text: 'reset new number'
          },
          '---',
          {
            opcode: 'null_block',
            blockType: Scratch.BlockType.REPORTER,
            text: '[NULL]',
            arguments: {
              NULL: {
                type: null,
              }
            },
          },
          '---',
          {
            opcode: 'useless',
            blockType: null,
            text: 'useless'
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
      //Re-did the code to look/work better based on Lily's more events extension.
      const id = util.thread.peekStack()
      if (!lastValues[id])
        lastValues[id] = Scratch.Cast.toString(args.ONE);
      if (Scratch.Cast.toString(args.ONE) !== lastValues[id]) {
        lastValues[id] = Scratch.Cast.toString(args.ONE);
        return true;
      }
      return false;
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
      randomCount = 0
    }

    new_number(args) {
     return newNumber++;
    }

    reset_new_number(args) {
      newNumber = 0;
    }

    log_util(args, util) {
      console.log(util)
    }

    useless(args) {
      let response = Math.round(Math.random() * 9)
      switch (response) {
        case 1:
          return 'Don\'t you have better blocks to be clicking?';
          break;
        case 2:
          return 'I assure you that there are 0 use cases for me.';
          break;
        case 3:
          return 'You\'re giving me false hope that I\'d be useful.';
          break;
        case 4:
          return 'Trust me, I\'m not the best option for your project right now.';
          break;
        case 5:
          return 'I\'ll never be as good as those other blocks...';
          break;
        case 6:
          return 'I was born without a connection point. Nobody can connect with me!';
          break;
        case 7:
          return 'Even \'touching color\' will be a better bet for you here.';
          break;
        case 8:
          return 'Why don\'t you go use \'change backdrop to () and wait\'? I bet you forgot that even exists.';
          break;
        case 9:
          return 'Stop it!';
          break;
        default:
          return 'I litterally do nothing.';
      }
    }

    null_block(args) {
      return args.NULL;
    }
  }
  
  Scratch.extensions.register(new DogeisCutsUtils());
})(Scratch);