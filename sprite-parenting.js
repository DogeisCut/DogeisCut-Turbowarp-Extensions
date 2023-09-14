class SpriteParenting {
    getInfo() {
      return {
        id: 'sprite-parenting',
        name: 'Sprite Parenting',
        blocks: [
          {
            opcode: 'parent_sprite',
            blockType: Scratch.BlockType.COMMAND,
            text: 'parent sprite [ONE] and [TWO]',
            arguments: {
              ONE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'SPRITE_PARENT_MENU'
              },
              TWO: {
                type: Scratch.ArgumentType.STRING,
                menu: 'SPRITE_PARENT_MENU'
              }
            }
          },
          {
            opcode: 'unparent_sprite',
            blockType: Scratch.BlockType.COMMAND,
            text: 'unparent sprite [ONE] and [TWO]',
            arguments: {
              ONE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'SPRITE_PARENT_MENU'
              },
              TWO: {
                type: Scratch.ArgumentType.STRING,
                menu: 'SPRITE_PARENT_MENU'
              }
            }
          },
          {
            opcode: 'unparent_all',
            blockType: Scratch.BlockType.COMMAND,
            text: 'unparent all sprites from [ONE]',
            arguments: {
              ONE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'SPRITE_PARENT_MENU'
              },
            }
          }
        ],
        menus: {
          SPRITE_PARENT_MENU: {
            acceptReporters: true,
            items: ['myself', 'insert sprites here']
          }
        }
      };
    }
  
    parent_sprite(args) {    
    }
    unparent_sprite(args) {    
    }
    unparent_all(args) {    
    }
  }
  
  Scratch.extensions.register(new SpriteParenting());