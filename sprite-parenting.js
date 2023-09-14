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
          },
          {
            opcode: 'unparent_sprite',
            blockType: Scratch.BlockType.COMMAND,
            text: 'unparent sprite [ONE] and [TWO]',
          },
          {
            opcode: 'unparent_all',
            blockType: Scratch.BlockType.COMMAND,
            text: 'unparent all sprites from [ONE]',
          }
        ]
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