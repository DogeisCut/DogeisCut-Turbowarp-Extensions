(function(Scratch) {
  'use strict';

  const vm = Scratch.vm

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('\'DogeisCut Utils\' must run unsandboxed! (So I can run a bunch of viruses, yup.)');
  }

  const lastValues = {}
  const icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAPUExURYlmIf/YAAAAAMqlDgAAAAbidCoAAAAFdFJOU/////8A+7YOUwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAALNJREFUOE+lkAEOxSAIQ/Xr/c/8aa2IG2bJ1iyRlieYlQ6VMk7JrHsWCAJBOz3OUmqt4Q6sewdWQrcB+4gE2CKZDGA26xSw0MuXgKUqTkDQBfhJ1lEVAFusMAewQOEHgKkdS7OPBygKMhi/5AKEEShBANEKpVF6B758C2QEpzwAWV/EHbBQFXVfwXvO6JEgFhMRB4xorY3QdAIoNcbADKCwkkIrB/gs9lIAxFQOBOIATKL3Px/2B9eefxZyAAAAAElFTkSuQmCC"
  let iconInUse = icon

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

  let disableIconsText = 'Disable Icons'
  let iconsDisabled = false;

class DogeisCutsUtils {
    

    getInfo() {
      return {
        id: 'dogeiscututils',
        name: 'DogeisCut\'s Utils',
        /*color1: '#9e9075',
        color2: '#7a705b',
        color3: '#5c5444',*/
        menuIconURI: icon,
        blockIconURI: iconInUse,
        blocks: [
          //Disabling cause aparently it's impossible :(
          /*{
            func: "disable_icons",
            blockType: Scratch.BlockType.BUTTON,
            text: disableIconsText
          },
          '---',*/
          {
            opcode: 'changed',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[ONE] changed?',
            arguments: {
                ONE: {
                  //sadly it looks a little ugly if someone has addons that change block size
                  type: null, //this is on purpose so people actually put stuff in, instead of typing stuff 
                  
                  //type: Scratch.ArgumentType.STRING,
                  //defaultValue: "reporter or bool",
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
            opcode: 'ordered_random',
            blockType: Scratch.BlockType.REPORTER,
            text: 'ordered pick random [MIN] to [MAX]',
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
          //This has no purpose and acts strange
          /*'---',
          {
            opcode: 'null_block',
            blockType: Scratch.BlockType.REPORTER,
            text: '[NULL]',
            arguments: {
              NULL: {
                type: null,
              }
            },
          },*/
          //turbowarp if it was actually good:
          /*'---',
          {
            opcode: 'loop_continue',
            blockType: Scratch.BlockType.COMMAND,
            text: 'continue',
            isTerminal: true
          },
          {
            opcode: 'loop_break',
            blockType: Scratch.BlockType.COMMAND,
            text: 'break',
            isTerminal: true
          },
          */
          /*
          '---',
          {
            opcode: 'delete_sprite',
            blockType: Scratch.BlockType.COMMAND,
            text: 'delete this sprite',
            isTerminal: true,
            hideFromPalette: true
          },
          */
          '---',
          {
            opcode: 'useless',
            blockType: null,
            text: 'useless'
          },
          '---',
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
      let response = Math.round(Math.random() * 10)
      switch (response) {
        case 1:
          return 'Don\'t you have better blocks to be clicking?';
        case 2:
          return 'I assure you that there are zero use cases for me.';
        case 3:
          return 'You\'re giving me false hope that I\'d be useful.';
        case 4:
          return 'Trust me, I\'m not the best option for your project right now.';
        case 5:
          return 'I\'ll never be as good as those other blocks...';
        case 6:
          return 'I was born without a connection point. Nobody can connect with me!';
        case 7:
          return 'Even \'touching color\' will be a better bet for you here.';
        case 8:
          return 'Why don\'t you go use \'change backdrop to () and wait\'? I bet you forgot that even exists.';
        case 9:
          return 'Stop it!';
        case 10:
          return 'CURSE YOU DOGEISCUT FOR ADDING ME!!!';
        default:
          return 'I litterally do nothing.';
      }
    }

    /*
    null_block(args) {
      return args.NULL;
    }
    */

    /*
    loop_continue(args) {
      return 'This block must be placed in a loop!'
    }

    loop_break(args) {
      return 'This block must be placed in a loop!'
    }

    delete_sprite(args, util) {
      //util.target
      return
    }
    */

    /*
    disable_icons() {
      if (iconsDisabled==true) {
        iconsDisabled = false
        disableIconsText = 'Disable Icons'
        iconInUse = icon
      } else {
        iconsDisabled = true
        disableIconsText = 'Enable Icons'
        iconInUse = null
      }
      Scratch.vm.extensionManager.refreshBlocks();
    }
    */
  }
  
  Scratch.extensions.register(new DogeisCutsUtils());
})(Scratch);