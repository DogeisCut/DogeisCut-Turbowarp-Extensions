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
          }
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
  }
  
  Scratch.extensions.register(new DogeisCutsUtils());